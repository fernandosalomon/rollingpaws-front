import { useEffect, useState } from "react";
import style from "../styles/Scheduler.module.css";
import { getCalendar, numberToMonth } from "../helpers/DateFunctions";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import useFetchAppointment from "../helpers/useFetchAppointment";

const SchedulerCell = ({ children, label, fadeDate, date }) => {
  const appointments = useFetchAppointment();

  const todayAppointments =
    appointments.filter(
      (appointment) =>
        appointment.startDate.getFullYear() === date.getFullYear() &&
        appointment.startDate.getMonth() === date.getMonth() &&
        appointment.startDate.getDate() === date.getDate()
    ) || [];

  return (
    <div className={style.schedulerViewCell}>
      <div
        className={`${style.schedulerViewCellLabel} ${
          fadeDate ? style.schedulerViewCellLabelFaded : ""
        }`}
      >
        <p className="m-0 mb-2">{label}</p>
        {todayAppointments.map((appointment) => (
          <div className={style.appointmentBoxMonthly}>
            <h3 className="mb-0 pt-2 ps-2 fs-5 h-100">{`${
              appointment.owner
            } - ${appointment.startDate.getHours()}:00 - ${appointment.endDate.getHours()}:00`}</h3>
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};

const SchedulerCellWD = ({ children, className, date }) => {
  const appointments = useFetchAppointment();

  const todayAppointments =
    appointments.filter(
      (appointment) =>
        appointment.startDate.getFullYear() === date.getFullYear() &&
        appointment.startDate.getMonth() === date.getMonth() &&
        appointment.startDate.getDate() === date.getDate()
    ) || [];

  return (
    <div className={`${style.schedulerCellWDContainer} ${className}`}>
      <div className={style.gridWrapper} onClick={() => console.log(date)}>
        {children}
      </div>
      <div className={style.appointmentWrapper}>
        <div className={style.appointmentContainer}>
          {todayAppointments.map((appointment) => (
            <div
              style={{
                position: "absolute",
                top: `${appointment.startDate.getHours() * 40}px`,
                height: `${
                  (appointment.endDate.getHours() -
                    appointment.startDate.getHours()) *
                  40
                }px`,
              }}
              className={style.appointmentBox}
            >
              <h3 className="pt-2 ps-2">{appointment.owner}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Scheduler = () => {
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(today.getMonth());
  const [week, setWeek] = useState(0);
  const [year, setYear] = useState(today.getFullYear());
  const [day, setDay] = useState(today.getDate());
  const [calendar, setCalendar] = useState([]);
  const [view, setView] = useState("monthly");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCalendarData = (month, year) => {
      const data = getCalendar(month, year);
      setIsLoading(false);
      return data;
    };
    setCalendar(getCalendarData(month, year));
  }, [month]);

  return (
    <>
      {!isLoading ? (
        <>
          <div className={style.container}>
            <div className={style.schedulerHeader}>
              <div className="d-flex gap-4 align-items-center py-4">
                <button
                  className={style.schedulerNavButton}
                  onClick={() => {
                    setMonth(today.getMonth());
                    setYear(today.getFullYear());
                    setDay(today.getDate());
                  }}
                >
                  Hoy
                </button>
                <div>
                  <button
                    className={style.schedulerNavArrows}
                    onClick={() => {
                      if (view === "monthly") {
                        if (month - 1 < 0) {
                          setMonth(11);
                          setYear(year - 1);
                        } else {
                          setMonth(month - 1);
                        }
                      }
                      if (view === "weekly") {
                        if (week - 1 < 0) {
                          if (month - 1 < 0) {
                            setYear(year - 1);
                            setMonth(11);
                            setIsLoading(true);
                            setWeek(getCalendar(11, year - 1).length - 1);
                          } else {
                            setMonth(month - 1);
                            setIsLoading(true);
                            setWeek(getCalendar(month - 1, year).length - 1);
                          }
                          const isDayEndWeek = calendar[week].filter((day) => {
                            return day.inactive !== true;
                          });

                          if (isDayEndWeek.length > 0) {
                            setWeek(getCalendar(month, year).length - 2);
                          }
                        } else {
                          setWeek(week - 1);
                        }
                      }
                      if (view === "daily") {
                        if (day - 1 <= 0) {
                          if (month - 2 < 0) {
                            setDay(new Date(year, month, 0).getDate());
                            setMonth(11);
                            setYear(year - 1);
                          } else {
                            setDay(new Date(year, month, 0).getDate());
                            setMonth(month - 1);
                          }
                        } else {
                          setDay(day - 1);
                        }
                      }
                    }}
                  >
                    &lt;
                  </button>
                  <button
                    className={style.schedulerNavArrows}
                    onClick={() => {
                      if (view === "monthly") {
                        if (month + 1 > 11) {
                          setMonth(0);
                          setIsLoading(true);
                          setYear(year + 1);
                        } else {
                          setMonth(month + 1);
                        }
                      }
                      if (view === "weekly") {
                        if (week + 1 >= calendar.length) {
                          if (month + 1 > 11) {
                            setMonth(0);
                            setIsLoading(true);
                            setYear(year + 1);
                            setWeek(0);
                          } else {
                            setMonth(month + 1);
                            setIsLoading(true);
                            setWeek(0);
                          }

                          const isDayStartWeek = calendar[week].filter(
                            (day) => {
                              return day.inactive !== true;
                            }
                          );

                          if (isDayStartWeek.length > 0) {
                            setWeek(1);
                          }
                        } else {
                          setWeek(week + 1);
                        }
                      }
                      if (view === "daily") {
                        if (day + 1 >= new Date(year, month + 2, 0).getDate()) {
                          if (month + 1 > 11) {
                            setDay(1);
                            setMonth(0);
                            setYear(year + 1);
                          } else {
                            setDay(1);
                            setMonth(month + 1);
                          }
                        } else {
                          setDay(day + 1);
                        }
                      }
                    }}
                  >
                    &gt;
                  </button>
                </div>
                <p className={style.schedulerNavLabel}>
                  {view === "monthly" && `${numberToMonth[month]} ${year}`}
                  {view === "weekly" &&
                    `${calendar[week][0].number} de ${
                      numberToMonth[
                        calendar[week][0].month === -1
                          ? 11
                          : calendar[week][0].month
                      ]
                    } - ${calendar[week].slice(-1)[0].number} de ${
                      numberToMonth[
                        calendar[week].slice(-1)[0].month === 12
                          ? 0
                          : calendar[week].slice(-1)[0].month
                      ]
                    }`}
                  {view === "daily" && `${day} de ${numberToMonth[month]}`}
                </p>
              </div>
              <div>
                <ButtonGroup className="h-100 d-flex align-items-center">
                  <Button
                    className={`${style.schedulerViewButton} ${
                      view === "daily" && style.schedulerViewButtonActive
                    }`}
                    onClick={() => setView("daily")}
                  >
                    Diario
                  </Button>
                  <Button
                    className={`${style.schedulerViewButton} ${
                      view === "weekly" && style.schedulerViewButtonActive
                    }`}
                    onClick={() => setView("weekly")}
                  >
                    Semanal
                  </Button>
                  <Button
                    className={`${style.schedulerViewButton} ${
                      view === "monthly" && style.schedulerViewButtonActive
                    }`}
                    onClick={() => setView("monthly")}
                  >
                    Mensual
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <div className={style.schedulerViewContainer}>
              <div className={style.schedulerView}>
                {(view === "monthly" || view === "weekly") && (
                  <>
                    <div className={style.schedulerViewHeaderHorizontal}>
                      <div
                        className={`${
                          view === "monthly"
                            ? style.schedulerViewHeaderCellsMonthly
                            : view === "weekly"
                            ? style.schedulerViewHeaderCellsWeekly
                            : ""
                        }`}
                      >
                        {view === "monthly" && (
                          <>
                            <div className={style.schedulerViewHeaderCell}>
                              Dom
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Lun
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Mar
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Mie
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Jue
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Vie
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Sab
                            </div>
                          </>
                        )}
                        {view === "weekly" && (
                          <>
                            <div
                              className={style.schedulerViewHeaderCell}
                            ></div>
                            <div
                              className={`${style.schedulerViewHeaderCell} ${
                                calendar[week][0].inactive &&
                                style.schedulerViewHeaderCellInactive
                              }`}
                            >
                              {`Dom ${calendar[week][0].number}`}
                            </div>
                            <div
                              className={`${style.schedulerViewHeaderCell} ${
                                calendar[week][1].inactive &&
                                style.schedulerViewHeaderCellInactive
                              }`}
                            >
                              {`Lun ${calendar[week][1].number}`}
                            </div>
                            <div
                              className={`${style.schedulerViewHeaderCell} ${
                                calendar[week][2].inactive &&
                                style.schedulerViewHeaderCellInactive
                              }`}
                            >
                              {`Mar ${calendar[week][2].number}`}
                            </div>
                            <div
                              className={`${style.schedulerViewHeaderCell} ${
                                calendar[week][3].inactive &&
                                style.schedulerViewHeaderCellInactive
                              }`}
                            >
                              {`Mie ${calendar[week][3].number}`}
                            </div>
                            <div
                              className={`${style.schedulerViewHeaderCell} ${
                                calendar[week][4].inactive &&
                                style.schedulerViewHeaderCellInactive
                              }`}
                            >
                              {`Jue ${calendar[week][4].number}`}
                            </div>
                            <div
                              className={`${style.schedulerViewHeaderCell} ${
                                calendar[week][5].inactive &&
                                style.schedulerViewHeaderCellInactive
                              }`}
                            >
                              {`Vie ${calendar[week][5].number}`}
                            </div>
                            <div
                              className={`${style.schedulerViewHeaderCell} ${
                                calendar[week][6].inactive &&
                                style.schedulerViewHeaderCellInactive
                              }`}
                            >
                              {`Sab ${calendar[week][6].number}`}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div
                  className={style.schedulerViewContent}
                  style={
                    view !== "monthly"
                      ? { marginTop: "2rem" }
                      : { marginTop: "0" }
                  }
                >
                  {view === "monthly" &&
                    calendar.map((week, index) => (
                      <div
                        key={crypto.randomUUID()}
                        className={style.schedulerViewCellsContainer}
                      >
                        {week.map((day) => (
                          <SchedulerCell
                            key={crypto.randomUUID()}
                            label={day.number}
                            fadeDate={day.inactive}
                            date={new Date(year, month, day.number)}
                          />
                        ))}
                      </div>
                    ))}
                  {view === "weekly" && (
                    <>
                      <div
                        className={style.schedulerViewContentWeeklyContainer}
                      >
                        <div className={style.schedulerViewVerticalBar}>
                          {Array.from({ length: 24 }, (_, i) => i).map(
                            (hour) => (
                              <div
                                className={style.schedulerViewVerticalBarCell}
                                key={hour}
                              >
                                <p
                                  className={
                                    style.schedulerViewVerticalBarTextContainer
                                  }
                                >{`${hour}:00`}</p>
                              </div>
                            )
                          )}
                        </div>
                        {calendar[week].map((day) => (
                          <SchedulerCellWD
                            key={crypto.randomUUID()}
                            className={style.schedulerViewWeeklyCellContainer}
                            date={new Date(year, month, day.number)}
                          >
                            {Array.from({ length: 24 }, (_, i) => i + 1).map(
                              (hour) => (
                                <div
                                  className={style.schedulerViewWeeklyCell}
                                  key={crypto.randomUUID()}
                                ></div>
                              )
                            )}
                          </SchedulerCellWD>
                        ))}
                      </div>
                    </>
                  )}
                  {view === "daily" && (
                    <>
                      <div className={style.schedulerViewContentDailyContainer}>
                        <div className={style.schedulerViewVerticalBar}>
                          {Array.from({ length: 24 }, (_, i) => i).map(
                            (hour) => (
                              <div
                                className={style.schedulerViewVerticalBarCell}
                                key={hour}
                              >
                                <p
                                  className={
                                    style.schedulerViewVerticalBarTextContainer
                                  }
                                >{`${hour}:00`}</p>
                              </div>
                            )
                          )}
                        </div>

                        <SchedulerCellWD
                          key={crypto.randomUUID()}
                          className={style.schedulerViewDailyCellContainer}
                          date={new Date(year, month, day)}
                        >
                          {Array.from({ length: 24 }, (_, i) => i + 1).map(
                            (hour) => (
                              <div
                                className={style.schedulerViewDailyCell}
                                key={crypto.randomUUID()}
                              ></div>
                            )
                          )}
                        </SchedulerCellWD>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={style.spinnerContainer}>
          <Spinner
            animation="border"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
      )}
    </>
  );
};

export default Scheduler;
