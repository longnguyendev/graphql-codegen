import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from "react-router-dom";
import ErrorPage from "./pages/404";
import AuthProvider, { useAuth } from "./hooks/auth.context";
import { loader as rootLoader } from "./pages/HomePage";
import User, { loader as userLoader } from "./pages/user/User";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/auth/SignIn";
import AuthLayout from "./pages/layout/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import TestPage from "./pages/test";
import FormPage, {
  loader as FormLoader,
  action as actionFormPage,
} from "./pages/FormPage";
import { PrivateRoute } from "./components/PrivateRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const ApolloProviderContex = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth();
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const routes: Array<RouteObject> = [
  {
    path: "/",
    loader: rootLoader,
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/form",
    action: actionFormPage,
    loader: FormLoader,

    element: <FormPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/:id",
    loader: userLoader,
    element: (
      <PrivateRoute>
        <User />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "test",
    element: <TestPage />,
  },
];

const routerMemo = createMemoryRouter(routes, {
  initialEntries: ["/", "/user/1", "/auth/signin"],
  initialIndex: 2,
});

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProviderContex>
        <RouterProvider router={router} />
      </ApolloProviderContex>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
