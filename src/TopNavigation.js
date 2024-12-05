import React from "react";
import "./index.css";
import logo from "./images/logo.png";
import {
  faCloud,
  faCog,
  faEye,
  faHome,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopNavigation() {
  return (
    <div>
      <div className="mainheader">
        <div className="right">
          <div className="text">
            <h2>AI Coding Trainer</h2>
            <h3>v1</h3>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
