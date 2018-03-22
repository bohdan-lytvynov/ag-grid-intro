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

  successRate(values) {
    const successLaunches = values.reduce( (sum, bool) => sum + Number(bool), 0)

    if (values.length === 0) return 'No laynches';

    return `${successLaunches * 100 / values.length}%`;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    fetch('https://api.spacexdata.com/v2/launches/all')
      .then(response => response.json())
      .then(data => this.gridApi.setRowData(data))

  }

  createColumnDefs() {
    return [
      {headerName: "Rocket Name", field: "rocket.rocket_name", rowGroup: true},
      {headerName: "Launch year", field: "launch_year", pivot: true},
      {headerName: "Success rate", field: "launch_success", aggFunc: this.successRate},
    ];
  }

  render() {
    return (
      <div className="ag-fresh">
      <h1>Simple ag-Grid React Example</h1>
      <AgGridReact
      pivotMode={true}
      enableColResize={true}
      columnDefs={this.state.columnDefs}
      onGridReady={this.onGridReady}>
      </AgGridReact>
      </div>
    )
  }
}

export default GridIntro;
