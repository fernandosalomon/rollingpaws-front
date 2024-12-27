import { useEffect, useRef, useState } from "react";
import style from "../styles/AdminAppointments.module.css";
import { Modal, Spinner } from "react-bootstrap";
import clientAxios from "../helpers/clientAxios";
import CustomButton from "./shared/CustomButton";
import FormC from "./shared/FormC";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";

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
        const getDoctorsList = async () => {
            try {
                setIsLoading(true);
                const res = await clientAxios("/doctor/");
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

    const headerCalendar = [];

    for (let i = 1; i <= new Date(headerYear, headerMonth + 1, 0).getDate(); i++) {
        headerCalendar.push(new Date(selectedYear, headerMonth, i));
    }

    useEffect(() => {
        setIsLoading(true);
        const headerWidth = 78 * (headerCalendar.length + 1);
        setHeaderBoxWidth(headerWidth);
        const viewBox = headerBoxesContainerRef.current.getBoundingClientRect().width;
        setElementsPerPage(Math.floor(viewBox / 78));
        setNumberOfPages(Math.ceil(headerCalendar.length / Math.floor(viewBox / 78)) - 1)

        if (selectedYear === new Date().getFullYear() && selectedMonth === new Date().getMonth() && selectedDate === new Date().getDate()) {
            const page = Math.floor(selectedDate / Math.floor(viewBox / 78));
            setCurrentPage(page);
        }

        setIsLoading(false)
    }, [headerYear, headerMonth, headerDate])


    const handleSetDate = (year, month, date) => {
        setSelectedYear(year);
        setSelectedMonth(month);
        setSelectedDate(date);
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        } else {
            if (headerMonth === 0) {
                setHeaderYear(headerYear - 1);
                setHeaderMonth(11);
                setHeaderDate(1);
                setCurrentPage(numberOfPages);
            } else {
                setHeaderMonth(headerMonth - 1)
                setHeaderDate(1);
                setCurrentPage(numberOfPages);
            }
        }
    }

    const handleNext = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1)
        } else {
            if (headerMonth === 11) {
                setHeaderYear(headerYear + 1);
                setHeaderMonth(0);
                setHeaderDate(1);
                setCurrentPage(0)
            } else {
                setHeaderMonth(headerMonth + 1)
                setHeaderDate(1);
                setCurrentPage(0)
            }
        }
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
        const getAppointments = async () => {
            try {
                setIsLoading(true);
                const res = await clientAxios("/appointments/");
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
            const res = await clientAxios("/appointments/");
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
                const res = await clientAxios.delete(`/appointments/${appointmentID}`);
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>)
    } else {
        return (
            <>
                <div className={style.container}>
                    <h3>{`${monthInYear[headerMonth].monthName} ${headerYear}`}</h3>
                    <Container className={style.header}>
                        <div className={style.headerDateBoxesContainer} ref={headerBoxesContainerRef}>

                            {headerCalendar.slice(elementsPerPage * currentPage, (elementsPerPage * (currentPage + 1))).map((date) =>
                                <div className={`${style.headerDateBox} ${selectedDate === date.getUTCDate() && selectedMonth === date.getUTCMonth() && selectedYear === date.getUTCFullYear() ? style.selected : ""}`} onClick={() => handleSetDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())}>
                                    <p className="mb-0">{date.getDate()}</p>
                                    <p className="mb-0">{daysInWeek[date.getDay()].dayShortName}</p>
                                </div>
                            )}

                        </div>

                        <button className={`${style.controlButton} ${style.prevButton}`} onClick={handlePrev}>&lt;</button>
                        <button className={`${style.controlButton} ${style.nextButton}`} onClick={handleNext}>&gt;</button>

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