import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ErrorLike = { message?: string }
function hasMessage(e: unknown): e is ErrorLike {
  return typeof e === "object" && e !== null && "message" in (e as Record<string, unknown>)
}

export function formatErrors(errors: unknown[]) {
  return errors
    .map((e) =>
      typeof e === "string" ? e : hasMessage(e) && e.message ? e.message : String(e),
    )
    .join(", ")
}
