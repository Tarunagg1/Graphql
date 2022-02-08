import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
  return (
    <Fragment>
      <header>
        <div className="main-navitation__logo">
          <h1>Event Booking</h1>
        </div>
        <nav className="main-navigation__items">
          <ul>
            <li>
              <NavLink
                className={(oldData) => (oldData.isActive ? "active" : "")}
                to="/auth"
              >
                Auth{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(oldData) => (oldData.isActive ? "active" : "")}
                to="/event"
              >
                Event{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(oldData) => (oldData.isActive ? "active" : "")}
                to="/booking"
              >
                Booking{" "}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
}
