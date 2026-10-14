export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Parse a YYYY-MM-DD string as a local calendar date.
function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function calculateRevisionDates(dateString) {
  const startDate = parseLocalDate(dateString);

  function addMonthsClamped(date, months) {
    const result = new Date(date);
    const originalDay = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + months);

    const lastDayOfMonth = new Date(
      result.getFullYear(),
      result.getMonth() + 1,
      0,
    ).getDate();

    result.setDate(Math.min(originalDay, lastDayOfMonth));

    return result;
  }

  const oneWeekLater = new Date(startDate);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  const oneMonthLater = addMonthsClamped(startDate, 1);
  const threeMonthsLater = addMonthsClamped(startDate, 3);
  const sixMonthsLater = addMonthsClamped(startDate, 6);
  const oneYearLater = addMonthsClamped(startDate, 12);

  return [
    { date: formatDate(oneWeekLater), interval: "1 week" },
    { date: formatDate(oneMonthLater), interval: "1 month" },
    { date: formatDate(threeMonthsLater), interval: "3 months" },
    { date: formatDate(sixMonthsLater), interval: "6 months" },
    { date: formatDate(oneYearLater), interval: "1 year" },
  ];
}
