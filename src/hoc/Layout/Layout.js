import React, { useState } from "react";
import styles from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

function Layout(props) {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };
  const menuCloseHandler = () => {
    setMenu(false);
  };
  return (
    <div className={styles.Layout}>
      <Drawer isOpen={menu} onClose={menuCloseHandler} />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
