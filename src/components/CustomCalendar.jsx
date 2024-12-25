import { useEffect, useState } from "react";
import style from "../styles/CustomCalendar.module.css";

const CustomCalendar = ({
  border,
  handleSetDate,
  allowPreviousDates,
  selectedDate,
}) => {
  const [today, setToday] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [calendarArray, setCalendarArray] = useState([]);

  const daysInWeek = [
    {
      dayName: "Domingo",
      dayShortName: "Do",
      dayNumber: 0,
    },
    {
      dayName: "Lunes",
      dayShortName: "Lu",
      dayNumber: 1,
    },
    {
      dayName: "Martes",
      dayShortName: "Ma",
      dayNumber: 2,
    },
    {
      dayName: "Miércoles",
      dayShortName: "Mi",
      dayNumber: 3,
    },
    {
      dayName: "Jueves",
      dayShortName: "Ju",
      dayNumber: 4,
    },
    {
      dayName: "Viernes",
      dayShortName: "Vi",
      dayNumber: 5,
    },
    {
      dayName: "Sábado",
      dayShortName: "Sa",
      dayNumber: 6,
    },
  ];

  const monthInYear = [
    {
      monthName: "Enero",
      monthShortName: "Ene",
      monthNumber: 0,
    },
    {
      monthName: "Febrero",
      monthShortName: "Feb",
      monthNumber: 1,
    },
    {
      monthName: "Marzo",
      monthShortName: "Mar",
      monthNumber: 2,
    },
    {
      monthName: "Abril",
      monthShortName: "Abr",
      monthNumber: 3,
    },
    {
      monthName: "Mayo",
      monthShortName: "May",
      monthNumber: 4,
    },
    {
      monthName: "Junio",
      monthShortName: "Jun",
      monthNumber: 5,
    },
    {
      monthName: "Julio",
      monthShortName: "Jul",
      monthNumber: 6,
    },
    {
      monthName: "Agosto",
      monthShortName: "Ago",
      monthNumber: 7,
    },
    {
      monthName: "Septiembre",
      monthShortName: "Sep",
      monthNumber: 8,
    },
    {
      monthName: "Octubre",
      monthShortName: "Oct",
      monthNumber: 9,
    },
    {
      monthName: "Noviembre",
      monthShortName: "Nov",
      monthNumber: 10,
    },
    {
      monthName: "Diciembre",
      monthShortName: "Dic",
      monthNumber: 11,
    },
  ];

  const getCalendarArray = (year, month) => {
    const lastDayInLastMonth = new Date(year, month, 0);
    const lastDayInCurrentMonth = new Date(year, month + 1, 0);
    const numberOfDaysLastMonth = lastDayInLastMonth.getDate();
    const numberOfDaysCurrentMonth = lastDayInCurrentMonth.getDate();
    const lastWeekDayInLastMonth = lastDayInLastMonth.getDay();
    const lastWeekDayInCurrentMonth = lastDayInCurrentMonth.getDay();
    const tempArray = [];
    const calendar = [[]];

    for (let i = lastWeekDayInLastMonth; i >= 0; i--) {
      tempArray.push(new Date(year, month - 1, numberOfDaysLastMonth - i));
    }

    for (let i = 1; i <= numberOfDaysCurrentMonth; i++) {
      tempArray.push(new Date(year, month, i));
    }

    let cont = 1;
    for (let i = lastWeekDayInCurrentMonth + 1; i <= 6; i++) {
      tempArray.push(new Date(year, month + 1, cont));
      cont++;
    }
    let index = 0;
    for (let i = 0; i < tempArray.length; i++) {
      if (i !== 0 && i % 7 === 0) {
        calendar.push([]);
        index++;
      }
      calendar[index].push(tempArray[i]);
    }
    return calendar;
  };

  const prevMonth = () => {
    if (month <= 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month >= 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    const calendar = getCalendarArray(year, month);
    setCalendarArray(calendar);
  }, [year, month]);

  useEffect(() => {
    setSelectedDay(selectedDate.getDate());
    setSelectedMonth(selectedDate.getMonth());
    setSelectedYear(selectedDate.getFullYear());
    setMonth(selectedDate.getMonth());
    setYear(selectedDate.getFullYear());
  }, [selectedDate]);



  return (
    <div
      className={`${style.calendarContainer} ${border ? style.calendarContainerBorder : ""
        }`}
    >
      <div className={style.headerWrapper}>
        <button
          className={style.buttonHeader}
          onClick={(e) => {
            e.preventDefault();
            prevMonth();
          }}
        >
          &#11164;
        </button>
        <h4
          className={style.header}
        >{`${monthInYear[month].monthName} ${year}`}</h4>
        <button
          className={style.buttonHeader}
          onClick={(e) => {
            e.preventDefault();
            nextMonth();
          }}
        >
          &#11166;
        </button>
      </div>

      <table className={style.calendarTable}>
        <thead className={style.calendarTableHeader}>
          <tr>
            {daysInWeek.map((day) => (
              <th key={day.dayNumber} className={style.tableCell}>
                {day.dayShortName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className={style.horizontalSeparator} colSpan="6"></tr>
          {calendarArray.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  onClick={() => {
                    handleSetDate(
                      day.getFullYear(),
                      day.getMonth(),
                      day.getDate()
                    );
                    setSelectedDay(day.getDate());
                    setSelectedMonth(day.getMonth());
                    setSelectedYear(day.getFullYear());
                  }}
                  className={`${style.tableCell} ${day.getMonth() !== month ? style.fadeDayNumber : ""
                    } ${day.getDate() === new Date().getDate() &&
                      day.getMonth() === new Date().getMonth()
                      ? style.currentDate
                      : ""
                    } ${day.getDate() === selectedDay &&
                      day.getMonth() === selectedMonth &&
                      day.getFullYear() === selectedYear
                      ? style.selectedDate
                      : ""
                    } ${!allowPreviousDates && day.getDate() < today.getDate() ? style.disabledDate : ""
                    }`}
                >
                  {day.getDate()}
                </td>
              ))}
            </tr>
          ))}
          <tr className={style.horizontalSeparator} colSpan="6"></tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomCalendar;
