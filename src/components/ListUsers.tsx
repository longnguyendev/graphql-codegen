import { Link } from "react-router-dom";
import { User } from "../gql/graphql";

export type UsersProps = { users: Array<User> };

export default function ListUsers({ users }: UsersProps) {
  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>
          <Link to={`/user/${user.id}`}>{user.email}</Link>
        </li>
      ))}
    </ul>
  );
}
