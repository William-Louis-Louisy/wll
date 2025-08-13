export function formatDate(timestamp: string): string {
  const date = new Date(Number(timestamp) * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${month.toString().padStart(2, "0")}/${year}`;
}
