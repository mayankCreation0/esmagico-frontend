import React from "react";
import { Routes, Route } from "react-router-dom";
// import CreateTask from "../Components/CreateTask";
// import Home from "../Components/Home";
import LoginPage from "../components/LoginPage";
// import Navbar from "../Components/Navbar";
import SignupPage from "../components/Signup";
// import TodoDetails from "../Components/TaskDetail";
// import PrivateRoute from "./PrivateRoutes";

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Navbar/>
                            <Home />
                        </PrivateRoute>
                    }
                /> */}
            </Routes>
        </div>
    );
}
export default AllRoutes;
