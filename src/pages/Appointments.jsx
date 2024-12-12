import { useEffect, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import style from "../styles/AppointmentAdmin.module.css";

const Appointments = () => {
  const today = new Date();
  const openingHour = 8;
  const closingHour = 21;
  const hours = [];
  const week = [];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const dayDictionary = {
    0: "Dom",
    1: "Lun",
    2: "Mar",
    3: "Mie",
    4: "Jue",
    5: "Vie",
    6: "Sab",
  };

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

  const handleSetDate = (fullYear, month, date) => {
    const newDate = new Date(fullYear, month, date);
    setSelectedDate(newDate);
  };

  for (let i = openingHour; i <= closingHour; i++) {
    hours.push(`${i >= 10 ? "" : "0"}${i} ${i > 12 ? "AM" : "PM"}`);
  }

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + i
    );

    week.push({
      date: nextDay.getDate(),
      day: dayDictionary[nextDay.getDay()],
      fullYear: nextDay.getFullYear(),
      month: nextDay.getMonth(),
    });
  }

  const handlePrevDay = () => {
    if (currentDate - 1 < 1) {
      if (currentMonth - 1 < 0) {
        setCurrentMonth(11);
        setCurrentDate(new Date(currentYear, currentMonth + 1, -1).getDate());
      } else {
        setCurrentMonth(currentMonth - 1);
        setCurrentDate(new Date(currentYear, currentMonth + 1, -1).getDate());
      }
    } else {
      setCurrentDate(currentDate - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDate >= new Date(currentYear, currentMonth + 1, -1)) {
      if (currentMonth >= 11) {
        setCurrentYear(currentYear + 1);
        setCurrentMonth(0);
        setCurrentDate(1);
      } else {
        setCurrentMonth(month + 1);
        setCurrentDate(1);
      }
    } else {
      setCurrentDate(currentDate + 1);
    }
  };

  useEffect(() => {
    setSelectedDate(new Date(currentYear, currentMonth, currentDate));
  }, [currentYear, currentMonth, currentDate]);

  return (
    <div>
      <div className={style.container}>
        <div className={style.sideA}>
          <CustomCalendar
            border
            handleSetDate={handleSetDate}
            pickedDate={selectedDate}
            allowPreviousDates={true}
          />
        </div>
        <div className={style.sideB}>
          <div className={style.sideBHeader}>
            <h4 className="mb-0">{`${
              monthInYear[selectedDate.getMonth()].monthName
            } ${selectedDate.getFullYear()}`}</h4>
            <button
              className={`${style.button} ${style.todayButton}`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedDate(today);
              }}
            >
              Hoy
            </button>
            <div className={style.controlButtons}>
              <button
                className={style.button}
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevDay();
                }}
              >
                &lt;
              </button>
              <button
                className={style.button}
                onClick={(e) => {
                  e.preventDefault();
                  handleNextDay();
                }}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className={style.sideBBody}>
            <table className={style.table}>
              <thead className={style.tableHeader}>
                <tr>
                  <th className={style.hourCell}></th>
                  {week.map((weekDay, index) => (
                    <th key={index}>{`${weekDay.day} ${weekDay.date}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={style.tableBody}>
                {hours.map((hour, index) => (
                  <tr>
                    <td className={style.hourCell}>{hour}</td>
                    {week.map((weekDay) => (
                      <td
                        onClick={() => {
                          console.log(
                            new Date(
                              weekDay.fullYear,
                              weekDay.month,
                              weekDay.date,
                              openingHour + index
                            )
                          );
                        }}
                      ></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
