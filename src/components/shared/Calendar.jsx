import { useEffect, useState } from "react";
import { useCalendar, monthArray } from "../../helpers/useCalendar";
import style from "../../styles/Calendar.module.css";

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [day, setDay] = useState(date.getDate());

  useEffect(() => {
    setCalendar(useCalendar(year, month + 1));
  }, [year, month]);

  return (
    <>
      <div className={style.calendar}>
        <div className={style.calendarHeader}>
          <h4 className={style.month}>{`${monthArray[month]} ${year}`}</h4>
          <div className={style.controlButtons}>
            <button
              onClick={() => {
                if (month > 0) {
                  setMonth(month - 1);
                } else {
                  setMonth(11);
                  setYear(year - 1);
                }
              }}
            >
              &lt;
            </button>
            <button
              onClick={() => {
                if (month < 11) {
                  setMonth(month + 1);
                } else {
                  setMonth(0);
                  setYear(year + 1);
                }
              }}
            >
              &gt;
            </button>
          </div>
        </div>
        <table className="w-100">
          <thead>
            <tr className={style.tableHeader}>
              <th>DO</th>
              <th>LU</th>
              <th>MA</th>
              <th>MI</th>
              <th>JU</th>
              <th>VI</th>
              <th>SA</th>
            </tr>
          </thead>
          <tbody className={style.tableBody}>
            {calendar.map((week, index) => (
              <tr key={index} className={style.tableRow}>
                {week.map((day) => (
                  <td
                    key={day.number}
                    className={`${style.tableCell} ${
                      day.inactive ? style.inactive : ""
                    } ${
                      day.number === date.getDate() &&
                      month === date.getMonth() &&
                      year === date.getFullYear()
                        ? style.isToday
                        : ""
                    }`}
                    onClick={() => {
                      console.log(day.number);
                    }}
                  >
                    {day.number}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
