import ParticipantFilterModal from "../components/ParticipantFilterModal";
import { ActionPlansCarousel } from "@/components/action-plan-carousel";
import AddParticipantsModal from "../components/AddParticipantsModal";
import FilterButton from "@/components/FilterButton";
import SearchBar from "@/components/SearchBar";
import { Employee, FocusGroup } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function FocusGroupDetails({
  selectedGroup,
  focusGroups,
  setFocusGroups,
  setFilteredGroups,
  setSelectedGroup,
}: {
  selectedGroup: FocusGroup;
  focusGroups: FocusGroup[];
  setFocusGroups: React.Dispatch<React.SetStateAction<FocusGroup[]>>;
  setFilteredGroups: React.Dispatch<React.SetStateAction<FocusGroup[]>>;
  setSelectedGroup: React.Dispatch<React.SetStateAction<FocusGroup | null>>;
}) {
  const [participants, setParticipants] = useState<Employee[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  // Track filtered participants
  const [filteredParticipants, setFilteredParticipants] =
    useState<Employee[]>(participants);

  // Track selected participants
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>(
    []
  );
  // State for Add Participants modal
  const [showAddParticipantsModal, setShowAddParticipantsModal] =
    useState(false);
  // State for filter participants modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  // Active filters for participants
  const [participantFilters, setParticipantFilters] = useState<{
    jobTitles: string[];
    dateAdded: string[];
  }>({
    jobTitles: ["All"],
    dateAdded: ["All"],
  });

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/groups/${selectedGroup.focus_group_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setParticipants(data.data.users);
        setFilteredParticipants(data.data.users);
        setAllEmployees(data.data.users);
      });
  }, [selectedGroup]);

  const handleParticipantSearch = (query: string) => {
    if (!query.trim()) {
      applyAllParticipantFilters();
      return;
    }

    const query_lower = query.toLowerCase();
    const filtered = participants.filter((participant) => {
      const matchesSearch =
        participant.name.toLowerCase().includes(query_lower) ||
        participant.employee_id.toLowerCase().includes(query_lower) ||
        participant.job_title.toLowerCase().includes(query_lower);

      return matchesSearch && participantMatchesFilters(participant);
    });

    setFilteredParticipants(filtered);
  };

  const applyAllParticipantFilters = () => {
    const filtered = participants.filter(participantMatchesFilters);
    setFilteredParticipants(filtered);
  };

  const handleApplyFilters = (filters: {
    jobTitles: string[];
    dateAdded: string[];
  }) => {
    setParticipantFilters(filters);
    const filtered = participants.filter((participant) => {
      // Check if job title matches filter
      const jobTitleMatches =
        filters.jobTitles.includes("All") ||
        filters.jobTitles.includes(participant.job_title);

      // Check if date added matches filter
      const dateAddedMatches =
        filters.dateAdded.includes("All") ||
        filters.dateAdded.includes(participant.joining_date);

      return jobTitleMatches && dateAddedMatches;
    });
    setFilteredParticipants(filtered);
  };

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const hasActiveFilters = () => {
    return (
      !participantFilters.jobTitles.includes("All") ||
      !participantFilters.dateAdded.includes("All")
    );
  };

  const toggleSelectParticipant = (index: number) => {
    if (selectedParticipants.includes(index)) {
      setSelectedParticipants(selectedParticipants.filter((i) => i !== index));
    } else {
      setSelectedParticipants([...selectedParticipants, index]);
    }
  };
  const removeSelectedParticipants = () => {
    if (selectedParticipants.length === 0) return;

    const updatedParticipants = participants.filter(
      (_, index) => !selectedParticipants.includes(index)
    );

    setParticipants(updatedParticipants);
    setFilteredParticipants(updatedParticipants);
    setSelectedParticipants([]);
  };

  const handleAddNewParticipants = (selectedIds: string[]) => {
    console.log("Adding participants with IDs:", selectedIds);

    // Find the selected employees from the allEmployees array
    const newParticipants = allEmployees.filter((emp) =>
      selectedIds.includes(emp.employee_id)
    );

    // Add the new participants to the existing participants
    const updatedParticipants = [...participants, ...newParticipants];
    setParticipants(updatedParticipants);
    setFilteredParticipants(updatedParticipants);

    // Update the participant count in the focus group if one is selected
    if (selectedGroup) {
      const updatedGroup = {
        ...selectedGroup,
        participantCount: updatedParticipants.length,
      };

      // Update the focus group in the list
      const updatedGroups = focusGroups.map((group) =>
        group.focus_group_id === updatedGroup.focus_group_id
          ? updatedGroup
          : group
      );

      setFocusGroups(updatedGroups);
      setFilteredGroups(updatedGroups);
      setSelectedGroup(updatedGroup);
    }

    // Close the modal
    setShowAddParticipantsModal(false);
  };

  const participantMatchesFilters = (participant: Employee) => {
    // Check if job title matches filter
    const jobTitleMatches =
      participantFilters.jobTitles.includes("All") ||
      participantFilters.jobTitles.includes(participant.job_title);

    // Check if date added matches filter
    const dateAddedMatches =
      participantFilters.dateAdded.includes("All") ||
      participantFilters.dateAdded.includes(participant.joining_date);

    return jobTitleMatches && dateAddedMatches;
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header - consistent padding with main content */}
      <header className="bg-gray-100 z-10 p-6 pt-10 pb-4">
        <div className="flex items-center text-sm">
          <Link
            to="/focus-groups"
            className="text-gray-600 hover:text-gray-900"
          >
            Focus Groups
          </Link>
          <svg
            className="mx-2 h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-blue-600 font-medium">
            {selectedGroup.name}
          </span>
        </div>
      </header>

      {/* Dashboard content - consistent padding with smaller gaps */}
      <main className="p-6 pt-0">
        {/* Breadcrumb Navigation */}

        {/* Focus Group Details Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedGroup.name}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Group ID: {selectedGroup.focus_group_id}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Created on{" "}
              {new Date(selectedGroup.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Description:
            </h2>
            <p className="text-gray-500">
              {selectedGroup.description ||
                "The Workplace Stress & Well-being Group is a focus group formed by employees who share similar challenges regarding stress management and overall well-being at work. This group aims to discuss the common causes of workplace stress, explore potential solutions, and collaborate on strategies to improve mental health, work-life balance, and support structures."}
            </p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Target Metrics:
            </h2>
            <div className="flex gap-4">
              {selectedGroup.metrics.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-medium ${
                    {
                      Morality: "bg-amber-100 text-amber-800",
                      Engagement: "bg-teal-100 text-teal-800",
                      "Cultural Score": "bg-pink-100 text-pink-800",
                      "Leave Impact": "bg-green-100 text-[#7CC243]",
                    }[tag] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              No. of Participants:
            </h2>
            <p className="text-gray-700">{selectedGroup.members}</p>
          </div>
        </div>

        {/* Suggested Action Plans Section */}
        <div className="mb-6">
          <ActionPlansCarousel />
        </div>

        {/* Participants Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            All Participants
          </h2>

          <div className="mb-4 flex justify-between items-center">
            <div className="w-1/2">
              <SearchBar
                onSearch={handleParticipantSearch}
                placeholder="Search Participant"
              />
            </div>
            <div className="flex items-center space-x-3">
              <FilterButton
                onClick={handleFilter}
                isActive={hasActiveFilters()}
              />
              <button
                className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={removeSelectedParticipants}
                disabled={selectedParticipants.length === 0}
              >
                <svg
                  className="mr-2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Remove Selected
              </button>
              <button
                className="flex items-center rounded-md bg-[#80C342] px-4 py-2 text-sm font-medium text-white hover:bg-[#72b33b]"
                onClick={() => setShowAddParticipantsModal(true)}
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Participant
              </button>
            </div>
          </div>

          {/* Participants Table */}
          <div className="mt-4 overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-12 px-6 py-3">
                    <span className="sr-only">Select</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employee ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Job Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Added
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParticipants.map((participant, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#7CC243]-600 focus:ring-green-500"
                        checked={selectedParticipants.includes(index)}
                        onChange={() => toggleSelectParticipant(index)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {participant.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {participant.employee_id || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {participant.job_title || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {participant.joining_date || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Participants Modal */}
        {showAddParticipantsModal && (
          <AddParticipantsModal
            onClose={() => setShowAddParticipantsModal(false)}
            onAdd={handleAddNewParticipants}
            existingParticipants={participants}
            allEmployees={allEmployees}
          />
        )}

        {/* Participant Filter Modal */}
        {showFilterModal && (
          <ParticipantFilterModal
            onClose={() => setShowFilterModal(false)}
            onApply={handleApplyFilters}
            participants={participants}
            currentFilters={participantFilters}
          />
        )}
      </main>
    </div>
  );
}
