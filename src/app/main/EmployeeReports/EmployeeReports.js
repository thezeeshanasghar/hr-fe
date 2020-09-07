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


class EmployeeReports extends Component {
	state = {
		value: 0,
		Action:'Insert Record',
		table:null,
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
	
	  }
	  componentDidMount(){
		localStorage.removeItem("ids");
		  this.getEmployeeDetail();
	  }
	
	  getEmployeeDetail=()=>{
		localStorage.removeItem("ids");
		if (!$.fn.dataTable.isDataTable('#Employee_Table')) {
			this.state.table = $('#Employee_Table').DataTable({
				ajax: defaultUrl + "report/employee",
				"columns": [
					{ "data": "EmployeeCode" },
					// { "data": "InsuranceId" },
					// { "data": "TaxationId" },
					{ "data": "Cnic" },
					{ "data": "FirstName" },
					{ "data": "LastName" },
					{ "data": "DOB" },
					{ "data": "HireDate" },
					{ "data": "Address" },
					{ "data": "Contact" },
					{ "data": "Gender" },
					// { "data": "Marital Status" },
					// { "data": "Country" },
					// { "data": "Title" },
					{ "data": "Salary" },
					{ "data": "Email" },
					// { "data": "BankId" },
					 { "data": "IBAN" },
					// { "data": "EffectiveDate" },
					// { "data": "IsPrimary" },
					// { "data": "CurrencyCode" },
					// { "data": "BankName" },
					 { "data": "CompanyName" },

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
	  }
	 	
	render() {
		const { classes, theme } = this.props;

		return (
			<FusePageSimple
				
				header={
					<div className="p-24"><h4>Employee Report</h4></div>
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
												{/* <th>InsuranceId</th>
												<th>TaxationId</th> */}
												<th>CNIC</th>
												<th>FirstName</th>
												<th>LastName</th>
												<th>DOB</th>
												<th>HireDate</th>
												<th>Address</th>
												<th>Contact</th>
												<th>Gender</th>
												{/* <th>Marital Status</th> */}
												{/* <th>Country</th>
												<th>Title</th> */}
												<th>Salary</th>
												<th>Email</th>
												<th>IBAN</th>
												<th>Company</th>
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

export default withStyles(styles, { withTheme: true })(EmployeeReports);