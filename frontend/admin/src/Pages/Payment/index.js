import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Layout/AdminLayout';
import { getApihandler } from '../../Apihandler';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
  } from "@mui/material";
export default function Payment() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getPayment();
    }, [])

    const getPayment = async () => {
        const res = await getApihandler("/getAllPayments");
        console.log("res", res);
        if(res.status === 200){
            setData(res.payments);
        }
       }
    return (
        <AdminLayout>
             <h1>Payment List</h1>
             <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Chef Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Payment Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Booking Status</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{user.user_Name}</TableCell>
                  <TableCell>{user.chef_Name}</TableCell>
                  <TableCell>{user.price}</TableCell>
                  <TableCell>{user.paymentStatus}</TableCell>
                  <TableCell>{user.booking_status}</TableCell>
                 
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
        </AdminLayout>
    )
}
