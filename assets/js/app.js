import React, { useState } from "react";
import ReactDom from "react-dom";
import "../css/app.css";
import { withRouter, HashRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PanierPage from "./pages/PanierPage";
import ConfirmPage from "./pages/ConfirmPage";

const App = () => {
  const NavBarWithRouter = withRouter(NavBar);

  return (
    <>
      <HashRouter>
        <NavBarWithRouter />
        <main className="container ">
          <Switch>
            <Route path="/confirm-order" component={ConfirmPage} />
            <Route path="/panier" component={PanierPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

const rootElement = document.querySelector("#app");
ReactDom.render(<App />, rootElement);
