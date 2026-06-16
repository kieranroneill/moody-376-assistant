export default function formatRelativeTime(isoDateString: string): string {
  const then = new Date(isoDateString).getTime();
  const diff = Date.now() - then;
  const minute = Math.round(diff / 60000);
  let hour: number;

  if (minute < 1) {
    return 'just now';
  }

  if (minute < 60) {
    return `${minute}m ago`;
  }

  hour = Math.round(minute / 60);

  if (hour < 24) {
    return `${hour}h ago`;
  }

  return `${Math.round(hour / 24)}d ago`;
}
