import React from "react";
import {
  BrowserRouter, Router, Route, Routes
} from "react-router-dom";
import Test from "./Test";
import Test2 from "./Test2";



function ThazzApp() {
  return (
    <div>
        <Test />

        {/* <Test2 /> */}
    </div>
  );
}

export default ThazzApp;
