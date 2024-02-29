import {
  Await,
  createBrowserRouter,
  defer,
  LoaderFunctionArgs,
  RouterProvider,
  useAsyncValue,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./index.css";
import React from "react";

type LoaderData = {
  loaderDataPromise: Promise<
    { type: "data"; text: string } | { type: "redirect"; url: string }
  >;
};

let router = createBrowserRouter([
  {
    path: "/",
    loader: ({ request }: LoaderFunctionArgs) => {
      const loaderDataPromise: LoaderData["loaderDataPromise"] = new Promise(
        (resolve) => {
          setTimeout(() => {
            const url = new URL(request.url);
            const searchTerm = url.searchParams.get("q");

            if (searchTerm) {
              return resolve({
                type: "data",
                text: searchTerm,
              });
            }

            return resolve({
              type: "redirect",
              url: `?q=${new Date().toISOString()}`,
            });
          }, 2000);
        }
      );

      const loaderData: LoaderData = {
        loaderDataPromise,
      };

      return defer(loaderData);
    },
    Component() {
      const location = useLocation();
      const { loaderDataPromise } = useLoaderData() as LoaderData;

      return (
        <div>
          <p>Current location: {JSON.stringify(location)}</p>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Await resolve={loaderDataPromise} errorElement={<p>Error</p>}>
              <Loaded />
            </Await>
          </React.Suspense>
        </div>
      );
    },
  },
]);

function Loaded() {
  const navigate = useNavigate();
  const data = useAsyncValue() as Awaited<LoaderData["loaderDataPromise"]>;

  React.useEffect(() => {
    if (data.type === "redirect") {
      navigate(data.url, { replace: true });
    }
  }, [data, navigate]);

  if (data.type === "redirect") {
    return <p>Redirecting...</p>;
  }

  return (
    <>
      <h1>{data.text}</h1>
      <p>
        <button
          type="button"
          onClick={() => {
            navigate(`/?q=${new Date().toISOString()}`, { replace: true });
          }}
        >
          Update time
        </button>
      </p>
    </>
  );
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
