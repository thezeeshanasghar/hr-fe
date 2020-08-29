import React, { Component } from 'react';
import axios from "axios";
import defaultUrl from "../../../app/services/constant/constant";
import $ from 'jquery';
import DataTable from "datatables.net";
import * as responsive from "datatables.net-responsive";
import * as excelStyles from "datatables-buttons-excel-styles";
import { Checkbox } from '@material-ui/core';
import { addDays } from 'date-fns';

class Dashboard extends Component {
    state = {

        Units: []

    };
    constructor(props) {
        super(props);
        let SelectedIds=[];
    }

    componentDidMount() {
        this.getUnitDetail();
    }

     onView=function() {
        console.log("working");
    }
    getUnitDetail = () => {
      
                let table = null;
                if (!$.fn.dataTable.isDataTable('#example')) {
                    table = $('#example').DataTable({
                        ajax: defaultUrl + "unit",
                        "columns": [
                            { "data": "Code" },
                            { "data": "Name" },
                            { "data": "Action",
                            sortable: false,
                            "render": function ( data, type, full, meta ) {
                               
                                return `<input type="checkbox" name="radio"  value=`+full.Id+`
                                onclick=" const checkboxes = document.querySelectorAll('input[name=radio]:checked');
                                            let values = [];
                                            checkboxes.forEach((checkbox) => {
                                                values.push(checkbox.value);
                                            });
                                            SelectedIds=values;
                                            "
                                
                                />`;
                            }
                         }

                        ],
                        rowReorder: {
                            selector: 'td:nth-child(2)'
                        },
                        responsive: true,
                        dom: 'Bfrtip',
                        buttons: [

                        ],
                        columnDefs: [{
                            "defaultContent": "-",
                            "targets": "_all"
                          }]
                    });
                } else {
                    table.ajax.reload();
                }
           
    }

    render() {
        return (
            <div>

                <table id="example" className="nowrap header_custom" style={{ "width": "100%" }}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Action</th>
                          
                        </tr>
                    </thead>
                   
                </table>
            </div>
        );
    }
}

export default Dashboard;