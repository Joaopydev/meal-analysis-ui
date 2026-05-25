export function formatDateToPt(dateString: string): string {
  // dateString format: "year-month-day" e.g., "2026-05-23"
  const [year, month, day] = dateString.split('-').map(Number);

  const meses = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ];

  // Get today's date in "year-month-day" format
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const dayStr = String(day).padStart(2, '0');
  const monthName = meses[month - 1];
  const dateFormatted = `${dayStr} DE ${monthName}`;

  if (dateString === todayString) {
    return `HOJE, ${dateFormatted}`;
  }

  return dateFormatted;
}

export function formatMealTime(dateTimeString: string): string {
  // dateTimeString format: "2026-05-25T12:25:00" or "2026-05-25T12:25:00Z" or similar
  // Converts to local user timezone automatically
  const dateObj = new Date(dateTimeString);
  
  // Get local time components in user's timezone
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
  // Get today's date in local timezone
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // Get the date from dateObj in local timezone
  const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  
  const formattedTime = `${hours}h${minutes}`;
  
  if (dateString === todayString) {
    return `HOJE, ${formattedTime}`;
  }
  
  return formattedTime;
}
