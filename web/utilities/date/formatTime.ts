export default function formatTime(isoDateString: string): string {
  try {
    return new Date(isoDateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}
