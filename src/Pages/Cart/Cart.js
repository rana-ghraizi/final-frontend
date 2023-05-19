import React, { useState } from "react";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";

const Cart = () => {
  const [menubar, setMenuBar] = useState(false);

  return (
    <>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
    </>
  );
};

export default Cart;
