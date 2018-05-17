'use strict';

import React, {Component} from 'react'
import {AgGridReact} from 'ag-grid-react';
import './grid-intro.css'
import 'ag-grid-enterprise'

function customersGetter(params) {
  return  params.data.rocket.second_stage.payloads.reduce(
    (customers, payload) => customers.concat(payload.customers),
    [])
}

function dateGetter(params) {
  return new Date(params.data.launch_date_unix * 1000)
}

function dateSetter(params) {
  params.data.launch_date_unix = params.newValue.getTime() / 1000
}

function dateFormatter(params) {
  return params.value.getFullYear()
}

function dateParser(params) {
  return new Date(params.newValue)
}

class GridIntro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: this.createColumnDefs(),
      defaultColDef: { editable: true }
    }

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    fetch('https://api.spacexdata.com/v2/launches/upcoming')
      .then(response => response.json())
      .then(data => this.gridApi.setRowData(data))

    this.gridApi.sizeColumnsToFit();
  }

  createColumnDefs() {
    return [
      {headerName: "Flight Number", field: "flight_number", editable: true},
      {headerName: "Rocket Name", field: "rocket.rocket_name"},
      {headerName: "Customer", valueGetter: customersGetter, editable:true},
      {
        headerName: "Launch date",
        editable: true,
        valueGetter: dateGetter,
        valueSetter: dateSetter,
        valueFormatter: dateFormatter,
        valueParser: dateParser
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
      onGridReady={this.onGridReady}
      >
      </AgGridReact>
      </div>
    )
  }
}

export default GridIntro;
