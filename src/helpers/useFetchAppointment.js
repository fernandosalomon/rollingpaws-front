const useFetchAppointment = () => {
  const appoint1 = [
    {
      startDate: new Date(2024, 10, 11, 17),
      endDate: new Date(2024, 10, 11, 19),
      owner: "Juanito",
    },
    {
      startDate: new Date(2024, 10, 12, 17),
      endDate: new Date(2024, 10, 12, 22),
      owner: "Juanito",
    },
  ];

  return appoint1;
};

export default useFetchAppointment;
