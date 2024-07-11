
import { message } from '@/app/(tabs)';
import { startOfWeek, endOfWeek, subWeeks, parseISO } from 'date-fns';

interface WeekSplit {
  currentWeek: message[];
  previousWeek: message[];
}

export function splitMessagesByWeek(messages: message[] | undefined): WeekSplit {
  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 0 });
  const startOfPreviousWeek = startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 0 });
  const endOfPreviousWeek = endOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 0 });

  const currentWeek: message[] = [];
  const previousWeek: message[] = [];

  messages?.forEach(message => {
    const messageDate = parseISO(message.created_at);
    if (messageDate >= startOfCurrentWeek && messageDate <= endOfCurrentWeek) {
      currentWeek.push(message);
    } else if (messageDate >= startOfPreviousWeek && messageDate <= endOfPreviousWeek) {
      previousWeek.push(message);
    }
  });

  return { currentWeek, previousWeek };
}
