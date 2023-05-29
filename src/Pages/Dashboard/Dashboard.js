import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  const [paintings, setPaintings] = useState([]);
  const [menubar, setMenuBar] = useState(false);

  const columns = [
    { id: "name", label: "Artist Name", minWidth: 100 },
    { id: "image", label: "Image", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  // fetch paintings
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("http://localhost:5000/painting/status");
        const data = await response.json();
        setPaintings(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPaintings();
  }, []);

  // update status
  const updatePaintingStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/painting/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update painting status");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Server error");
    }
  };

  const handleStatusUpdate = async (itemId, currentStatus, newStatus) => {
    try {
      if (currentStatus === newStatus) {
        // do nothing
        return;
      }

      const updatedPainting = await updatePaintingStatus(itemId, newStatus);
      const updatedPaintings = paintings.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            status: updatedPainting.status,
          };
        }
        return item;
      });
      setPaintings(updatedPaintings);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <div className="cart-table">
        <Paper
          sx={{
            width: "70%",
            overflow: "hidden",
            marginTop: "10%",
            marginBottom: "8%",
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
                {paintings.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="cart-item-image">
                      <img src={item.image.url} alt={item.title} />
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleStatusUpdate(item._id, item.status, "confirmed")}
                        className="cart-button-icon"
                        variant="contained"
                        startIcon={<FontAwesomeIcon icon={faCheckCircle} />}
                        disabled={item.status === "confirmed"}
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(item._id, item.status, "rejected")}
                        className="cart-button-icon"
                        variant="contained"
                        startIcon={<FontAwesomeIcon icon={faTimesCircle} />}
                        disabled={item.status === "rejected"}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
