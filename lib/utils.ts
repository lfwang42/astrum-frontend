import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getRegion(uid: string): string {
  if (uid) {
      const firstDigit = parseInt(uid[0])
      switch (firstDigit) {
          case 1:
          case 2:
              return "CN"
          case 5:
              return "BL"
          case 6:
              return "NA"
          case 7: 
              return "EU"
          case 8:
              return "ASIA"
          case 9:
              return "TW"
      }
  }
  return ""
}
