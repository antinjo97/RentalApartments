import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-20 w-full rounded-xl border-2 bg-background px-4 py-3 text-base shadow-sm transition-all duration-300 ease-in-out outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-primary/60 hover:shadow-md",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
