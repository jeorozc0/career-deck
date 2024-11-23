import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSalaryRange = (min?: number, max?: number): string | null => {
  if (!min && !max) return null;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 0,
  });

  // Type guard to ensure we're passing numbers
  const formatValue = (value: number | undefined) => {
    if (typeof value === 'number') {
      return formatter.format(value);
    }
    return formatter.format(0);
  };

  return `${formatValue(min)} - ${formatValue(max)}`;
};

