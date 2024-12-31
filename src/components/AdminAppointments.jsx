import { useEffect, useRef, useState } from "react";
import style from "../styles/AdminAppointments.module.css";
import { Modal } from "react-bootstrap";
import clientAxios from "../helpers/clientAxios";
import CustomButton from "./shared/CustomButton";
import FormC from "./shared/FormC";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import CustomCalendar from "./CustomCalendar";
import CustomSpinner from "./shared/CustomSpinner";

const AdminAppointments = () => {

    const [headerYear, setHeaderYear] = useState(new Date().getFullYear());
    const [headerMonth, setHeaderMonth] = useState(new Date().getUTCMonth());
    const [headerDate, setHeaderDate] = useState(new Date().getUTCDate());

    const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getUTCMonth());
    const [selectedDate, setSelectedDate] = useState(new Date().getUTCDate());
    const [doctorList, setDoctorList] = useState([]);
    const [headerBoxWidth, setHeaderBoxWidth] = useState(0);

    const [elementsPerPage, setElementsPerPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const headerBoxesContainerRef = useRef(null);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showCalendar, setShowCalendar] = useState(false);
    const handleCloseCalendar = () => setShowCalendar(false);
    const handleShowCalendar = () => setShowCalendar(true);

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

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const getDoctorsList = async () => {
            try {
                setIsLoading(true);
                const res = await clientAxios.get("/doctor/", {
                    headers: {
                        authtoken: token,
                    }
                });
                setDoctorList(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        getDoctorsList();
    }, [])

    const hours = [];
    const openingHour = 8;
    const closingHour = 21;
    for (let i = openingHour; i <= closingHour; i++) {
        hours.push(`${i >= 10 ? "" : "0"}${i} ${i > 12 ? "PM" : "AM"}`);
    }

    const positionAppointment = (startTime, endTime, openingHour, doctorID) => {
        const opening = (openingHour.hour * 60 + openingHour.minutes);
        const timeStart = (startTime.hour * 60 + startTime.minutes) - opening;
        const timeEnd = (endTime.hour * 60 + endTime.minutes) - opening;

        const top = 50 + (128 * (timeStart / 60));
        const left = (200 * doctorID) + 100;
        const height = ((timeEnd - timeStart) * 128) / 60

        return { top: `${top}px`, left: `${left}px`, height: `${height}px` }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const getAppointments = async () => {
            try {
                setIsLoading(true);
                const res = await clientAxios.get("/appointments/", {
                    headers: {
                        authtoken: token,
                    }
                });
                setAppointments(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        getAppointments();



    }, [])

    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            const token = sessionStorage.getItem("token");
            const res = await clientAxios.get("/appointments/", {
                headers: {
                    authtoken: token,
                }
            });
            setAppointments(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAppointment = async (appointmentID) => {
        try {
            const result = await Swal.fire({
                title: "¿Estas seguro que quieres borrar esta cita?",
                text: "Estos cambios no se pueden revertir",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Borrar",
                cancelButtonText: "No",
            });

            if (result.isConfirmed) {
                const token = sessionStorage.getItem("token");
                const res = await clientAxios.delete(`/appointments/${appointmentID}`, {
                    headers: {
                        authtoken: token,
                    }
                });
                Swal.fire({
                    icon: "success",
                    title: `La cita fue eliminada satisfactoriamente.`,
                    showConfirmButton: false,
                    timer: 2500,
                });
                handleUpdate();
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: `Hubo un error al tratar de eliminar la cita.`,
                text: `${error.data.message}`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }

    const handleSetDate = (year, month, day) => {
        setSelectedDate(day);
        setSelectedMonth(month);
        setSelectedYear(year);
        handleCloseCalendar();
    }

    if (isLoading) {
        return <CustomSpinner />
    } else {
        return (
            <>
                <div className={style.container}>
                    <Container className={style.header}>
                        <div className="d-flex gap-4 align-items-center">
                            <h3>{`${selectedDate} de ${monthInYear[selectedMonth].monthName} de ${selectedYear}`}</h3>
                            <button className={style.todayButton} onClick={() => handleSetDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}>Hoy</button>
                        </div>

                        <CustomButton variant="transparent" onClick={handleShowCalendar} className={style.calendarButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                            </svg>
                        </CustomButton>
                        <Modal show={showCalendar} onHide={handleCloseCalendar} contentClassName={style.modalContent} dialogClassName={style.modal} centered>
                            <Modal.Body>
                                <CustomCalendar border handleSetDate={handleSetDate} allowPreviousDates selectedDate={new Date()} className="rounded-0" />
                            </Modal.Body>
                        </Modal>

                    </Container>
                    <div className={style.body}>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th className={style.hourCell}></th>
                                    <th>Dr. John Doe</th>
                                    <th>Dra. Jane Doe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour) => (
                                    <tr key={crypto.randomUUID()}>
                                        <td className={style.hourCell} ><p className={style.hourContainer}>{hour}</p></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {
                            appointments.map((appointment) => {
                                const startDate = new Date(appointment.startDate);
                                const endDate = new Date(appointment.endDate);
                                const doctorID = doctorList.findIndex((doctor) => doctor._id === appointment.doctor);
                                if (startDate.getFullYear() === selectedYear && startDate.getMonth() === selectedMonth && startDate.getDate() === selectedDate) {
                                    return (
                                        <>
                                            <div className={style.appointmentBox} style={positionAppointment({ hour: startDate.getHours(), minutes: startDate.getMinutes() }, { hour: endDate.getHours(), minutes: endDate.getMinutes() }, { hour: 8, minutes: 0 }, doctorID)} onClick={handleShow}>
                                                <p><p className={style.appointmentBoxPacient}>
                                                    {appointment.pet.name}
                                                </p>
                                                    <p className={style.appointmentBoxTime}>{`${new Date(
                                                        appointment.startDate
                                                    ).getHours()}:${new Date(appointment.startDate).getMinutes() < 10
                                                        ? "0"
                                                        : ""
                                                        }${new Date(
                                                            appointment.startDate
                                                        ).getMinutes()} - ${new Date(
                                                            appointment.endDate
                                                        ).getHours()}:${new Date(appointment.endDate).getMinutes() < 10
                                                            ? "0"
                                                            : ""
                                                        }${new Date(appointment.endDate).getMinutes()}`}</p></p>
                                            </div>
                                            < Modal show={show} onHide={handleClose} >
                                                <Modal.Header closeButton>
                                                    <Modal.Title className="fs-2">Editar cita</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <FormC variant="edit-appointment" handleCloseModal={handleClose} handleUpdate={handleUpdate} data={appointment} />
                                                    <div className="w-100">
                                                        <CustomButton variant="transparent" className={style.deleteButton} type="button" onClick={(e) => { e.preventDefault(); handleDeleteAppointment(appointment._id) }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                            </svg>
                                                            <p className="mb-0">Eliminar Cita</p></CustomButton>
                                                    </div>
                                                </Modal.Body>
                                            </Modal >
                                        </>
                                    )
                                }
                            })
                        }
                    </div>
                </div>

            </>
        )

    }
}

export default AdminAppointments