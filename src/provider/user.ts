export async function getUsers() {
  const query = `query Users {
      users {
        id
        email
        firstName
        lastName
      }
    }
  `;
  const token = localStorage.getItem("auth-token");
  return await fetch("http://127.0.0.1:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then(({ data }) => {
      return data;
    });
}
export async function getUserById(id: number) {
  const query = `query GetUserById($id: Float!) {
      getUserById(id: $id) {
        id
        email
        firstName
        lastName
    }
  }
    `;
  return await fetch("http://127.0.0.1:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables: { id: id } }),
  })
    .then((r) => r.json())
    .then(({ data }) => {
      return data;
    });
}
