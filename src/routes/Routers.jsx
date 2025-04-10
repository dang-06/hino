import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROLES } from "../constants/constants";
import { HinoConnect, LoginLayout, MainLayout } from "../layouts";
import {
    NotFound,
    PermissionDenied,
    InstallationManagement,
    SaleOrderManagement,
    TechnicianKPIManagement
} from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";
import ResetPasswordLayout from "../layouts/ResetPasswordLayout";
import JobManagement from "../pages/JobManagement";
import NewJobsManagement from "../pages/NewJobsManagement";
import JobsFinishedManagement from "../pages/JobsFinishedManagement";
import JobsCompletedManagement from "../pages/JobsCompletedManagement";
import UserManagement from "../pages/UserManagement";
import VehicleManagement from "../pages/VehicleManagement";
import SimManagement from "../pages/SimManagement";

const Routers = () => {

    return (
        <Routes>
            {/* Public routes */}
            <Route path="login" element={<LoginLayout />} />
            <Route path="reset-password" element={<ResetPasswordLayout />} />
            <Route path="hinoconnect" element={<HinoConnect />} />
            <Route path="denied" element={<PermissionDenied />} />
            {/* Proteced routes */}
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Navigate replace to="installation" />} />
                    <Route path="installation" element={<InstallationManagement />} />
                    <Route path="job" element={<JobManagement />} />
                    <Route path="new-jobs" element={<NewJobsManagement />} />
                    <Route path="jobs-finished" element={<JobsFinishedManagement />} />
                    <Route path="jobs-completed" element={<JobsCompletedManagement />} />
                    <Route path="sale-order" element={<SaleOrderManagement />} />
                    <Route path="users-management" element={<UserManagement />} />
                    <Route path="vehicle-management" element={<VehicleManagement />} />
                    <Route path="sim-management" element={<SimManagement />} />
                    <Route path="tech-kpi" element={<TechnicianKPIManagement />} />
                </Route>

            </Route>


            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
        </Routes >
    );
};

export default Routers;
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRoute))