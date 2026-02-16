import React, { useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router";
import { Box, CssBaseline } from "@mui/material";
import Test from "./components/Test";
// import Modal from "./components/Modal";
import NavBar from "./components/hero-section/NavBar";

// Root layout component that wraps all routes
const Root = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <NavBar />
      
      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: "100%",
          }}
        >
          <Outlet />
        </Box>
        <ScrollRestoration />
      </Box>
    </Box>
  );
};

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([ 
        {
          path: "/",
          element: <Root />,
          children: [
            {
              path: "/",
              element: <Test />,
            },
            // {
            //   path: "/modal",
            //   element: <Modal />,
            // },
          ],
        },
      ]),
    []
  );

  return <RouterProvider router={router} />;
}
