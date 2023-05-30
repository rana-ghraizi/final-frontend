import React, { useEffect, useState } from "react";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import "./Cart.css";

const Cart = () => {
  const userId = sessionStorage.getItem("Id");
  const [menubar, setMenuBar] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [totalData, settotalData] = useState([]);
  const [hasItems, setHasItems] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://artistic-u8a3.onrender.com/cart/${userId}`
        );
        const data = await response.json();
        setTableData(data.items);
        settotalData(data);
        if (data.items.length > 0) {
          setHasItems(true);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { id: "image", label: "Image", minWidth: 100 },
    { id: "painting", label: "Painting", minWidth: 100 },
    { id: "size", label: "Size", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "remove", label: "Remove", minWidth: 100 },
  ];

  const handleRemove = async (userId, paintingId) => {
    await Swal.fire({
      title: "Are you sure you want to delete this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-style",
        title: "custom-style",
        confirmButton: "custom-style",
        cancelButton: "custom-style",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `https://artistic-u8a3.onrender.com/cart/${userId}/${paintingId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTableData(
            tableData.filter((item) => item.paintingId._id !== paintingId)
          );
          settotalData(data);
          // Check if there are any items left in the cart
          if (data.items.length === 0) {
            setHasItems(false);
          }
        } else {
          console.error("Failed to remove item");
        }
      }
    });
  };

  const handleOrder = () => {
    // send POST request to place order function
    fetch("https://artistic-u8a3.onrender.com/order", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // set order status to success
          setOrderStatus("success");
          Swal.fire({
            icon: "success",
            title: "Order placed successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/cart")
          });
        } else {
          // set order status to failure
          setOrderStatus("failure");
          Swal.fire({
            icon: "error",
            title: "Failed to place order.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log("rana", orderStatus);
        console.log("rana", userId);
      })
      .catch((error) => {
        // set order status to failure
        setOrderStatus("failure");
        Swal.fire({
          icon: "error",
          title: "Failed to place order.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      {!userId ? (
        <div className="cart-wrapper-div1">
          <div className="cart-header-div1">
            <h1 className="cart-title-h1">
              Please log in to access your cart.
            </h1>
          </div>
          <div className="cart-login">
            <Link to="/login" className="cart-login-link">
              <span>Login</span>
            </Link>
          </div>
        </div>
      ) : hasItems ? (
        <div className="cart-wrapper">
          <div className="cart-header">
            <h1 className="cart-title">
              Cart
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Yellowtail"
              />
            </h1>
          </div>

          <div className="cart-table">
            <Paper
              sx={{
                width: "70%",
                overflow: "hidden",
                marginLeft: "auto",
                marginRight: "auto",
                border: "#6D71FF solid 1px",
              }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell className="cart-item-image">
                          <img
                            src={`${item.paintingId.image.url}`}
                            alt={item.painting}
                          />
                        </TableCell>
                        <TableCell>{item.paintingId.title}</TableCell>
                        <TableCell>{item.paintingId.size} cm</TableCell>
                        <TableCell>$ {item.paintingId.price}</TableCell>
                        <TableCell>
                          <button
                            onClick={() =>
                              handleRemove(userId, item.paintingId._id)
                            }
                            className="cart-button-icon"
                          >
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className="cart-Xicon"
                            />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
          <div className="cart-totals">
            <div className="cart-totals-first">
              <p>Total</p>
              <p>$ {totalData.bill.toFixed(2)}</p>
            </div>
            <div className="cart-totals-second">
              <button
                className="cart-totals-second-button"
                onClick={handleOrder}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-wrapper-div1">
          <h1 className="cart-title-h1">Your cart is empty.</h1>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
