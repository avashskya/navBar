import "./index.css";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      <Navitem item="1" />
      <Navitem item="2">
        <DropMenu />
      </Navitem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function Navitem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.item}
      </a>
      {open && props.children}
    </li>
  );
}

function DropMenu() {
  const [active, setActive] = useState("main");
  const [height, setHeight] = useState(null);

  function calcHeight(a) {
    const height = a.offsetHeight;
    setHeight(height);
  }

  return (
    <div className="dropdown" style={{ height: height }}>
      <CSSTransition
        in={active === "main"}
        unmountOnExit
        classNames="menu-primary"
        timeout={500}
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropItem leftIcon="❌">not</DropItem>
          <DropItem leftIcon="👁" rightIcon="👉" gotoMenu="go">
            go
          </DropItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={active === "go"}
        timeout={500}
        unmountOnExit
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropItem gotoMenu="main" leftIcon="👈">
            Back
          </DropItem>
          <DropItem leftIcon="👁" rightIcon="👉">
            go
          </DropItem>
          <DropItem leftIcon="👁" rightIcon="👉">
            go
          </DropItem>
          <DropItem leftIcon="👁" rightIcon="👉">
            go
          </DropItem>
          <DropItem leftIcon="👁" rightIcon="👉">
            go
          </DropItem>
        </div>
      </CSSTransition>
    </div>
  );

  function DropItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.gotoMenu && setActive(props.gotoMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
}

export default App;
