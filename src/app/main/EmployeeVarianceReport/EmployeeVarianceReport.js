import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import SimpleReactValidator from 'simple-react-validator';
import defaultUrl from "../../services/constant/constant";
import $ from 'jquery';
import DataTable from "datatables.net";
import * as responsive from "datatables.net-responsive";
import axios from "axios";

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		
	},
	dense: {
		marginTop: 16,
	},
	menu: {
		width: 200,
	},
});

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);
function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
			{children}
		</Typography>
	);
}


class EmployeeVarianceReport extends Component {
	state = {
		value: 0,
		Action:'Insert Record',
		table:null,
		data: []

	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
	
	  }
	  componentDidMount(){
		localStorage.removeItem("ids");
		  this.getPayrollDetail();
	  }
	
	  getPayrollDetail=()=>{
		axios({
			method: "get",
			url: defaultUrl + "report/varriance",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data.data);
				let report = [];
				let paid = "";
				response.data.data.forEach(element => {
					if (element.RANK == 1){
						paid = element.Paid;
					}
					else {
						element.variance = element.Paid - paid;
						element.percentage = (element.Paid - paid)/paid * 100;
					    report.push(element);
					}
				});
				console.log(report);
				this.setState({ data: report});
//  data table
			if (!$.fn.dataTable.isDataTable('#Employee_Table')) {
			this.state.table = $('#Employee_Table').DataTable({
				"data":this.state.data,
				"columns": [
					{ "data": "EmployeeCode" },
					{ "data": "FirstName" },
					{ "data": "HireDate" },
					{ "data": "Paid" },
					{ "data": "DateofPayment" },
					{ "data": "variance" },
					{ "data": "percentage" }
				

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
			this.state.table.ajax.reload();
		}
		// end data table
			})
			.catch((error) => {
				console.log(error);
			})
	  }
	 	
	render() {
		const { classes, theme } = this.props;

		return (
			<FusePageSimple
				
				header={
					<div className="p-24"><h4>PayRoll Report</h4></div>
				}
				
				content={

					<div className={classes.root}>
						<AppBar position="static" color="default">
							
						</AppBar>
				
								<Paper className={classes.root}>
		
									<table id="Employee_Table" className="nowrap header_custom" style={{ "width": "100%" }}>
										<thead>
											<tr>
												<th>EmployeeCode</th>	
												<th>FirstName</th>
												<th>HireDate</th>
												<th>Paid</th>
												<th>Date</th>
												<th>Variance</th>
												<th>Percentage</th>
											</tr>
										</thead>

									</table>
                              </Paper>
					</div>
				}
			/>
		)
	}
}

export default withStyles(styles, { withTheme: true })(EmployeeVarianceReport);