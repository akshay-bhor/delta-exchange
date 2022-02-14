import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import AppErrorBoundary from "./Components/AppErrorBoundry/AppErrorBoundry";
import Layout from "./Components/Layout/Layout";
import Loading from "./Components/UI/Loading";

const Register = lazy(() => import("./Components/Register/Register"));
const Login = lazy(() => import("./Components/Login/Login"));
const Home = lazy(() => import("./Components/Home/Home"));
const Logout = lazy(() => import("./Components/Logout/Logout"));

function App() {
  const isAuth = useSelector((state) => state.auth.loggedIn);

  return (
    <AppErrorBoundary>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={!isAuth ? <Login /> : <Navigate to="/dashboard" />}
            />

            <Route
              path="/register/*"
              element={!isAuth ? <Register /> : <Navigate to="/dashboard" />}
            />

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Suspense>
      </Layout>
    </AppErrorBoundary>
  );
}

export default App;
