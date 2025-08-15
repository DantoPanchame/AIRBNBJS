import { differenceInCalendarDays } from 'date-fns';

export function diffDays(start: Date, end: Date) {
  return differenceInCalendarDays(end, start);
}
