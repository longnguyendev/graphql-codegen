import { lazy } from "react";
import { Suspense } from "react";
import { Await, LoaderFunctionArgs, defer } from "react-router-dom";
import { useLoaderData } from "../hooks/useLoaderData";
import { getUsers } from "../provider/user";
import { useAuth } from "../hooks/auth.context";
import { useCurrentUserQuery } from "../gql/graphql";

const Users = lazy(() => import("../components/ListUsers"));

export function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  console.log(url.searchParams.get("get"));
  console.log("params", params);
  console.log("request", request);
  const users = getUsers();
  return defer({ data: users });
}

export default function HomePage() {
  const { data } = useLoaderData() as any;
  const { isAuth } = useAuth();
  const { data: currentUser, loading } = useCurrentUserQuery({
    onCompleted: (data) => {
      console.log("data", data.currentUser);
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
  return (
    <>
      <h1>
        {`Welcome ${
          currentUser
            ? loading
              ? "loadding...."
              : currentUser.currentUser.firstName
            : "guest"
        }`}{" "}
      </h1>
      <p>{`isauth: ${isAuth}`}</p>
      <Suspense fallback={<p>Loading package location...</p>}>
        <Await resolve={data}>{(data) => <Users users={data.users} />}</Await>
      </Suspense>
    </>
  );
}
