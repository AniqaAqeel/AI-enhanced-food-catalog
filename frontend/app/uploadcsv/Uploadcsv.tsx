"use client";
import NavBar from "@/components/NavBar";
import { InputField } from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "item", headerName: "Item", width: 130, editable: true },
  { field: "price", headerName: "Price", width: 130, type: "number",editable: true },
  {
    field: "tag",
    headerName: "Tags",
    width: 90,editable: true
  },
];
interface EnhancedTableToolbarProps {
  numSelected: number;
  deleteSelected: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, deleteSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
      className="text-secondary"
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          CSV Data
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip onClick={deleteSelected} title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const rows = [
  { id: "100", item: "Apple", price: 1.2, tag: "Fruit" },
  { id: "200", item: "Banana", price: 0.5, tag: "Fruit" },
  { id: "300", item: "Carrot", price: 0.7, tag: "Vegetable" },
  { id: "400", item: "Broccoli", price: 1.1, tag: "Vegetable" },
  { id: "500", item: "Chicken", price: 5.0, tag: "Meat" },
  { id: "600", item: "Beef", price: 7.0, tag: "Meat" },
  { id: "700", item: "Milk", price: 2.0, tag: "Dairy" },
  { id: "800", item: "Cheese", price: 3.0, tag: "Dairy" },
  { id: "900", item: "Bread", price: 2.5, tag: "Grain" },
];
interface UploadcsvProps {
  id: string;
  item: string;
  price: number;
  tag: string;
}
export function Uploadcsv() {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [data, setData] = useState<UploadcsvProps[]>(rows);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const removeSelected = () => {
    setData(data.filter((row) => !selectedRow.includes(row.id)));
  };
  return (
    <>
      <NavBar />
      <div className="w-full min-h-[94vh] base relative bg-accent ">
        <div className="flex flex-row gap-5 px-20 ">
          <Button
            className="mt-5  text-accent bg-primary  focus:ring-1 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload CSV
            <VisuallyHiddenInput
              type="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                  setFilename(file.name);
                }
              }}
            />
          </Button>

          <Button
            className="mt-5 text-accent bg-primary  focus:ring-1 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            disabled={!file}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudDoneIcon />}
          >
            Submit
          </Button>
        </div>
        {/* <Divider orientation="horizontal" flexItem /> */}
        <div className="flex flex-row gap-5 px-20">
            {file && (
            <Alert severity="success">
              {filename} uploaded successfully
            </Alert>
          )}
          </div>
        <div
          style={{
            height: "auto",
            width: "auto",
            paddingLeft: 96,
            paddingRight: 96,
            paddingTop: 32,
          }}
        >
          <EnhancedTableToolbar
            numSelected={selectedRow.length}
            deleteSelected={removeSelected}
          />
          <DataGrid
            rows={data}

            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[20, 50, 100, { label: "All", value: -1 }]}
            onRowSelectionModelChange={(selectedRow) => {
              setSelectedRow(selectedRow as string[]);
            }}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
