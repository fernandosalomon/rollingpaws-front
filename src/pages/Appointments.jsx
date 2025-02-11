import { useEffect, useState, useRef } from "react";
import CustomCalendar from "../components/CustomCalendar";
import style from "../styles/AppointmentAdmin.module.css";
import clientAxios from "../helpers/clientAxios";
import { Spinner, ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import Table from "react-bootstrap/Table";
import FormC from "../components/shared/FormC";
import Swal from "sweetalert2";

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

  const [toastType, setToastType] = useState("view");

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

  const positionAppointment = (
    startDate,
    endDate,
    firstDayWeek,
    lastDayWeek
  ) => {
    if (startDate >= firstDayWeek && startDate <= lastDayWeek) {
      const dayIndex = startDate.getDate() - firstDayWeek.getDate();
      const startHour = startDate.getUTCHours();
      const startMinutes = startDate.getMinutes();
      return {
        top: `${64 + (startHour - openingHour) * 128 + startMinutes * (128 / 60)
          }px`,
        left: `${100 + dayIndex * 150}px`,
        height: `${((endDate.getUTCHours() - startHour) * 60 +
            +(endDate.getMinutes() - startMinutes)) *
          (128 / 60)
          }px`,
      };
    }
  };

  const handleClickAppointment = ({ top, left, height }, data) => {
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

  const handleCloseToast = () => {
    setShowToast(false);
    setToastType("view");
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const res = await clientAxios.get("/appointments/");
      setAppointments(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAppointment = async (appointmentID) => {
    try {
      const result = await Swal.fire({
        title: "¿Estas seguro que quieres borrar este turno?",
        text: "Estos cambios no se pueden revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrar",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const res = await clientAxios.delete(`/appointments/${appointmentID}`);
        Swal.fire({
          icon: "success",
          title: `El turno fue eliminado satisfactoriamente.`,
          showConfirmButton: false,
          timer: 2500,
        });
        handleUpdate();
        handleCloseToast();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `Hubo un error al tratar de eliminar el turno.`,
        text: `${error.data.message}`,
        showConfirmButton: false,
        timer: 2500,
      });
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
              selectedDate={selectedDate}
              allowPreviousDates={true}
              onHoverPointer={true}
            />
          </div>
          <div className={style.sideB} ref={containerRef}>
            <div className={style.sideBHeader}>
              <h4 className="mb-0">{`${monthInYear[selectedDate.getMonth()].monthName
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
                    {week.map((weekDay) => (
                      <th key={crypto.randomUUID()}>{`${dayDictionary[weekDay.getDay()]
                        } ${weekDay.getDate()}`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={style.tableBody}>
                  {hours.map((hour) => (
                    <tr key={crypto.randomUUID()}>
                      <td className={style.hourCell}>{hour}</td>
                      {week.map((weekDay) => (
                        <td key={crypto.randomUUID()}></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {appointments.map((appointment) =>
                new Date(appointment.startDate) >= week[0] &&
                  new Date(appointment.startDate) <= week[week.length - 1] ? (
                  <div key={crypto.randomUUID()}>
                    <div
                      style={positionAppointment(
                        new Date(appointment.startDate),
                        new Date(appointment.endDate),
                        week[0],
                        week[week.length - 1]
                      )}
                      className={style.appointmentBoxContainer}
                      onClick={() => {
                        handleClickAppointment(
                          positionAppointment(
                            new Date(appointment.startDate),
                            new Date(appointment.endDate),
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
                          appointment.startDate
                        ).getUTCHours()}:${new Date(appointment.startDate).getMinutes() < 10
                            ? "0"
                            : ""
                          }${new Date(
                            appointment.startDate
                          ).getMinutes()} - ${new Date(
                            appointment.endDate
                          ).getUTCHours()}:${new Date(appointment.endDate).getMinutes() < 10
                            ? "0"
                            : ""
                          }${new Date(appointment.endDate).getMinutes()}`}</p>
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
                        <Toast onClose={handleCloseToast}>
                          <Toast.Header className="align-items-center">
                            <strong className="me-auto">Turno Agendado</strong>
                            {toastType === "view" && (
                              <button
                                className={style.button}
                                onClick={() => setToastType("edit")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-pencil"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                </svg>
                              </button>
                            )}
                            <button
                              className={style.button}
                              onClick={() => {
                                handleDeleteAppointment(toastData._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                              </svg>
                            </button>
                          </Toast.Header>
                          <Toast.Body>
                            {toastType === "view" && (
                              <Table>
                                <tbody className="bg-transparent">
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
                                    <td>{`Dr/a. ${toastData.doctor.user.firstName} ${toastData.doctor.user.lastName}`}</td>
                                  </tr>

                                  <tr className={style.menuBodyRow}>
                                    <td className={style.menuBodyCellLabel}>
                                      Horario
                                    </td>
                                    <td>
                                      {`${new Date(
                                        toastData.startDate
                                      ).getDate()}/${new Date(
                                        toastData.startDate
                                      ).getMonth() + 1
                                        }/${new Date(
                                          toastData.startDate
                                        ).getFullYear()} 
                                      ${new Date(
                                          toastData.startDate
                                        ).getUTCHours()}:${new Date(
                                          toastData.startDate
                                        ).getMinutes() < 10
                                          ? "0"
                                          : ""
                                        }${new Date(
                                          toastData.startDate
                                        ).getMinutes()} - ${new Date(
                                          toastData.endDate
                                        ).getUTCHours()}:${new Date(
                                          toastData.endDate
                                        ).getMinutes() < 10
                                          ? "0"
                                          : ""
                                        }${new Date(
                                          toastData.endDate
                                        ).getMinutes()} hs.`}
                                    </td>
                                  </tr>

                                  <tr
                                    className={`${style.menuBodyRow} border-0`}
                                  >
                                    <td
                                      className={`${style.menuBodyCellLabel} border-0`}
                                      colSpan={2}
                                    >
                                      Observaciones:
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${style.menuBodyRow} border-0`}
                                  >
                                    <td colSpan={2} className="border-0">
                                      {toastData.observations}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            )}
                            {toastType === "edit" && (
                              <FormC
                                variant="edit-appointment"
                                data={toastData}
                                handleCloseModal={handleCloseToast}
                                handleUpdate={handleUpdate}
                              />
                            )}
                          </Toast.Body>
                        </Toast>
                      </ToastContainer>
                    )}
                  </div>
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
