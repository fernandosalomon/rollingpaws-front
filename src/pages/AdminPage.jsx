import TableC from "../components/shared/TableC";

const AdminPage = () => {
  const columns = ["name", "email", "address", "phone"];
  const data = [
    {
      name: "Fernando",
      email: "f@f.com",
      address: "Fake Street 123",
      phone: "123456789",
    },
    {
      name: "Juan",
      email: "j@j.com",
      address: "Fake Street 123",
      phone: "123456789",
    },
    {
      name: "Pedro",
      email: "p@p.com",
      address: "Fake Street 123",
      phone: "123456789",
    },
  ];

  return <TableC data={data} columns={columns} />;
};

export default AdminPage;
