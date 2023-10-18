import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button, SvgIcon } from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";

export const ExportToExcel = ({ apiData, fileName, text }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      color="inherit"
      onClick={(e) => exportToCSV(apiData, fileName)}
      startIcon={
        <SvgIcon fontSize="small">
          <ArrowDownOnSquareIcon />
        </SvgIcon>
      }
    >
      {text}
    </Button>
  );
};
