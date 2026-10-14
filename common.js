export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

export function calculateRevisionDates(startDate) {
  const date = new Date(startDate);

  const oneWeekLater = new Date(date);
  oneWeekLater.setDate(date.getDate() + 7);

  const oneMonthLater = new Date(date);
  oneMonthLater.setMonth(date.getMonth() + 1);

  const threeMonthsLater = new Date(date);
  threeMonthsLater.setMonth(date.getMonth() + 3);

  const sixMonthsLater = new Date(date);
  sixMonthsLater.setMonth(date.getMonth() + 6);

  const oneYearLater = new Date(date);
  oneYearLater.setFullYear(date.getFullYear() + 1);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return [
    { date: formatDate(oneWeekLater), interval: "1 week" },
    { date: formatDate(oneMonthLater), interval: "1 month" },
    { date: formatDate(threeMonthsLater), interval: "3 months" },
    { date: formatDate(sixMonthsLater), interval: "6 months" },
    { date: formatDate(oneYearLater), interval: "1 year" },
  ];
}
