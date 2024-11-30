import { useEffect, useState } from "react";
import style from "../styles/CustomCalendar.module.css";
import Container from "react-bootstrap/Container";

const CustomCalendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const [numberDaysInMonth, setNumberDaysInMonth] = useState(
    new Date(year, month + 1, 0).getDate()
  );
  const [numberDaysInLastMonth, setNumberDaysInLastMonth] = useState(
    new Date(year, month, 0).getDate()
  );
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

  const getCalendarArray = () => {
    const calendarArray = [];
    const temp = [];
    const lastDayLastMonth = new Date(year, month, 0).getDay();
    const lastDayMonth = new Date(year, month + 1, 0).getDay();
    for (let day = lastDayLastMonth; day >= 0; day--) {
      const dayNumber = numberDaysInLastMonth - day;
      calendarArray.push(new Date(year, month - 1, dayNumber));
    }
    for (let day = 1; day <= numberDaysInMonth; day++) {
      calendarArray.push(new Date(year, month, day));
    }
    for (let day = lastDayMonth; day > 6; day--) {
      const dayNumber = lastDayMonth - day + 1;
      calendarArray.push(new Date(year, month + 1, dayNumber));
    }
    let cont = 0;
    temp.push([]);
    calendarArray.forEach((val, index) => {
      if (temp[cont].length < 7) {
        temp[cont].push(val);
      } else {
        temp.push([]);
        cont++;
        temp[cont].push(val);
      }
    });
    return temp;
  };

  useEffect(() => {
    const calendar = getCalendarArray();
    setCalendarArray(calendar);
  }, []);

  return (
    <Container>
      <div className={style.header}>
        <h4>{`${monthInYear[month].monthName} ${year}`}</h4>
      </div>
      <table>
        <thead>
          <tr>
            {daysInWeek.map((day) => (
              <th key={day.dayNumber}>{day.dayShortName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarArray.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex} onClick={() => console.log(day)}>
                  {day.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default CustomCalendar;
