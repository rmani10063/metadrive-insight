import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "risk-high": "bg-risk-high/20 text-risk-high border-2 border-risk-high hover:bg-risk-high/30 font-bold shadow-[0_0_15px_rgba(239,68,68,0.3)]",
        "risk-moderate": "bg-risk-moderate/20 text-risk-moderate border-2 border-risk-moderate hover:bg-risk-moderate/30 font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)]",
        "risk-low": "bg-risk-low/20 text-risk-low border-2 border-risk-low hover:bg-risk-low/30 font-bold shadow-[0_0_15px_rgba(234,179,8,0.3)]",
        "cockpit": "bg-card/60 backdrop-blur-xl border border-cockpit-border text-foreground hover:bg-card/80 shadow-lg",
        "glass": "bg-card/40 backdrop-blur-md border border-border/50 text-foreground hover:bg-card/60",
        "neon": "bg-primary/10 border-2 border-primary text-primary hover:bg-primary/20 shadow-[0_0_20px_rgba(0,188,212,0.4)] font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
