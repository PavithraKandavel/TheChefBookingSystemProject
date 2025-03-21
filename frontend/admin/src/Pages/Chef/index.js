import React, { useEffect, useState } from "react";
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
import AdminLayout from "../../Layout/AdminLayout";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Chef() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  console.log("data is ---->", data);
  useEffect(() => {
    getChef();
  }, []);
  //   ***** get all chefs ********
  const getChef = async () => {
    const res = await getApihandler("/getAllChefs");
    console.log("get all  chefs api respons is ---->", res);
    if (res.message === "Chefs fetched successfully") {
      setData(res.data);
    }
  };

  //   ********* delete chefs ***********
  const deleteChef = async (id) => {
    const res = await deleteApihandler(`/deleteChef/${id}`);
    console.log("delet chef api rsponse is ---->", res);
    if (res.message === "Chef deleted successfully") {
      Swal.fire({
        icon: "success",
        text: "chef deleted successfully!",
      });
      getChef();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to delete chef!",
      });
    }
  };

  // ********* update chefs ***********
  const [chefname, setChefName] = useState("");
  const [chefemail, setChefEmail] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [number, setNumber] = useState("");
  const [chefid, setChefId] = useState();
  const [index, setIndex] = useState();
  useEffect(() => {
    if (index !== null && data[index]) {
      const { chef_Name, chef_Email, country_code, mobile_no } =
        data[index] || {};

      setChefName(chef_Name || "");
      setChefEmail(chef_Email || "");
      setCountryCode(country_code || "");
      setNumber(mobile_no || "");
    }
  }, [index, data]);
  const updateChef = async () => {
    const item = {
      chef_Name: chefname,
      chef_Email: chefemail,
      country_code: countrycode,
      mobile_no: number,
    };
    console.log("data isupdate", item);
    const res = await putApihandler(`/editChef/${chefid}`, item);
    console.log("update api response ----->", res);
    if (res.message === "Chef updated successfully") {
      Swal.fire({
        icon: "success",
        text: "chef updated successfully!",
      });
      setOpen(false);
      getChef();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update chef!",
      });
    }
  };
  return (
    <AdminLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Chef Name</TableCell>
              <TableCell>Chef Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((chef) => (
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {chef.chef_Name}
                </TableCell>
                <TableCell>{chef.chef_Email}</TableCell>
                <TableCell>{chef.mobile_no}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteChef(chef._id);
                        }
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      const currentIndex = data.findIndex(
                        (c) => c._id === chef._id
                      );
                      setChefId(chef._id);
                      setIndex(currentIndex);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Update User Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Edit Chef</h2>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={chefname}
            onChange={(e) => setChefName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={chefemail}
            onChange={(e) => setChefEmail(e.target.value)}
          />
          <TextField
            label="Country Code"
            fullWidth
            margin="normal"
            value={countrycode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            margin="normal"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={updateChef}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
