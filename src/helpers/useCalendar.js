const useCalendar = (year, month) => {
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const numberOfDaysInLastMonth = new Date(year, month - 1, 0).getDate();
  const firstDayInMonth = new Date(2024, month - 1, 1).getDay();
  const lastDayInMonth = new Date(year, month, 0).getDay();

  const tempArray = [];
  const monthCalendar = [];

  for (let i = firstDayInMonth; i > 0; i--) {
    tempArray.push(numberOfDaysInLastMonth - i + 1);
  }

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    tempArray.push(i);
  }

  for (let i = lastDayInMonth; i < 6; i++) {
    tempArray.push(i - lastDayInMonth + 1);
  }

  for (let i = 0; i < tempArray.length; i = i + 7) {
    monthCalendar.push(tempArray.slice(i, i + 7));
  }

  return monthCalendar;
};

export default useCalendar;
