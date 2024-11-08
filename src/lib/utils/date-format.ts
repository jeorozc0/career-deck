import { format, formatDistance } from 'date-fns';

export const dateUtils = {
  standard: (date: string) => format(new Date(date), 'MM/dd/yyyy'),
  withTime: (date: string) => format(new Date(date), 'MM/dd/yyyy HH:mm'),
  relative: (date: string) => formatDistance(new Date(date), new Date(), { addSuffix: true })
};
