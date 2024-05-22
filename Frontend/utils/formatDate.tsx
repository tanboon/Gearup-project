export default function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const monthAbbreviation = date.toLocaleString('default', { month: 'short' });
  
    return `${day} ${monthAbbreviation} ${year}`;
  };