import {
  Link,
  LoaderFunctionArgs,
  json,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { getUserById } from "../../provider/user";
import { useAuth } from "../../hooks/auth.context";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  console.log("request", request);
  console.log("params", params);
  console.log("url", url);
  console.log("searhparams", url.searchParams.get("get"));
  const user = await getUserById(Number(params.id));
  console.log(user);
  return json(
    { data: user.getUserById },
    { headers: { "Cache-Control": "max-age=3600, public" } }
  );
}

const User = () => {
  const { data } = useLoaderData() as any;
  const { id } = useParams();
  console.log("userId", id);
  const { isAuth } = useAuth();
  return (
    <>
      <p>{`isauth: ${isAuth}`}</p>
      <Link to="/">Home</Link>
      <ul>
        <li>
          <p>{data.id}</p>
        </li>
        <li>
          <p>{data.email}</p>
        </li>
        <li>
          <p>{data.lastName}</p>
        </li>
      </ul>
    </>
  );
};
export default User;
