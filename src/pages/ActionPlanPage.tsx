import MultiStepActionPlanModal from "../components/ActionPlan/MultiStepActionPlanModal";
import DeleteConfirmationModal from "../components/ActionPlan/DeleteConfirmationModal";
import { ActionPlansCarousel } from "@/components/ActionPlan/Actionplan-carousal";
import { ActionPlanCard } from "@/components/ActionPlan/ActionPlanCard";
import { MetricFilter } from "@/components/ActionPlan/MetricFilter";
import { ActionSort } from "@/components/ActionPlan/ActionSort";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionPlan, FocusGroup } from "@/types";
import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ActionPlanFormValues {
  title: string;
  purpose: string;
  is_completed: boolean;
  target_groups: string[];
  metric: string[];
  steps: { title: string; description: string }[];
}

export default function ActionPlanPage() {
  const navigate = useNavigate();
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [focusGroups, setFocusGroups] = useState<FocusGroup[]>([]);
  // const [metrics, setMetrics] = useState<string[]>([
  //   "Cultural Score",
  //   "Morale",
  //   "Engagement",
  // ]);
  const metrics: string[] = ["Cultural Score", "Morale", "Engagement"];
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMetricFilters, setActiveMetricFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ActionPlan | undefined>(
    undefined
  );
  const [planToDelete, setPlanToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMetricFilterChange = (metrics: string[]) => {
    setActiveMetricFilters(metrics);
  };

  const handleSortChange = (sortValue: string) => {
    setSortOption(sortValue);
  };

  useEffect(() => {
    fetchActionPlans();
    fetchFocusGroups();
  }, []);

  const fetchActionPlans = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/actions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch action plans");
      }
      const data = await response.json();
      setActionPlans(data.data);
    } catch (error) {
      console.error("Error fetching action plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFocusGroups = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/groups/minified`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch focus groups");
      }
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        // Map the minified response to the expected format
        const minifiedGroups = data.data.map(
          (group: { focus_group_id: string; name: string }) => ({
            focus_group_id: group.focus_group_id,
            name: group.name,
          })
        );
        setFocusGroups(minifiedGroups);
      }
    } catch (error) {
      console.error("Error fetching focus groups:", error);
    }
  };

  // Function to reload data after modal actions
  const reloadData = () => {
    console.log("Reloading data...");
    fetchActionPlans();
    fetchFocusGroups();
  };

  // First filter by search query
  let processedPlans = searchQuery
    ? actionPlans.filter((plan) =>
        plan.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : actionPlans;

  // Apply metric filters if any are active
  if (activeMetricFilters.length > 0) {
    processedPlans = processedPlans.filter((plan) => {
      // Check if the plan has any of the selected metrics
      return (
        plan.metric &&
        Array.isArray(plan.metric) &&
        plan.metric.some((metric) => activeMetricFilters.includes(metric))
      );
    });
  }

  // Finally sort the filtered plans
  processedPlans = [...processedPlans].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "alpha_asc":
        return a.title.localeCompare(b.title);
      case "alpha_desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const handleCreateActionPlan = () => {
    // Open form modal with no selected plan (for creating new)
    setSelectedPlan(undefined);
    setIsFormModalOpen(true);
  };

  const handleViewDetails = (planId: string) => {
    // Navigate to action plan details page
    navigate(`/action-plan/${planId}`);
  };

  const handleEditPlan = (planId: string) => {
    // Find the plan to edit and open the form modal
    const planToEdit = actionPlans.find((plan) => plan.action_id === planId);
    if (planToEdit) {
      setSelectedPlan(planToEdit);
      setIsFormModalOpen(true);
    }
  };

  const handleDeletePlan = (planId: string) => {
    // Find the plan to delete and open the confirmation modal
    const planToDelete = actionPlans.find((plan) => plan.action_id === planId);
    if (planToDelete) {
      setPlanToDelete({
        id: planToDelete.action_id,
        title: planToDelete.title,
      });
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeletePlan = async () => {
    if (!planToDelete) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/actions/${planToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete action plan");
      }

      // Remove the deleted plan from state
      setActionPlans(
        actionPlans.filter((plan) => plan.action_id !== planToDelete.id)
      );

      // Close the modal
      setIsDeleteModalOpen(false);
      setPlanToDelete(null);
    } catch (error) {
      console.error("Error deleting action plan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPlanToDelete(null);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedPlan(undefined);
  };

  const handleSubmitForm = async (data: ActionPlanFormValues) => {
    setIsSubmitting(true);
    try {
      const isEditing = !!selectedPlan;

      // Format the data according to the API expectations
      let formattedData;

      if (isEditing && selectedPlan) {
        // For editing - use ActionData model
        formattedData = {
          action_id: selectedPlan.action_id,
          title: data.title,
          purpose: data.purpose,
          metric: data.metric,
          target_groups: data.target_groups.map((group) => group),
          steps: data.steps,
          is_completed: data.is_completed,
          created_at: selectedPlan.created_at,
        };
      } else {
        // For creating - use ActionCreate model
        formattedData = {
          title: data.title,
          purpose: data.purpose,
          metric: data.metric,
          target_groups: data.target_groups,
          steps: data.steps,
          is_completed: data.is_completed,
        };
      }

      const url = isEditing
        ? `${BACKEND_URL}/api/actions/${selectedPlan.action_id}`
        : `${BACKEND_URL}/api/actions`;

      const method = isEditing ? "PUT" : "POST";

      console.log(
        `${isEditing ? "Updating" : "Creating"} action plan:`,
        JSON.stringify(formattedData, null, 2)
      );

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server responded with ${response.status}: ${errorText}`);
        throw new Error(
          `Failed to ${isEditing ? "update" : "create"} action plan`
        );
      }

      const responseData = await response.json();

      // Update the UI state based on response
      if (isEditing) {
        // Update existing plan in the list
        setActionPlans(
          actionPlans.map((plan) =>
            plan.action_id === selectedPlan.action_id
              ? { ...plan, ...responseData.data }
              : plan
          )
        );
      } else {
        // Add new plan to the list
        setActionPlans([...actionPlans, responseData.data]);
      }

      // Close the modal and reset state
      setIsFormModalOpen(false);
      setSelectedPlan(undefined);
    } catch (error) {
      console.error(
        `Error ${selectedPlan ? "updating" : "creating"} action plan:`,
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header with Icon and Title */}
      <header className="bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center gap-3">
          <span className="text-[#80C342]">
            <img
              src="/icons/Action-plans.svg"
              alt="Action Plan"
              className="h-8 w-8"
            />
          </span>
          <h1 className="text-4xl font-semibold text-gray-800">Action Plans</h1>
        </div>
      </header>
      <main className="p-8 pt-0">
        {/* Carousel Section */}
        <div className="mb-10 w-full mx-auto">
          <ActionPlansCarousel />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">All Action Plans</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Search
                placeholder="Search Action Plans"
                onSearch={handleSearch}
              />
              <MetricFilter
                metrics={metrics}
                onFilterChange={handleMetricFilterChange}
              />
              <ActionSort onSortChange={handleSortChange} />
            </div>
            <Button
              className="flex items-center gap-2 text-white bg-[#80C342] hover:text-white hover:bg-[#80C342] cursor-pointer"
              onClick={handleCreateActionPlan}
            >
              <PlusIcon className="h-4 w-4" />
              Create Action Plan
            </Button>
          </div>
        </div>

        {/* Action Plans List */}
        {loading ? (
          Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="mt-2 mx-0 border border-gray-200 rounded-lg p-6 bg-white shadow-sm relative"
            >
              {/* Edit and Delete Icons skeleton */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-5 w-5 rounded-md" />
              </div>

              <div className="space-y-1">
                {/* Title skeleton */}
                <Skeleton className="h-[26px] w-96 rounded-md mb-1" />

                {/* Date and tags skeleton */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-[16px] w-32 rounded-md" />

                  <div className="flex items-center space-x-2 ml-2">
                    <Skeleton className="h-[22px] w-16 rounded-[0.5vw]" />
                    <Skeleton className="h-[22px] w-20 rounded-[0.5vw]" />
                  </div>
                </div>

                {/* Purpose text skeleton */}
                <Skeleton className="h-[20px] w-[80%] rounded-md mt-2" />

                {/* Target group and view details skeleton */}
                <div className="flex justify-between items-center mt-3">
                  {/* Target group skeleton */}
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-[18px] w-24 rounded-md" />
                    <Skeleton className="h-[18px] w-32 rounded-md" />
                  </div>

                  {/* View details button skeleton */}
                  <div className="flex space-x-2">
                    <Skeleton className="h-[20px] w-28 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : processedPlans.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-gray-500">
              {searchQuery || activeMetricFilters.length > 0
                ? "No action plans match your filters"
                : "No action plans found"}
            </span>
          </div>
        ) : (
          <div>
            {processedPlans.map((plan) => (
              <ActionPlanCard
                key={plan.action_id}
                plan={plan}
                onClick={() => handleViewDetails(plan.action_id)}
                onEdit={() => handleEditPlan(plan.action_id)}
                onDelete={() => handleDeletePlan(plan.action_id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeletePlan}
        title={planToDelete?.title || ""}
        isSubmitting={isSubmitting}
      />

      {/* Action Plan Creation/Edit Modal */}
      <MultiStepActionPlanModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitForm}
        plan={selectedPlan}
        focusGroups={focusGroups}
        metrics={metrics}
        isSubmitting={isSubmitting}
        onAfterClose={reloadData}
      />
    </div>
  );
}
