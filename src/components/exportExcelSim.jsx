import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { XIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import toast from "react-hot-toast";
import axios from "axios";

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

const ExportExcelSim = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  if (!open) return null;

  const headers = [
    "No.",
    "VIN NO",
    "EQUIPMENT ID",
    "SIM No",
    "Active Date",
    "Expire Date",
    "Network Carrier",
  ];

  const fetchSimData = async () => {
    const token = localStorage.getItem("token");
    const formattedToken = token?.replace(/^"(.*)"$/, "$1");

    const response = await axios.get(
      "https://api-mobile.hino-connect.vn/iov-app-api/v1/vehicle/vehicles",
      {
        headers: {
          Authorization: `Bearer ${formattedToken}`,
        },
      }
    );

    return response.data;
  };

  const handleExport = async () => {
    setIsLoading(true);
    setExportProgress(0);

    try {
      console.log("Fetching SIM data for export...");

      const response = await fetchSimData();
      const rawData = response.message || [];

      console.log("Total SIM records from API:", rawData.length);

      const transformedData = rawData.map((item, idx) => {
        setExportProgress(((idx + 1) / rawData.length) * 90);

        const formatDate = (dateStr) => {
          if (!dateStr) return "";
          const d = new Date(dateStr);
          if (isNaN(d)) return dateStr;
          return d.toISOString().slice(0, 10);
        };

        return {
            "No.": idx + 1,
            "VIN NO": item.vin_no || "",
            "EQUIPMENT ID": item.equipmentid || "",
            "SIM No": item.simno || "",
            "Active Date": formatDate(item.active_date) || "",
            "Expire Date": formatDate(item.expire_date) || "",
            "Network Carrier": item.network_carrier || "",
          };
      });

      const wsData = [
        headers,
        ...transformedData.map((row) => headers.map((h) => row[h])),
      ];

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      const colWidths = [
        { wch: 5 }, // No.
        { wch: 20 }, //vin
        { wch: 20 }, //equip
        { wch: 30 }, // SIM No
        { wch: 15 }, // Active Date
        { wch: 15 }, // Expire Date
        { wch: 20 }, // Network Carrier
      ];
      ws["!cols"] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SIM Management");

      setExportProgress(95);

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const file = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `sim_management_${timestamp}.xlsx`;

      saveAs(file, filename);
      setExportProgress(100);

      setTimeout(() => {
        setOpen(false);
        setExportProgress(0);
      }, 1000);

      toast.success(
        `${t("Export Success")} - ${transformedData.length} SIM records`
      );
    } catch (error) {
      console.error("Error exporting SIM Excel:", error);
      toast.error(t("exportFailed") || "Export failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
                {t("Export SIM Excel")}
              </Typography>
            </div>

            <div className="mt-4">
              {isLoading && (
                <Box sx={{ width: "100%" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="mb-2"
                  >
                    {t("exportingData") || "Exporting data"}...
                  </Typography>
                  <LinearProgressWithLabel value={exportProgress} />
                </Box>
              )}
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-2"
              >
                {t("Export will include all SIM management data")}
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

export default ExportExcelSim;
