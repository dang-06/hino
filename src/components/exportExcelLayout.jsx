import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchAllJobs } from "../api";
import { XIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

const ExportExcelLayout = ({ open, setOpen, jobs }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    if (!open) return null;

    const headers = [
        "No.",
        "Dealer",
        "Segment",
        "Model",
        "Chassis num./VIN",
        "IMEI",
        "Engine Num.",
        "Lot Number",
        "Line of Date",
        "IMSI",
        "Location",
        "DATE Install",
        "Tech. Name",
        "Note",
    ];

    const handleExport = async () => {
        setIsLoading(true);
        setExportProgress(0);

        try {
            const filterParams = {};
            if (fromDate) filterParams.from_date = fromDate;
            if (toDate) filterParams.to_date = toDate;

            console.log("Export filter params:", filterParams);

            const response = await fetchAllJobs(filterParams);
            const dataToExport = response.data.data;

            console.log("Total records from API:", dataToExport.length);
            console.log("Date range:", fromDate, "to", toDate);

            let filteredData = dataToExport;
            if (fromDate || toDate) {
                filteredData = dataToExport.filter((job) => {
                    const installDate = new Date(job.installation_date);
                    const from = fromDate ? new Date(fromDate) : null;
                    const to = toDate ? new Date(toDate) : null;

                    if (from && installDate < from) return false;
                    if (to && installDate > to) return false;
                    return true;
                });
                console.log("Filtered records:", filteredData.length);
            }

            const data = filteredData.map((job, idx) => {
                setExportProgress(((idx + 1) / filteredData.length) * 100);
                return {
                    "No.": idx + 1,
                    Dealer: "HMV",
                    Segment: job.segment,
                    Model: job.model,
                    "Chassis num./VIN": job.vin_no,
                    IMEI: job.imei_no,
                    "Engine Num.": job.engine_no,
                    "Lot Number": job.lot_no,
                    "Line of Date": job.manufacture_date,
                    IMSI: job.sim_no,
                    Location: job.installation_location,
                    "DATE Install": job.installation_date,
                    "Tech. Name": job.techname,
                    Note: job.note || "",
                };
            });

            const wsData = [
                headers,
                ...data.map((row) => headers.map((h) => row[h])),
            ];

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            const colWidths = [
                { wch: 5 }, //STT
                { wch: 10 }, //Dealer
                { wch: 10 }, //Segment
                { wch: 20 }, //Model
                { wch: 20 }, //VIN
                { wch: 15 }, //IMEI
                { wch: 15 }, //Engine
                { wch: 15 }, //Lot
                { wch: 20 }, //Line of Date
                { wch: 25 }, //IMSI
                { wch: 20 }, //Location
                { wch: 15 }, //DATE Install
                { wch: 25 }, //Tech. Name
                { wch: 25 }, //Note
            ];
            ws["!cols"] = colWidths;

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Jobs Completed");

            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const file = new Blob([excelBuffer], {
                type: "application/octet-stream",
            });

            const timestamp = new Date()
                .toISOString()
                .slice(0, 19)
                .replace(/:/g, "-");
            const filename = `jobs_completed_${fromDate || "all"}_to_${toDate || "all"
                }_${timestamp}.xlsx`;

            saveAs(file, filename);
            setExportProgress(100);
            setTimeout(() => {
                setOpen(false);
                setExportProgress(0);
                setFromDate("");
                setToDate("");
            }, 1000);

            toast.success(`${t("Export Success")} - ${filteredData.length} records`);
        } catch (error) {
            console.error("Error exporting Excel:", error);
            toast.error(t("exportFailed"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFromDate("");
        setToDate("");
    };

    const getExportCount = () => {
        return fromDate || toDate ? "filtered data" : "all data";
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                        <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={handleClose}
                        >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div>
                        <div className="flex items-center justify-center gap-4">
                            <Typography
                                variant="h6"
                                component="h2"
                                className="text-lg font-medium capitalize"
                            >
                                {t("Export Excel")}
                            </Typography>
                        </div>
                        {/* Filter section */}
                        <div className="mt-4">
                            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                <TextField
                                    label={t("fromDate")}
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    disabled={isLoading}
                                    size="small"
                                    fullWidth
                                />
                                <TextField
                                    label={t("toDate")}
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    disabled={isLoading}
                                    size="small"
                                    fullWidth
                                />
                            </Box>
                            {isLoading && (
                                <Box sx={{ width: "100%" }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        className="mb-2"
                                    >
                                        {t("exportingData")}...
                                    </Typography>
                                    <LinearProgressWithLabel value={exportProgress} />
                                </Box>
                            )}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                className="mt-2"
                            >
                                {t("Export will include")} {getExportCount()}
                                {fromDate && ` ${t("from")} ${fromDate}`}
                                {toDate && ` ${t("to")} ${toDate}`}
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-end gap-4">
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            {t("cancel")}
                        </Button>
                        <LoadingButton
                            variant="contained"
                            onClick={handleExport}
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            {t("Download Excel")}
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ExportExcelLayout;
