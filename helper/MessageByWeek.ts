
import { message } from '@/interfaces/message';
import { startOfWeek, endOfWeek, subWeeks, parseISO } from 'date-fns';

interface WeekSplit {
  currentWeek: message[];
  previousWeek: message[];
  currentDay: message;
}

export const splitMessagesByWeek = (messages: message[] | undefined): WeekSplit => {
  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 0 });
  const startOfPreviousWeek = startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 0 });
  const endOfPreviousWeek = endOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 0 });

  const currentWeek: message[] = [];
  const previousWeek: message[] = [];
  let currentDay: message = {
    id: '',
    trays: [],
    created_at: '',
    updated_at: '',
    owner: { id: '', name: '', email: '', surname: '' },
    estimate: { small: 0, large: 0 },
    tray_count: 0,
    small_count: 0,
    large_count: 0
  }

  messages?.forEach(message => {
    const messageDate = parseISO(message.created_at);
    if (messageDate >= startOfCurrentWeek && messageDate <= endOfCurrentWeek) {
      currentWeek.push(message);
    } else if (messageDate >= startOfPreviousWeek && messageDate <= endOfPreviousWeek) {
      previousWeek.push(message);
    }

    if (messageDate.toLocaleDateString() == currentDate.toLocaleDateString()) {
      currentDay = message
    } else {
      currentDay
    }
  });

  return { currentDay, currentWeek, previousWeek };
}
