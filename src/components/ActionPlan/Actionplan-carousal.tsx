"use client";

import { fetchSuggestions } from "../../store/slices/suggestionsSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Suggestion } from "@/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  adaptSuggestionToActionPlan,
  prepareSubmissionData,
} from "./Action-plan-adaptor";
import MultiStepActionPlanModal, {
  ActionPlanFormValues,
} from "./MultiStepActionPlanModal";
import { Card } from "./Card";

export function ActionPlansCarousel({
  targetGroupId,
}: {
  targetGroupId?: string;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.suggestions
  );

  // Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Suggestion | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchSuggestions(targetGroupId));
  }, [dispatch, targetGroupId]);

  const isVisible = true;

  if (!isVisible) return null;
  if (loading) return <div>Loading suggestions...</div>;
  if (!loading && !items && !items.length) return <div>Error: {error}</div>;
  if (items.length === 0) return <div>No suggestions available.</div>;

  // Handler for view details click
  const handleViewDetails = (plan: Suggestion) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  // Handler for form submission
  const handleSubmit = async (data: ActionPlanFormValues) => {
    setIsSubmitting(true);
    try {
      // Prepare the data for submission using our adapter
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      // For suggested actions, we're always creating a new action plan based on the suggestion
      const submissionData = prepareSubmissionData(data, false);

      // Submit to API
      const response = await fetch(`${BACKEND_URL}/api/actions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to create action plan");
      }

      // Success, close modal
      setIsModalOpen(false);
      setSelectedPlan(null);

      // Optionally refresh the page or update the UI
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-grey-100 rounded-lg p-6 px-10 relative mx-auto">
      <div className="flex justify-between items-center mb-5 pt-1">
        <h2 className="text-lg font-semibold">Suggested Action Plans</h2>
      </div>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          loop: false,
          dragFree: true,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-4">
          {items?.length &&
            items.map((plan: Suggestion, index: number) => (
              <CarouselItem
                key={index}
                className="pl-4 w-full sm:basis-1/2 lg:basis-1/3"
                style={{ height: "inherit" }}
              >
                <Card
                  title={plan.title}
                  description={plan.purpose}
                  priorityLevel={"high"}
                  targetGroup={plan.name}
                  categories={plan.metric}
                  onViewDetails={() => handleViewDetails(plan)}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <CarouselPrevious className="!h-9 !w-9 -ml-7 bg-white text-black shadow-none border-0 " />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <CarouselNext className="!h-9 !w-9 -mr-7 bg-white text-black shadow-none border-0" />
        </div>
      </Carousel>

      {/* Add the MultiStepActionPlanModal */}
      {selectedPlan && (
        <MultiStepActionPlanModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          plan={adaptSuggestionToActionPlan(selectedPlan)}
          focusGroups={[]} // You might want to fetch focus groups here
          metrics={
            selectedPlan.metric
              ? Array.isArray(selectedPlan.metric)
                ? selectedPlan.metric
                : [selectedPlan.metric]
              : []
          }
          isSubmitting={isSubmitting}
          onAfterClose={() => window.location.reload()} // Refresh after closing
        />
      )}
    </div>
  );
}
