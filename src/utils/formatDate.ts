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
