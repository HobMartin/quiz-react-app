import React, { useState } from "react";
import styles from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { useSelector } from "react-redux";

function Layout(props) {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };
  const menuCloseHandler = () => {
    setMenu(false);
  };
  return (
    <div className={styles.Layout}>
      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
