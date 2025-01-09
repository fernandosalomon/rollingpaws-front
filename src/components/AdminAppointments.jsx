import { useEffect, useState } from "react";
import style from "../styles/AdminAppointments.module.css";
import { Modal } from "react-bootstrap";
import clientAxios from "../helpers/clientAxios";
import CustomButton from "./shared/CustomButton";
import FormC from "./shared/FormC";
import Container from "react-bootstrap/Container";
import CustomCalendar from "./CustomCalendar";
import CustomSpinner from "./shared/CustomSpinner";

const AdminAppointments = () => {

    const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getUTCMonth());
    const [selectedDate, setSelectedDate] = useState(new Date().getUTCDate());
    const [doctorList, setDoctorList] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalData, setModalData] = useState([]);

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

    const handleSetDate = (year, month, day) => {
        setSelectedDate(day);
        setSelectedMonth(month);
        setSelectedYear(year);
        handleCloseCalendar();
    }

    if (isLoading) {
        return (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center mb-4">
                <CustomSpinner />
            </div >
        )
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
                            isLoading ?
                                <div className="h-100 w-100 d-flex justify-content-center align-items-center mb-4">
                                    <CustomSpinner />
                                </div >
                                :
                                appointments.map((appointment) => {
                                    const startDate = new Date(appointment.startDate);
                                    const startTime = appointment.startTime;
                                    const endDate = new Date(appointment.endDate);
                                    const endTime = appointment.endTime;
                                    const today = new Date(`${new Date().getUTCFullYear()}-${Number(new Date().getUTCMonth()) + 1 < 10 ? "0" : ""}${Number(new Date().getUTCMonth()) + 1}-${Number(new Date().getUTCDate()) < 10 ? "0" : ""}${Number(new Date().getUTCDate())}T00:00:00+00:00`);
                                    const doctorID = doctorList.findIndex((doctor) => doctor._id === appointment.doctor);

                                    if (startDate.getUTCFullYear() === selectedYear && startDate.getUTCMonth() === selectedMonth && startDate.getUTCDate() === selectedDate) {
                                        return (
                                            <>
                                                <div className={style.appointmentBox} style={positionAppointment({ hour: Number(startTime.split(":")[0]), minutes: Number(startTime.split(":")[1]) }, { hour: Number(endTime?.split(":")[0]), minutes: Number(endTime?.split(":")[1]) }, { hour: 8, minutes: 0 }, doctorID)} onClick={() => { setModalData(appointment); handleShow() }}>
                                                    <p><p className={style.appointmentBoxPacient}>
                                                        {appointment.pet.name}
                                                    </p>
                                                        <p className={style.appointmentBoxTime}>{`${appointment.startTime} - ${appointment.endTime}`}</p></p>
                                                </div>
                                                < Modal show={show} onHide={handleClose} modalData={modalData}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title className="fs-2">Editar turno</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        {
                                                            (startDate <= today) ?
                                                                appointment.startTime.split(":")[0] > new Date().getHours() ?
                                                                    appointment.startTime.split(":")[0] === new Date().getHours() ?
                                                                        appointment.startTime.split(":")[1] > new Date().getMinutes() ?
                                                                            <FormC variant="edit-appointment-admin" handleCloseModal={handleClose} handleUpdate={handleUpdate} data={modalData} />
                                                                            :
                                                                            <FormC variant="edit-appointment-admin" handleCloseModal={handleClose} handleUpdate={handleUpdate} data={modalData} /> :
                                                                        <FormC variant="edit-appointment-admin" handleCloseModal={handleClose} handleUpdate={handleUpdate} data={modalData} /> :
                                                                    <>
                                                                        <h2 className={style.oldAppointmentTitle}>Turno caducado</h2>
                                                                        <span className={style.oldAppointmentIcon}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-exclamation-lg" viewBox="0 0 16 16">
                                                                                <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
                                                                            </svg>
                                                                        </span>
                                                                        <p className={style.oldAppointmentText}>Este turno ya caducó. Para reprogramar una visita debes sacar un turno nuevo. Muchas gracias</p>
                                                                    </>
                                                                :
                                                                <FormC variant="edit-appointment-admin" handleCloseModal={handleClose} handleUpdate={handleUpdate} data={modalData} />

                                                        }
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