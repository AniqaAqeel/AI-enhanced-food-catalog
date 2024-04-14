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
import axios from 'axios';
import { useAuth } from "../AuthContext";
import AutoModeIcon from '@mui/icons-material/AutoMode';

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
import { useMutation } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Item", editable: true, width: 200 },
  { field: "price", headerName: "Price", width: 130, type: "number", editable: true },
  {
    field: "tag",
    headerName: "Tags", editable: true, width: 300
  },
  {
    field: "description",
    headerName: "Description", editable: true, width: 300,
    flex: 1,

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


interface UploadcsvProps {
  id: number;
  item: string;
  price: number;
  tag: string;
  description: string;
}
interface DescriptionProps {
  id: string;
  description: string;
}
export function Uploadcsv() {
  const [tabledata, setData] = useState<UploadcsvProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<Number[]>([]);
  const removeSelected = () => {
    setData(tabledata.filter((row) => !selectedRow.includes(row.id)));
  };
  const [error, setError] = useState<string | null>(null);
  const[success, setSuccess] = useState<string | null>(null);

  const { token } = useAuth();
  const Uploadcsv = async (file: File) => {
    if (!file) {
      console.log("No file selected");
      console.log(file);
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_URL}`
    axios.defaults.baseURL = url;
    var formData = new FormData();
    formData.append("file", file);
    formData.append("token", token);
    const response = await axios.post("/api/resowners/csvUpload", formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",

        },
      }
    );
    return await response.data;
  }

  const mutation = useMutation({
    mutationFn: Uploadcsv,
    mutationKey: ["uploadcsv"],
    onSuccess: (data: Omit<UploadcsvProps[], "id">) => {
      setData(data.map((row, index) => ({ ...row, id: (index + 1) })));
      setSuccess("CSV file uploaded successfully");

    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
    onMutate: () => {
      setError(null);
      setSuccess(null);
    }

  });

  const GenerateDescription = async (data: UploadcsvProps[]) => {

    const url = `${process.env.NEXT_PUBLIC_URL}`
    axios.defaults.baseURL = url;
    const response = await axios.post("/api/resowners/generateDescription", {

      item_list: data,
      token: token

    });

    console.log(response.data);
    return await response.data;
  }

  const generateMutation = useMutation({
    mutationFn: GenerateDescription,
    mutationKey: ["generateDescription"],
    onSuccess: (data) => {
      //Iterate both arrat at the same time and update the description
      const desc = data.item_descriptions as DescriptionProps[];
      const updatedData = tabledata.map((row, index) => {
        return { ...row, description: desc[index].description }
      });

      setData(updatedData);
      setSuccess("Description generated successfully");
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
    onMutate: () => {
      setError(null);
      setSuccess(null);
    }
  });
  

  const savecsv = async (data: UploadcsvProps[]) => {
    const url = `${process.env.NEXT_PUBLIC_URL}`
    axios.defaults.baseURL = url;
    const response = await axios.post("/api/resowners/saveItems", {
      item_list: data,
      token: token
    });
    return await response.data;
  }

  const saveMutation = useMutation({
    mutationFn: savecsv,
    mutationKey: ["savecsv"],
    onSuccess: (data) => {
      
      setData([]);
      setSuccess("Items saved successfully");
      generateMutation.reset();
      mutation.reset();
      saveMutation.reset(); 

    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
    onMutate: () => {
      setError(null);
      setSuccess(null);
    }
  });

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
            disabled={mutation.isPending || generateMutation.isPending}
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
                  if (file.type !== "text/csv" && file.type !== "application/vnd.ms-excel"  ) {
                    setError("Invalid file type, please upload a csv file");
                    return;
                  }
                  mutation.mutate(file);

                }
              }}
            />
          </Button>

          <Button
            className="mt-5 text-accent bg-primary   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            disabled={!tabledata || tabledata.length === 0 || !mutation.isSuccess || generateMutation.isPending}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            onClick={() => generateMutation.mutate(tabledata)}

            startIcon={<AutoModeIcon />}
          >
            Generate description
          </Button>
          <Button
            className="mt-5 text-accent bg-primary   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            disabled={!tabledata || tabledata.length === 0 || !generateMutation.isSuccess}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}

            startIcon={<CloudDoneIcon />}
            onClick={() => saveMutation.mutate(tabledata)}
          >
            Submit
          </Button>
        </div>
        {/* <Divider orientation="horizontal" flexItem /> */}
        <div className="flex flex-row gap-5 px-20">
          {success && (
            <Alert severity="success">
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error">
              {error}
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
            paddingBottom: 32,

          }}
        >
          <EnhancedTableToolbar
            numSelected={selectedRow.length}
            deleteSelected={removeSelected}
          />
          <DataGrid

            rows={tabledata}
            loading={mutation.isPending}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            editMode="row"
            pageSizeOptions={[20, 50, 100, { label: "All", value: -1 }]}
            onRowSelectionModelChange={(selectedRow) => {
              setSelectedRow(selectedRow as number[]);
            }}
            onRowEditStop={(updatedRow) => {
              const updatedData = tabledata.map((row) =>
                row.id === updatedRow.id ? updatedRow.row : row

              );
              setData(updatedData);
            }}
            className="min-h-96"


            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
