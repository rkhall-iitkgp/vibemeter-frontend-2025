import { HorizontalRecognitionCard } from "../components/ActionPlan/Action-plan-component2";
import { ActionPlansCarousel } from "@/components/ActionPlan/Actionplan-carousal";
import InitiativeModal from "../components/ActionPlan/Initiative-model"; // Import the InitiativeModal component
import { FilterComponent } from "../components/ActionPlan/Filter";
import SearchBar from "../components/ActionPlan/Search-bar";
import { SortBy } from "../components/ActionPlan/Sortby";
import { Button } from "../components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

// Sample data for horizontal cards
const actionPlans = [
	{
		title: "Recognition Program",
		createdDate: "March 17, 2025",
		description:
			"Implement a monthly employee recognition program to celebrate achievements and boost morale. Something That can really motivate the employees to really understand their worth",
		targetGroup: "Leadership Group",
		groupId: "#GRP2345",
		tags: ["Morality", "Engagement"],
	},
	{
		title: "Recognition Program",
		createdDate: "March 12, 2025",
		description:
			"Implement a monthly employee recognition program to celebrate achievements and boost morale. Something That can really motivate the employees to really understand their worth",
		targetGroup: "Leadership Group",
		groupId: "#GRP2345",
		tags: ["Morality", "Engagement"],
	},
];

export default function ActionPlan() {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOpen, setSortOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [sortBy, setSortBy] = useState("Priority");
	const [isInitiativeModalOpen, setIsInitiativeModalOpen] = useState(false);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		// Implement your search logic here
	};

	const openInitiativeModal = () => {
		setIsInitiativeModalOpen(true);
	};

	const closeInitiativeModal = () => {
		setIsInitiativeModalOpen(false);
	};

	return (
		<div className="flex-1 overflow-auto ">
			{/* Header with Icon and Title */}
			<header className=" bg-gray-100 z-10 p-6">
				<div className="flex items-center gap-3">
					<span className="text-[#80C342]">
						<svg
							className="text-[#80c342]"
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="#80c342"
								strokeWidth="2"
								fill="none"
							/>
							<circle
								cx="12"
								cy="12"
								r="6"
								stroke="#80c342"
								strokeWidth="2"
								fill="none"
							/>
							<circle
								cx="12"
								cy="12"
								r="2"
								stroke="#80c342"
								strokeWidth="2"
								fill="none"
							/>
							<path d="M22 12 L18 10" stroke="#80c342" strokeWidth="2" />
							<path d="M18 10 L20 6" stroke="#80c342" strokeWidth="2" />
						</svg>
					</span>
					<h1 className="text-4xl font-semibold text-gray-800">Action Plans</h1>
				</div>
			</header>

			{/* Carousel Section */}
			<div className="mb-10">
				<ActionPlansCarousel />
			</div>

			{/* All Action Plans Section */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-6">All Action Plans</h2>

					{/* Search, Filter, and Create Button Row */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex gap-2 items-center">
							<div className="w-100">
								<SearchBar onSearch={handleSearch} />
							</div>

							<FilterComponent
								filterOpen={filterOpen}
								setFilterOpen={setFilterOpen}
							/>

							<SortBy
								sortBy={sortBy}
								setSortBy={setSortBy}
								sortOpen={sortOpen}
								setSortOpen={setSortOpen}
							/>
						</div>

						<Button
							onClick={openInitiativeModal}
							className="flex items-center gap-2 bg-[#80c342] hover:bg-[#80c342] text-white rounded-[0.3rem]"
						>
							<PlusIcon className="h-4 w-4" />
							Create Action Plan
						</Button>
					</div>

					{/* Action Plans Cards */}
					<div className="space-y-4">
						{actionPlans
							.filter(
								(plan) =>
									plan.title
										.toLowerCase()
										.includes(searchQuery.toLowerCase()) ||
									plan.description
										.toLowerCase()
										.includes(searchQuery.toLowerCase())
							)
							.map((plan, index) => (
								<HorizontalRecognitionCard
									key={index}
									title={plan.title}
									createdDate={plan.createdDate}
									description={plan.description}
									targetGroup={plan.targetGroup}
									groupId={plan.groupId}
									tags={plan.tags}
								/>
							))}
					</div>
				</div>
			</div>

			{/* Initiative Modal */}
			{isInitiativeModalOpen && (
				<InitiativeModal onClose={closeInitiativeModal} />
			)}
		</div>
	);
}
