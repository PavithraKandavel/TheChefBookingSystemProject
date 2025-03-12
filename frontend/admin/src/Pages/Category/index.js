import React, { useEffect, useState } from "react";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
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
export default function Category() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getCategory();
  }, []);
    // ***** get all Category ********
  const getCategory = async () => {
    const res = await getApihandler("/admin/getAllCategories");
    if (res.status === 200) {
      setData(res.data);
    }
  };

  //   ********* delete chefs ***********
  const deleteChef = async (id) => {
    const res = await deleteApihandler(`/admin/deleteCategory/${id}`);
    console.log("delet chef api rsponse is ---->", res);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "Category deleted successfully!",
      });
      getCategory();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to delete chef!",
      });
    }
  };

  // ********* update chefs ***********
  
  
  const addCategory = async () => {
    const item = {
      category_name: category,
    };
   
    const res = await postApihandler("/admin/categories", item);
    console.log("update api response ----->", res);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "Add category successfully!",
      });
      setOpen(false);
      getCategory();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update chef!",
      });
    }
  };
  return (
    <AdminLayout>
      <div style={{display:"flex",justifyContent:"start",paddingBottom:"10px"}}>
       <Button variant="contained" style={{background:"#FF7F00"}} onClick={handleOpen}>
              Add Category
            </Button>
            </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((val) => (
              <TableRow
               
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {val.category_name}
                </TableCell>
                
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
                          deleteChef(val._id);
                        }
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* <IconButton
                    color="primary"
                    onClick={() => {
                      const currentIndex = data.findIndex(
                        (c) => c._id === chef._id
                      );
                      setCategoryId(val._id);
                      setIndex(currentIndex);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add Category */}
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
          <h2>Add Category</h2>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}> 
            <Button variant="contained"  style={{background:"#FF7F00"}} onClick={addCategory}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
