import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROLES } from "../constants/constants";
import { HinoConnect, LoginLayout, MainLayout } from "../layouts";
import {
    NotFound,
    PermissionDenied,
    InstallationManagement,
    SaleOrderManagement
} from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";
import ResetPasswordLayout from "../layouts/ResetPasswordLayout";
import InvoiceManagement from "../pages/InvoiceManagement";

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
                    <Route path="invoice" element={<InvoiceManagement />} />
                    <Route path="sale-order" element={<SaleOrderManagement />} />
                </Route>

            </Route>
            {/* Catch all */ }
            <Route path="*" element={<NotFound />} />
        </Routes >
    );
};

export default Routers;
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRoute))