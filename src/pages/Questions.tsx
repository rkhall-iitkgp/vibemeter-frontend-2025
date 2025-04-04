import { X, Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// Define types for our data structures
interface Question {
	id: string;
	text: string;
	tags: string[];
	severity: "critical" | "moderate" | "mild" | "low";
}

interface NewQuestion {
	text: string;
	tags: string[];
	severity: "critical" | "moderate" | "mild" | "low";
}

const mapResponseToQuestion = (item: Question): Question => {
	return {
		id: item.id,
		text: item.text,
		tags: item.tags || [],
		// Map "high" to "critical" if that's coming from your API
		severity: item.severity || "moderate",
	};
};

// Modal types
type ModalType = "create" | "edit" | "delete" | null;

const Questions = () => {
	// State variables with proper typing
	const [questions, setQuestions] = useState<Question[]>([]); // Initialize as empty array
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [modalType, setModalType] = useState<ModalType>(null);
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

	// Additional state variables
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [newQuestion, setNewQuestion] = useState<NewQuestion>({
		text: "",
		tags: [],
		severity: "moderate",
	});

	// Add a state for tracking API operations
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	// Use effect to handle body overflow when modal is open
	useEffect(() => {
		if (modalType !== null) {
			// Prevent scrolling on the body when modal is open
			document.body.style.overflow = "hidden";
		} else {
			// Re-enable scrolling when modal is closed
			document.body.style.overflow = "auto";
		}

		// Cleanup function to ensure scrolling is re-enabled when component unmounts
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [modalType]);

	// Fetch questions from API
	useEffect(() => {
		fetchQuestions();
	}, []);

	const fetchQuestions = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(`${BACKEND_URL}/api/question`);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const responseData = await response.json();

			// Handle the specific response format
			if (
				responseData &&
				responseData.status === "success" &&
				Array.isArray(responseData.data)
			) {
				// Map the data to our expected Question format
				const formattedQuestions = responseData.data.map(mapResponseToQuestion);
				setQuestions(formattedQuestions);
				setError(null);
			} else {
				throw new Error("Invalid response format");
			}
		} catch (err) {
			console.error("Failed to fetch questions:", err);
			setError("Failed to load questions. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	// Get all unique tags from questions
	const allTags = Array.from(
		new Set(questions.flatMap((question) => question.tags))
	).sort();

	// Use all unique tags as available filters
	const allFilters: string[] = allTags;

	// Filter questions based on active filters and search query
	const filteredQuestions = questions.filter((question) => {
		// Search filter
		const matchesSearch =
			searchQuery === "" ||
			question.text.toLowerCase().includes(searchQuery.toLowerCase());

		// Tag filters
		const matchesTags =
			activeFilters.length === 0 ||
			activeFilters.some((filter) => question.tags.includes(filter));

		return matchesSearch && matchesTags;
	});

	// Toggle filter
	const toggleFilter = (filter: string) => {
		if (activeFilters.includes(filter)) {
			setActiveFilters(activeFilters.filter((f) => f !== filter));
		} else {
			setActiveFilters([...activeFilters, filter]);
		}
	};

	// Clear search
	const clearSearch = () => {
		setSearchQuery("");
	};

	// Toggle tag selection for question form
	const toggleTagSelection = (tag: string) => {
		if (newQuestion.tags.includes(tag)) {
			setNewQuestion({
				...newQuestion,
				tags: newQuestion.tags.filter((t) => t !== tag),
			});
		} else {
			setNewQuestion({
				...newQuestion,
				tags: [...newQuestion.tags, tag],
			});
		}
	};

	// Handle severity change
	const handleSeverityChange = (
		severity: "critical" | "moderate" | "mild" | "low"
	) => {
		setNewQuestion({
			...newQuestion,
			severity,
		});
	};

	// Handle question text change
	const handleQuestionTextChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewQuestion({
			...newQuestion,
			text: e.target.value,
		});
	};

	// Open create modal
	const openCreateModal = () => {
		setNewQuestion({
			text: "",
			tags: [],
			severity: "moderate",
		});
		setModalType("create");
	};

	// Open edit modal
	const openEditModal = (question: Question) => {
		setCurrentQuestion(question);
		setNewQuestion({
			text: question.text,
			tags: [...question.tags],
			severity: question.severity,
		});
		setModalType("edit");
	};

	// Open delete modal
	const openDeleteModal = (question: Question) => {
		setCurrentQuestion(question);
		setModalType("delete");
	};

	// Close modal
	const closeModal = () => {
		setModalType(null);
		setCurrentQuestion(null);
	};

	// Handle modal backdrop click
	const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	// Handle form submission (create or edit)
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newQuestion.text.trim() === "" || isSubmitting) return;

		setIsSubmitting(true);

		try {
			// Prepare the question object based on API expectations
			const questionObj = {
				text: newQuestion.text,
				tags: newQuestion.tags.length > 0 ? newQuestion.tags : ["burnoutRisk"],
				severity: newQuestion.severity,
			};

			let response;

			if (modalType === "create") {
				// Create a new question
				response = await fetch(`${BACKEND_URL}/api/question`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(questionObj),
				});
			} else if (modalType === "edit" && currentQuestion) {
				// For edit, we'll ensure we're using the format expected by your API
				response = await fetch(
					`${BACKEND_URL}/api/question/${currentQuestion.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							question_id: currentQuestion.id,
							text: newQuestion.text,
							tags:
								newQuestion.tags.length > 0
									? newQuestion.tags
									: ["burnoutRisk"],
							severity: newQuestion.severity,
						}),
					}
				);
			} else {
				throw new Error("Invalid modal type");
			}

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const responseData = await response.json();

			if (modalType === "create") {
				// Handle the response data based on the API format
				let createdQuestion;
				if (responseData.data) {
					// If the response follows the same format as the GET response
					createdQuestion = mapResponseToQuestion(responseData.data);
				} else if (responseData.question_id) {
					// If response just contains the question_id directly
					createdQuestion = {
						id: responseData.question_id,
						text: newQuestion.text,
						tags:
							newQuestion.tags.length > 0 ? newQuestion.tags : ["burnoutRisk"],
						severity: newQuestion.severity,
					};
				} else {
					// Fallback if different format
					createdQuestion = {
						id: `temp-${Date.now()}`,
						text: newQuestion.text,
						tags:
							newQuestion.tags.length > 0 ? newQuestion.tags : ["burnoutRisk"],
						severity: newQuestion.severity,
					};
				}

				// Update the questions state with the new question
				setQuestions([...questions, createdQuestion]);
			} else if (modalType === "edit" && currentQuestion) {
				// Update the questions state with the edited question
				const updatedQuestion = {
					id: currentQuestion.id,
					text: newQuestion.text,
					tags:
						newQuestion.tags.length > 0 ? newQuestion.tags : ["burnoutRisk"],
					severity: newQuestion.severity,
				};

				// Preserve the original order by mapping through existing questions
				setQuestions(
					questions.map((q) =>
						q.id === currentQuestion.id ? updatedQuestion : q
					)
				);
			}

			// Reset form and close modal
			setNewQuestion({
				text: "",
				tags: [],
				severity: "moderate",
			});
			closeModal();
		} catch (err) {
			console.error(`Failed to ${modalType} question:`, err);
			alert(`Failed to ${modalType} question. Please try again.`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handle delete question
	const handleDeleteQuestion = async () => {
		if (!currentQuestion || isSubmitting) return;

		setIsSubmitting(true);

		try {
			const response = await fetch(
				`${BACKEND_URL}/api/question/${currentQuestion.id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Remove the question from the state
			setQuestions(questions.filter((q) => q.id !== currentQuestion.id));
			closeModal();
		} catch (err) {
			console.error("Failed to delete question:", err);
			alert("Failed to delete question. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Format a tag for display
	const formatTagName = (tag: string) => {
		return tag
			.replace(/([A-Z])/g, " $1") // Insert a space before uppercase letters
			.replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
	};

	// Add a new tag
	const addNewTag = (tag: string) => {
		if (tag && !newQuestion.tags.includes(tag)) {
			setNewQuestion({
				...newQuestion,
				tags: [...newQuestion.tags, tag],
			});
		}
	};

	return (
		<div className="flex-1 overflow-auto">
			{/* Header - now in gray area */}
			<header className=" bg-gray-100 z-10 p-6 pt-8 flex w-full justify-between items-center">
				<div className="flex items-center gap-3">
					<span className="text-[#80C342]">
						<img src="/icons/Questions.svg" alt="Question Icon" width={40} height={40} />
					</span>
					<h1 className="text-4xl font-semibold text-gray-800">Questions</h1>
				</div>
				<button
					type="button"
					className="bg-[#80C342] text-white px-5 py-2 rounded-md flex items-center text-sm sm:text-base w-full sm:w-48 justify-center sm:justify-start hover:cursor-pointer"
					onClick={openCreateModal}
				>
					<Plus size={18} className="mr-2" />
					Create Question
				</button>
			</header>

			{/* Dashboard content */}
			<main className="p-6">
				{/* Search */}
				<div className="relative mb-4 sm:mb-6 max-w-3xl mx-auto">
					<input
						type="text"
						placeholder="Search"
						className="w-full p-2 pl-8 pr-10 rounded text-sm sm:text-base"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
					{searchQuery && (
						<button
							className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
							onClick={clearSearch}
						>
							<X size={16} />
						</button>
					)}
				</div>

				{/* Filter tags */}
				{allFilters.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
						<div className="w-full overflow-x-auto pb-2 -mb-2 flex sm:flex-wrap space-y-1">
							{allFilters.map((filter) => (
								<button
									key={filter}
									className={`px-3 sm:px-4 py-1 rounded-md text-xs drop-shadow-sm sm:text-sm whitespace-nowrap mr-2 ${activeFilters.includes(filter)
										? "bg-[#80C342] text-white"
										: "bg-white text-gray-700"
										}`}
									onClick={() => toggleFilter(filter)}
								>
									{formatTagName(filter)}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Loading and error states */}
				{isLoading && (
					<div className="bg-white p-4 rounded-md shadow-sm border text-center">
						<div className="animate-pulse flex justify-center">
							<div className="h-4 w-4 bg-[#80C342] rounded-full mx-1"></div>
							<div className="h-4 w-4 bg-[#80C342] rounded-full mx-1 animate-pulse delay-100"></div>
							<div className="h-4 w-4 bg-[#80C342] rounded-full mx-1 animate-pulse delay-200"></div>
						</div>
						<p className="text-gray-500 mt-2">Loading questions...</p>
					</div>
				)}

				{error && !isLoading && (
					<div className="bg-white p-4 rounded-md shadow-sm border text-center text-red-500">
						{error}
					</div>
				)}

				{/* Questions list */}
				<div className="space-y-3 sm:space-y-4">
					{!isLoading &&
						filteredQuestions.map((question) => (
							<div
								key={question.id}
								className="bg-white p-3 sm:p-4 rounded-md shadow-sm border"
							>
								<div className="flex justify-between">
									<p className="text-gray-800 mb-3 text-sm sm:text-base break-words flex-grow">
										{question.text}
									</p>
									<div className="flex gap-2 ml-2">
										<button
											onClick={() => openEditModal(question)}
											className="text-blue-600 hover:text-blue-800 p-1"
											title="Edit Question"
										>
											<Edit size={18} />
										</button>
										<button
											onClick={() => openDeleteModal(question)}
											className="text-red-600 hover:text-red-800 p-1"
											title="Delete Question"
										>
											<Trash2 size={18} />
										</button>
									</div>
								</div>
								<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
									<div className="flex flex-wrap gap-1 sm:gap-2">
										{question.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 sm:px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
											>
												{formatTagName(tag)}
											</span>
										))}
									</div>
									<span
										className={`px-2 sm:px-3 py-1 text-xs rounded-full ${question.severity === "critical"
											? "bg-red-100 text-red-800"
											: question.severity === "moderate"
												? "bg-yellow-100 text-yellow-800"
												: "bg-green-100 text-green-800"
											}`}
									>
										{question.severity.charAt(0).toUpperCase() +
											question.severity.slice(1)}
									</span>
								</div>
							</div>
						))}
					{!isLoading && filteredQuestions.length === 0 && (
						<div className="bg-white p-4 rounded-md shadow-sm border text-center text-gray-500">
							{activeFilters.length > 0 || searchQuery
								? "No questions match your filters"
								: "No questions available. Create your first question!"}
						</div>
					)}
				</div>

				{/* Modal: Create or Edit Question */}
				{
					(modalType === "create" || modalType === "edit") && (
						<div
							className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
							onClick={handleModalBackdropClick}
						>
							<div
								className="bg-white rounded-lg shadow-lg w-full max-w-md relative"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="flex justify-between items-center p-4 border-b">
									<h2 className="text-xl font-semibold">
										{modalType === "create" ? "Create Question" : "Edit Question"}
									</h2>
									<button
										type="button"
										onClick={closeModal}
										className="text-gray-500 hover:text-gray-700"
										title="Close Modal"
									>
										<X size={24} />
									</button>
								</div>

								<form onSubmit={handleSubmit} className="p-4">
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Question Text:
										</label>
										<textarea
											className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#80C342] focus:border-transparent"
											rows={4}
											placeholder="Type your question here..."
											value={newQuestion.text}
											onChange={handleQuestionTextChange}
											required
										/>
									</div>

									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Categories:
										</label>
										{/* Input for adding new tags */}
										<div className="mb-2">
											<input
												type="text"
												className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#80C342]"
												placeholder="Add a new tag (press Enter)"
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														const newTag = e.currentTarget.value.trim();
														addNewTag(newTag);
														e.currentTarget.value = "";
													}
												}}
											/>
										</div>
										<div className="flex flex-wrap gap-2 mb-2">
											{newQuestion.tags.map((tag) => (
												<div
													key={tag}
													className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
												>
													{formatTagName(tag)}
													<button
														type="button"
														className="ml-1 text-blue-800 hover:text-blue-600"
														onClick={() => {
															setNewQuestion({
																...newQuestion,
																tags: newQuestion.tags.filter((t) => t !== tag),
															});
														}}
													>
														<X size={14} />
													</button>
												</div>
											))}
										</div>
										<div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
											{allFilters.length > 0 ? (
												allFilters.map((tag) => (
													<label key={tag} className="flex items-center gap-2">
														<input
															type="checkbox"
															className="form-checkbox text-[#80C342] rounded"
															checked={newQuestion.tags.includes(tag)}
															onChange={() => toggleTagSelection(tag)}
														/>
														<span className="text-sm text-gray-700">
															{formatTagName(tag)}
														</span>
													</label>
												))
											) : (
												<p className="text-sm text-gray-500 col-span-2">
													No categories available yet. Create your own tags above.
												</p>
											)}
										</div>
									</div>

									<div className="mb-6">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Severity
										</label>
										<div className="flex flex-col gap-2">
											<label className="flex items-center">
												<input
													type="radio"
													className="form-radio text-[#80C342]"
													name="severity"
													checked={newQuestion.severity === "mild"}
													onChange={() => handleSeverityChange("mild")}
												/>
												<span className="ml-2 text-sm">Mild</span>
											</label>
											<label className="flex items-center">
												<input
													type="radio"
													className="form-radio text-[#80C342]"
													name="severity"
													checked={newQuestion.severity === "moderate"}
													onChange={() => handleSeverityChange("moderate")}
												/>
												<span className="ml-2 text-sm">Moderate</span>
											</label>
											<label className="flex items-center">
												<input
													type="radio"
													className="form-radio text-[#80C342]"
													name="severity"
													checked={newQuestion.severity === "critical"}
													onChange={() => handleSeverityChange("critical")}
												/>
												<span className="ml-2 text-sm">Critical</span>
											</label>
										</div>
									</div>

									<div className="flex justify-end gap-2">
										<button
											type="button"
											className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
											onClick={closeModal}
											disabled={isSubmitting}
										>
											Cancel
										</button>
										<button
											type="submit"
											className={`px-4 py-2 bg-[#80C342] text-white rounded-md hover:bg-[#6ca438] ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<span className="flex items-center">
													<span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
													{modalType === "create" ? "Creating..." : "Saving..."}
												</span>
											) : modalType === "create" ? (
												"Create"
											) : (
												"Save Changes"
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					)
				}

				{/* Modal: Delete Confirmation */}
				{
					modalType === "delete" && currentQuestion && (
						<div
							className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50"
							onClick={handleModalBackdropClick}
						>
							<div
								className="bg-white rounded-lg shadow-lg w-full max-w-md"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="p-6">
									<h3 className="text-xl font-semibold mb-4">Delete Question</h3>
									<p className="mb-6">
										Are you sure you want to delete this question? This action
										cannot be undone.
									</p>
									<div className="border-t pt-4 flex justify-end gap-3">
										<button
											type="button"
											className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
											onClick={closeModal}
											disabled={isSubmitting}
										>
											Cancel
										</button>
										<button
											type="button"
											className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
											onClick={handleDeleteQuestion}
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<span className="flex items-center">
													<span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
													Deleting...
												</span>
											) : (
												"Delete"
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</main >
		</div >

	);
};

export default Questions;
