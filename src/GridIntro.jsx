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

    fetch('https://api.spacexdata.com/v2/capsules')
      .then(response => response.json())
      .then(data => this.gridApi.setRowData(data))

    this.gridApi.sizeColumnsToFit();
  }

  createColumnDefs() {
    return [
      {headerName: "Name", field: "name"},
      {headerName: "Crew capacity", field: "crew_capacity"},
      {headerName: "Orbit during year", field: "orbit_duration_yr"},
      {
        headerName: 'Heat Shield',
        children: [
          {headerName: "Material", field: "heat_shield.material"},
          {headerName: "Dev partner", field: "heat_shield.dev_partner"},
        ]
      },
      {
        headerName: 'Trunk',
        children: [
          {
            headerName: "Trunk Volume", 
            children: [
              {headerName: "Cubic meters", field: "trunk.trunk_volume.cubic_meters"},
              {headerName: "Cubic feets", field: "trunk.trunk_volume.cubic_feet"},
            ]
          },
          {
            headerName: "Cargo", 
            children: [
              {headerName: "Solar array", field: "trunk.cargo.solar_array"},
              {headerName: "Unpressurized Cargo", field: "trunk.cargo.unpressurized_cargo"}
            ]
          },
        ]
      }
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
