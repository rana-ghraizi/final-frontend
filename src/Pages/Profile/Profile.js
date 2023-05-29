import React, { useEffect, useState } from "react";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Footer from "../../components/footer/Footer";
import "./Profile.css";
import profile from "../../Images/profileee.jpg";

const Profile = () => {
  const [menubar, setMenuBar] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState({});
  const [tableData, setTableData] = useState([]);
  const [paintings, setPaintings] = useState([]);

  const id = sessionStorage.getItem("Id");
  const userId = sessionStorage.getItem("Id");

  const handleLogout = () => {
    console.log("Logout");
    sessionStorage.clear("token");
    window.location.href = "/";
  };

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${id}`);
        const data = await response.json();
        setUser(data);
        setPhoneNumber(data.phonenumber);
        setAddress(data.address);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  // update user data
  const updateUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          address: address,
          phonenumber: phoneNumber,
        }),
      });
      const data = await response.json();
      console.log("Updated Successfully");

      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated successfully",
        });
        return data.user;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch paintings for specific artist
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/painting/user/${userId}`
        );
        const data = await response.json();
        setPaintings(data);
        console.log(data); // Make sure data is not null or empty
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPaintings();
  }, [userId]);

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/order/user/${userId}`
        );
        const data = await response.json();
        setTableData(data);
        // console.log(data); // Make sure data is not null or empty
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchOrders();
  }, [userId]);

  const columns = [
    { id: "username", label: "Username", minWidth: 100 },
    { id: "phone", label: "Phone", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    { id: "paintings", label: "Paintings", minWidth: 100 },
    { id: "total", label: "Total", minWidth: 100 },
  ];

  return (
    <div>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />

      {!userId ? (
        <div className="cart-wrapper-div1">
          <div className="cart-header-div1">
            <h1 className="cart-title-h1">
              Please log in to access your profile.
            </h1>
          </div>
          <div className="cart-login">
            <Link to="/login" className="cart-login-link">
              Login
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* user form */}
          <div className="user-info-wrapper">
            <div className="userinfo-first">
              <h1 className="userinfo-h1">
                My Information
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Yellowtail"
                />
              </h1>
              <button onClick={handleLogout} className="logout">
                Logout
              </button>
            </div>
            <div className="userinfo-second">
              <div className="classname-form">
                <form onSubmit={updateUser} className="userinfo-form">
                  <div className="user-form">
                    <div className="user-username">
                      <p className="user-usernameee">Username:</p>
                      <p className="username--user">{user.username}</p>
                    </div>
                    <div className="update-label">
                      <div className="address-label">
                        <label className="update-Address">
                          Address:
                          <br />
                          <input
                            className="user-inputs"
                            type="text"
                            value={address}
                            placeholder="New Address"
                            onChange={(event) => setAddress(event.target.value)}
                          />
                        </label>
                      </div>
                      <div className="update-Address">
                        <label className="update-phonenumber">
                          Phonenumber:
                          <br />
                          <input
                            className="user-inputs"
                            type="text"
                            value={phoneNumber}
                            placeholder="phonenumber"
                            onChange={(event) =>
                              setPhoneNumber(event.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <div className="user-username">
                      <p className="user-usernameee">Role:</p>
                      <p className="username--user">{user.role}</p>
                    </div>
                    <button className="submit-button" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
              <div className="profileimg-div">
                <img src={profile} alt="img" className="profilee-img" />
              </div>
            </div>
          </div>
          {user.role === "user" ? null : (
            <>
              {/* my paintings */}

              <div className="paintings-info-wrapper">
                <div className="paintinginfo-first">
                  <h1 className="paintinginfo-h1">My Paintings</h1>
                  <Link className="add_painting" to={"/addPainting"}>
                    Add painting
                  </Link>
                </div>
                <div className="paintings-content">
                  {paintings.length > 0 ? (
                    paintings.map((item) => (
                      <div key={item._id} className="painting-container">
                        <img
                          src={item.image.url}
                          alt={item.title}
                          className="painting"
                        />
                        <div className="overlay">
                          <Link
                            className="view-button"
                            to={`/painting/${item._id}`}
                          >
                            Modify painting
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No paintings found.</p>
                  )}
                </div>
              </div>

              {/* orders */}
              <div className="order-info-wrapper">
                <div className="paintinginfo-first">
                  <h1 className="paintinginfo-h1">Orders</h1>
                </div>
                <div className="cart-table">
                  <Paper
                    sx={{
                      width: "70%",
                      overflow: "hidden",
                      marginLeft: "auto",
                      marginRight: "auto",
                      border: "#0B486A solid 1px",
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
                          {Array.isArray(tableData) &&
                            tableData.map((item) => (
                              <TableRow key={item._id}>
                                <TableCell>{item.user.username}</TableCell>
                                <TableCell>{item.user.phonenumber}</TableCell>
                                <TableCell>{item.user.address}</TableCell>
                                {item.orderedPaintings.map((painting) => (
                                  <TableCell
                                    key={painting._id}
                                    className="cart-item-image"
                                  >
                                    <img
                                      src={painting.paintingId.image.url}
                                      alt={painting.paintingId.title}
                                    />
                                  </TableCell>
                                ))}
                                <TableCell>$ {item.total_price}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
