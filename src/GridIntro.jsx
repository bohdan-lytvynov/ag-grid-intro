'use strict';

import React, {Component} from 'react'
import {AgGridReact} from 'ag-grid-react';
import './grid-intro.css'

class GridIntro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: this.createColumnDefs()
    }

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    fetch('https://api.spacexdata.com/v2/rockets')
      .then(response => response.json())
      .then(data => this.gridApi.setRowData(data))

    this.gridApi.sizeColumnsToFit();
  }

  createColumnDefs() {
    return [
      {headerName: "Name", field: "name"},
      {headerName: "Country", field: "country"},
      {headerName: "Company", field: "company"},
      {headerName: "Cost per launch", field: "cost_per_launch"}
    ];
  }

  render() {
    return (
      <div className="ag-fresh">
      <h1>Simple ag-Grid React Example</h1>
      <AgGridReact
      // properties
      columnDefs={this.state.columnDefs}

      // events
      onGridReady={this.onGridReady}>
      </AgGridReact>
      </div>
    )
  }
}

export default GridIntro;
