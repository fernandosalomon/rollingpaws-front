import { useEffect, useState } from "react";
import useCalendar from "../helpers/useCalendar";

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    setCalendar(useCalendar(year, month));
  }, [year, month]);

  return (
    <>
      <button
        onClick={() => {
          setMonth(month + 1);
        }}
      >
        Next
      </button>
      <table>
        <thead>
          <tr>
            <th>Domingo</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sábado</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, index) => (
            <tr key={index}>
              {week.map((day) => (
                <td>{day}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;
