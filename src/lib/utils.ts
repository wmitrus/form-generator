import clsx, { ClassValue } from 'clsx';
import { appendFile } from 'fs/promises';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function logToFile(message: string) {
  await appendFile('./logs/client.log', `\n${JSON.stringify({ message })}`, 'utf-8');
}
