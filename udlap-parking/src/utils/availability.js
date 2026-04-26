export function calculateAvailability(spots) {
  const total = spots.length;
  const free = spots.filter(s => s.status === 'free').length;

  const ratio = free / total;

  if (ratio > 0.7) return 'green';
  if (ratio > 0.4) return 'yellow';
  if (ratio > 0.2) return 'orange';
  return 'red';
}