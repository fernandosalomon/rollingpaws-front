import { useEffect, useState, useRef } from "react";
import CustomCalendar from "../components/CustomCalendar";
import style from "../styles/AppointmentAdmin.module.css";
import clientAxios from "../helpers/clientAxios";
import { Spinner, ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import Table from "react-bootstrap/Table";

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
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [position, setPosition] = useState({});
  const [toastData, setToastData] = useState([]);
  const toastRef = useRef(null);
  const containerRef = useRef(null);

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

    week.push(nextDay);
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

  const positionAppointment = (date, startDate, endDate) => {
    if (date >= startDate && date <= endDate) {
      const dayIndex = date.getDate() - startDate.getDate();
      const hour = date.getHours();
      return {
        top: `${64 + (hour - openingHour) * 128}px`,
        left: `${100 + dayIndex * 150}px`,
      };
    }
  };

  const handleClickAppointment = ({ top, left }, data) => {
    if (showToast) {
      setShowToast(false);
    } else {
      setPosition({
        top: `calc(${top} - 36px)`,
        left: `calc(${left} + 160px)`,
      });
      setToastData(data);
      setShowToast(true);
    }
  };

  useEffect(() => {
    setSelectedDate(new Date(currentYear, currentMonth, currentDate));
  }, [currentYear, currentMonth, currentDate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const res = await clientAxios.get("/appointments/");
        setAppointments(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (showToast && toastRef.current && containerRef.current) {
      const { top, left, width, height } =
        toastRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollTop = containerRef.current.scrollTop;
      const scrollLeft = containerRef.current.scrollLeft;
      containerRef.current.scrollTo({
        top: scrollTop + top - containerRect.height / 2 + height / 2,
        left: scrollLeft + left - containerRect.width / 2 + width / 2,
        behavior: "smooth",
      });
    }
  }, [showToast]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
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
          <div className={style.sideB} ref={containerRef}>
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
                      <th key={index}>{`${
                        dayDictionary[weekDay.getDay()]
                      } ${weekDay.getDate()}`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={style.tableBody}>
                  {hours.map((hour, index) => (
                    <tr>
                      <td className={style.hourCell}>{hour}</td>
                      {week.map((weekDay) => (
                        <td></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {appointments.map((appointment) =>
                new Date(appointment.date) >= week[0] &&
                new Date(appointment.date) <= week[week.length - 1] ? (
                  <>
                    <div
                      style={positionAppointment(
                        new Date(appointment.date),
                        week[0],
                        week[week.length - 1]
                      )}
                      className={style.appointmentBoxContainer}
                      onClick={() => {
                        handleClickAppointment(
                          positionAppointment(
                            new Date(appointment.date),
                            week[0],
                            week[week.length - 1]
                          ),
                          appointment
                        );
                      }}
                    >
                      <div className={style.appointmentBox}>
                        <p className={style.appointmentBoxPacient}>
                          {appointment.pet.name}
                        </p>
                        <p className={style.appointmentBoxTime}>{`${new Date(
                          appointment.date
                        ).getHours()}:00 - ${
                          new Date(appointment.date).getHours() + 1
                        }:00`}</p>
                      </div>
                    </div>
                    {showToast && (
                      <ToastContainer
                        style={{
                          position: "absolute",
                          top: position.top,
                          left: position.left,
                        }}
                        className={style.toastContainer}
                        ref={toastRef}
                      >
                        <Toast onClose={() => setShowToast(false)}>
                          <Toast.Header>
                            <strong className="me-auto">Cita Programada</strong>
                          </Toast.Header>
                          <Toast.Body>
                            <Table>
                              <tr className={style.menuBodyRow}>
                                <td className={style.menuBodyCellLabel}>
                                  Paciente
                                </td>
                                <td>{toastData.pet.name}</td>
                              </tr>
                              <tr className={style.menuBodyRow}>
                                <td className={style.menuBodyCellLabel}>
                                  Veterinario
                                </td>
                                <td>{toastData.doctor}</td>
                              </tr>

                              <tr className={style.menuBodyRow}>
                                <td className={style.menuBodyCellLabel}>
                                  Horario
                                </td>
                                <td>{`${new Date(
                                  toastData.date
                                ).getDate()}/${new Date(
                                  toastData.date
                                ).getMonth()}/${new Date(
                                  toastData.date
                                ).getFullYear()} ${new Date(
                                  toastData.date
                                ).getHours()}:${new Date(
                                  toastData.date
                                ).getMinutes()}`}</td>
                              </tr>

                              <tr className={`${style.menuBodyRow} border-0`}>
                                <td className={style.menuBodyCellLabel}>
                                  Observaciones:
                                </td>
                              </tr>
                              <tr>
                                <td>{toastData.observations}</td>
                              </tr>
                            </Table>
                            <div className="d-flex justify-content-end">
                              <button className={style.editButton}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-pencil-square"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                  />
                                </svg>
                                <p className="mb-0">Editar</p>
                              </button>
                            </div>
                          </Toast.Body>
                        </Toast>
                      </ToastContainer>
                    )}
                  </>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Appointments;
