import React, { useState } from 'react'
import { Navbar, MenuBar } from '../../components/navbar/Navbar'

const Aboutus = () => {
  const [menubar, setMenuBar] = useState(false);

  return (
    <div>
      <Navbar setMenuBar={setMenuBar} menubar={menubar}/>
      <MenuBar menubar={menubar} />
    </div>
  )
}

export default Aboutus