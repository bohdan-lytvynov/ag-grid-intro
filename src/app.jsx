import React from "react";
import {render} from "react-dom";

import 'ag-grid-enterprise'

import 'ag-grid-root/dist/styles/ag-grid.css';
import "ag-grid-root/dist/styles/theme-fresh.css";

import GridIntro from "./GridIntro";

document.addEventListener('DOMContentLoaded', () => {
  render(
    <GridIntro/>,
    document.getElementById('root')
  );
})
