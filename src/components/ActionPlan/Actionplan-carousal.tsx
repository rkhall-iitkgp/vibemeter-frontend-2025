"use client";

import { fetchSuggestions } from "../../store/slices/suggestionsSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import type { Suggestion } from "@/types";
import { useEffect } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
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

	useEffect(() => {
		dispatch(fetchSuggestions(targetGroupId));
	}, [dispatch, targetGroupId]);
	console.log(items);
	const isVisible = true;

	if (!isVisible) return null;
	if (loading) return <div>Loading suggestions...</div>;
	if (!loading && !items && !items.length) return <div>Error: {error}</div>;
	if (items.length === 0) return <div>No suggestions available.</div>;

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
					{items.map((plan: Suggestion, index: number) => (
						<CarouselItem
							key={index}
							className="pl-4 w-full sm:basis-1/2 lg:basis-1/3"
							style={{ height: "inherit" }}
						>
							<Card
								title={plan.title}
								description={plan.purpose}
								priorityLevel={"high"}
								targetGroup={plan.target_group}
								categories={plan.metric}
								onViewDetails={() =>
									console.log(`View details for plan ${index}`)
								}
								className="h-full"
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
		</div>
	);
}
