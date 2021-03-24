import React from "react";

function Layout(props) {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
