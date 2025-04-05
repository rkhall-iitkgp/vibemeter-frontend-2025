import { HorizontalRecognitionCard } from "../components/ActionPlan/Action-plan-component2";
import DeleteConfirmationModal from "../components/ActionPlan/DeleteConfirmationModal";
import { ActionPlansCarousel } from "@/components/ActionPlan/Actionplan-carousal";
import InitiativeModal from "../components/ActionPlan/Initiative-model";
import { FilterComponent } from "../components/ActionPlan/Filter";
import SearchBar from "../components/ActionPlan/Search-bar";
import { SortBy } from "../components/ActionPlan/Sortby";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ActionStep {
  title: string;
  description: string;
}

interface ActionPlan {
  action_id: string;
  title: string;
  purpose: string;
  metric: string[];
  steps: ActionStep[];
  is_completed: boolean;
  target_groups: any[];
  created_at: string;
}

// Map the backend response to the format expected by the UI
const mapResponseToActionPlan = (item) => {
  return {
    actionId: item.action_id,
    title: item.title || "Untitled Action Plan",
    createdDate: new Date(item.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    description: item.purpose || "No description available",
    targetGroup:
      item.target_groups && item.target_groups.length > 0
        ? item.target_groups[0].name
        : "All Groups",
    groupId:
      item.target_groups && item.target_groups.length > 0
        ? `#${item.target_groups[0].focus_group_id}`
        : "#N/A",
    tags: item.metric || [],
  };
};

// Sample data as fallback
const sampleActionPlans = [
  {
    actionId: "SAMPLE001",
    title: "Recognition Program",
    createdDate: "March 17, 2025",
    description:
      "Implement a monthly employee recognition program to celebrate achievements and boost morale. Something That can really motivate the employees to really understand their worth",
    targetGroup: "Leadership Group",
    groupId: "#GRP2345",
    tags: ["Morality", "Engagement"],
  },
  {
    actionId: "SAMPLE002",
    title: "Communication Improvement",
    createdDate: "March 12, 2025",
    description:
      "Establish regular team meetings and feedback sessions to improve internal communication and transparency across departments",
    targetGroup: "All Departments",
    groupId: "#GRP2346",
    tags: ["Communication", "Collaboration"],
  },
];

export default function ActionPlan() {
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [displayPlans, setDisplayPlans] = useState<ActionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Priority");
  const [isInitiativeModalOpen, setIsInitiativeModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  useEffect(() => {
    fetchActionPlans();
  }, []);

  // Update displayed plans when search query changes
  useEffect(() => {
    if (actionPlans.length > 0) {
      filterAndSortPlans();
    }
  }, [searchQuery, sortBy, actionPlans]);

  const filterAndSortPlans = () => {
    let filtered = [...actionPlans];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (plan) =>
          plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plan.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === "Date") {
      filtered.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    } else if (sortBy === "Alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    // Priority sorting would need implementation based on your priority system

    setDisplayPlans(filtered);
  };

  const fetchActionPlans = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/actions`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: { data: ActionPlan[]; status: string } =
        await response.json();
      //      console.log(responseData.data)
      // Handle the API response format
      if (Array.isArray(responseData)) {
        // // Direct array of action plans
        // const formattedActionPlans = responseData.map(mapResponseToActionPlan);
        setActionPlans(responseData.data);
        setDisplayPlans(responseData.data);
        setError(null);
      } else if (
        responseData &&
        responseData.status === "success" &&
        Array.isArray(responseData.data)
      ) {
        // Wrapped in a success response object
        // const formattedActionPlans = responseData.data.map(mapResponseToActionPlan);
        setActionPlans(responseData.data);
        setDisplayPlans(responseData.data);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Failed to fetch action plans:", err);
      setError("Failed to load action plans. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const openInitiativeModal = () => {
    setIsInitiativeModalOpen(true);
  };

  const closeInitiativeModal = () => {
    setIsInitiativeModalOpen(false);
  };

  // Opens the delete confirmation modal
  const openDeleteModal = (actionId) => {
    if (!actionId) return;

    // Find the plan to delete to display its title in the confirmation modal
    const planToDelete = actionPlans.find(
      (plan) => plan.action_id === actionId
    );
    if (planToDelete) {
      setPlanToDelete(planToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  // Closes the delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPlanToDelete(null);
  };

  // Handles the actual deletion after confirmation
  const confirmDelete = async () => {
    if (!planToDelete || isDeleting) return;

    const actionId = planToDelete.action_id;

    try {
      setIsDeleting(true);
      setDeleteError(null);

      const response = await fetch(`${BACKEND_URL}/api/actions/${actionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete action plan. Status: ${response.status}`
        );
      }

      // Remove the deleted plan from state
      setActionPlans((prevPlans) =>
        prevPlans.filter((plan) => plan.actionId !== actionId)
      );
      setDisplayPlans((prevPlans) =>
        prevPlans.filter((plan) => plan.actionId !== actionId)
      );

      // Close the modal
      closeDeleteModal();
      window.location.reload();

      // Show success message (optional)
      // toast.success("Action plan deleted successfully");
    } catch (err) {
      console.error("Error deleting action plan:", err);
      setDeleteError("Failed to delete action plan. Please try again later.");
      // toast.error("Failed to delete action plan");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header with Icon and Title */}
      <header className=" bg-gray-100 z-10 p-6 pt-8">
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
      <main className="p-6 pt-2">
        {/* Carousel Section */}
        <div className="mb-10">
          <ActionPlansCarousel />
        </div>

        {/* All Action Plans Section */}
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

          {/* Loading and Error States */}
          {isLoading && (
            <p className="text-center py-8">Loading action plans...</p>
          )}

          {!isLoading && error && (
            <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
              {error}
            </div>
          )}

          {deleteError && (
            <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
              {deleteError}
            </div>
          )}

          {/* Action Plans Cards */}
          <div className="space-y-4">
            {!isLoading && displayPlans.length === 0 && (
              <p className="text-center py-8 text-gray-500">
                No action plans found. Try adjusting your search or create a new
                one.
              </p>
            )}

            {!isLoading &&
              displayPlans?.map((plan, index) => {
                return (
                  <HorizontalRecognitionCard
                    key={index}
                    action_id={plan.action_id}
                    title={plan.title}
                    created_at={plan.created_at}
                    purpose={plan.purpose}
                    target_groups={plan.target_groups}
                    metrics={plan.metric}
                    onDelete={openDeleteModal}
                  />
                );
              })}
          </div>
        </div>

        {/* Initiative Modal */}
        {isInitiativeModalOpen && (
          <InitiativeModal
            onClose={closeInitiativeModal}
            onSuccess={fetchActionPlans}
          />
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && planToDelete && (
          <DeleteConfirmationModal
            onClose={closeDeleteModal}
            onConfirm={confirmDelete}
            actionTitle={planToDelete.title}
            isDeleting={isDeleting}
          />
        )}
      </main>
    </div>
  );
}
