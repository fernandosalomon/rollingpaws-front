import clientAxios from "./clientAxios";

export const getAllUsers = async () => {
  const res = await clientAxios.get("/user", {
    headers: {
      authtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzhiNTRlZmRhZjk2MGNhOGQ5YzU3NiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMxNzY5Njc5fQ.j1zeGMBvl9UU07xqfQkkCF1dSEauvypvSsyMbUnATc8",
    },
  });
  return res.data;
};
