export const getCalendar = (month, year) => {
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const numberOfDaysInLastMonth = new Date(year, month - 1, 0).getDate();
  const firstDayInMonth = new Date(2024, month - 1, 1).getDay();
  const lastDayInMonth = new Date(year, month, 0).getDay();
  const tempArray = [];
  const calendar = [];

  for (let i = firstDayInMonth; i > 0; i--) {
    tempArray.push({
      number: numberOfDaysInLastMonth - i + 1,
      inactive: true,
    });
  }

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    tempArray.push({ number: i, inactive: false });
  }

  for (let i = lastDayInMonth; i < 6; i++) {
    tempArray.push({ number: i - lastDayInMonth + 1, inactive: true });
  }

  for (let i = 0; i < tempArray.length; i = i + 7) {
    calendar.push(tempArray.slice(i, i + 7));
  }

  console.log(calendar);
  return calendar;
};

export const numberToMonth = {
  0: "Enero",
  1: "Febrero",
  2: "Marzo",
  3: "Abril",
  4: "Mayo",
  5: "Junio",
  6: "Julio",
  7: "Agosto",
  8: "Septiembre",
  9: "Octubre",
  10: "Noviembre",
  11: "Diciembre",
};

export const numberToWeekday = {
  0: "Dom",
  1: "Lun",
  2: "Mar",
  3: "Mie",
  4: "Jue",
  5: "Vie",
  6: "Sab",
};
