import * as React from "react";
import { cn } from "@/lib/utils";
import { BadgeProps, badgeVariants } from "./BadgeProps";

// Define badge styles


// Allow both variant-based styling and custom className overrides


const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, customClass, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), customClass, className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
