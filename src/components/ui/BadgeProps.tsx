import { cva, type VariantProps } from "class-variance-authority";
const badgeVariants = cva(
  "inline-flex items-center rounded-[16px] px-5 py-1 text-sm font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/70 text-white ",
        secondary: "border-transparent bg-blue-300 text-white ",
        destructive: "border-transparent bg-[#F46D65] text-white",
        success: "bg-green-300 text-white",
        warning: "bg-[#F7C02B] text-white",
        outline: "text-white",

      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  customClass?: string;
}

export {badgeVariants};