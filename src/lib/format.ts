export const padNumber = (n: number): string => String(n).padStart(3, '0');

export const formatMonth = (date: Date): string =>
  date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

export const formatMonthShort = (date: Date): string =>
  date.toLocaleString('en-US', { month: 'short', year: 'numeric' });

export const formatReadingTime = (minutes: number): string => `${minutes} min`;
