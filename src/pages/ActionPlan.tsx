import React, { useState } from "react";
import { ActionPlansCarousel } from "../components/Actionplan-carousel";
import { HorizontalRecognitionCard } from "../components/Action-plan-component2";
import { Button } from "../components/ui/button";
import SearchBar from "../components/Searchbar";
import { FilterComponent } from "../components/Filter";
import { SortBy } from "../components/Sortby";
import { PlusIcon } from "lucide-react";
import InitiativeModal from "../components/InitiativeModel"; // Import the InitiativeModal component

// Sample data for horizontal cards
const actionPlans = [
  {
    title: "Recognition Program",
    createdDate: "March 17, 2025",
    description: "Implement a monthly employee recognition program to celebrate achievements and boost morale. Something That can really motivate the employees to really understand their worth",
    targetGroup: "Leadership Group",
    groupId: "#GRP2345",
    tags: ["Morality", "Engagement"],
  },
  {
    title: "Recognition Program",
    createdDate: "March 12, 2025",
    description: "Implement a monthly employee recognition program to celebrate achievements and boost morale. Something That can really motivate the employees to really understand their worth",
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
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      {/* Header with Icon and Title */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center">
          <div className="mr-3 bg-green-50 rounded-full p-2">
            <svg
              className="h-6 w-6 text-[#80c342]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" stroke="#80c342" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="6" stroke="#80c342" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="2" stroke="#80c342" strokeWidth="2" fill="none" />
              <path d="M22 12 L18 10" stroke="#80c342" strokeWidth="2" />
              <path d="M18 10 L20 6" stroke="#80c342" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Action Plans</h1>
        </div>
      </div>

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
              
              <FilterComponent filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
              
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
            {actionPlans.map((plan, index) => (
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