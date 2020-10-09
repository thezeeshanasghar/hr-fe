import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Icon, Input, MuiThemeProvider } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Lookups } from '../../services/constant/enum'
import defaultUrl from "../../services/constant/constant";
import moment from 'moment';
import Messages from '../toaster';
import { ToastContainer, toast } from 'react-toastify';


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
	formControl: {
		minWidth: "99%",
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	}
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
let id = 0;
function createData(Cnic, Name, Email, Unit, position) {
	id += 1;
	return { Cnic, Name, Email, Unit, position };
}

class EmployeeDetail extends Component {
	state = {
		value: 0,
		Employee: [],
		table: null
		// Id: 0,
		// Action: "Insert Record"
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
	}
	componentDidMount() {
		localStorage.removeItem("ids");
		this.getEmployeeById(39);
		
	}
	deleteRow = (element) => {
		console.log(element);
		this.setState({ PayRoll: this.state.PayRoll.filter(x => x.PayElement != element) })
	}


	handleTabChange = (event, value) => {
		if(value==1 || value==0)
		{
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });
		}
	};

	nextTab = (val) => {
		if (val === 2) {
			if (
				!this.validator.fieldValid('firstName') ||
				!this.validator.fieldValid('lastName') ||
				!this.validator.fieldValid('Gender') ||
				!this.validator.fieldValid('Country') ||
				!this.validator.fieldValid('Status') ||
				!this.validator.fieldValid('dateOfBirth') ||
				!this.validator.fieldValid('email') ||
				!this.validator.fieldValid('employeeCode') ||
				!this.validator.fieldValid('insuranceId') ||
				!this.validator.fieldValid('texationId') ||
				!this.validator.fieldValid('cnic') ||
				!this.validator.fieldValid('ContractType') ||
				!this.validator.fieldValid('EmployeeStatus') ||
				!this.validator.fieldValid('HireDate') ||
				!this.validator.fieldValid('reason') ||
				!this.validator.fieldValid('PartTime') ||
				!this.validator.fieldValid('ServiceStartDate') ||
				!this.validator.fieldValid('ProbationEndDate') ||
				!this.validator.fieldValid('title') ||
				!this.validator.fieldValid('ContractEndDate') ||
				!this.validator.fieldValid('company') ||
				!this.validator.fieldValid('Position') ||
				!this.validator.fieldValid('grade') ||
				!this.validator.fieldValid('Contact') ||
				!this.validator.fieldValid('Address')
			) {
				this.validator.showMessages();
				this.forceUpdate();
				return false;
			}
		}
		else if (val == 3) {
			if (!this.validator.fieldValid('Bank') ||
				!this.validator.fieldValid('Currency') ||
				!this.validator.fieldValid('IBAN') ||
				!this.validator.fieldValid('EffectiveDate') ||
				!this.validator.fieldValid('IsPrimary')
			) {

				this.validator.showMessages();
				this.forceUpdate();
				return false;
			}
		}
		else if (val == 4) {
			if (this.state.PayRoll.length <= 0) {
				return false;
			}
		}
		this.setState({ value: val });
	}
		
	getEmployeeById = (id) => {
		// var ids=localStorage.getItem("ids");
		// if(ids===null)
		// {
		// Messages.warning("No Record Selected")
		// return false;
		// }
		// document.getElementById("fuse-splash-screen").style.display="block";

		axios({
			method: "get",
			url: defaultUrl + "/employee/details/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.setState({
					Employee: response,
					// Action: "Update Record",
					// Id: response.data[0].Id,

				});
				document.getElementById("fuse-splash-screen").style.display="none";
				
				// employee detail table start
				this.state.table = $('#employeedetail_Table').DataTable({
					data: this.state.Employee,
					"columns": [
						{ "data": "FirstName" },
						{ "data": "LastName" },
						{ "data": "DOB" },
						{ "data": "HireDate" },
						{ "data": "HireReason" },
						{ "data": "ServiceStartDate" },
						{ "data": "ProbationEndDate" },
						{ "data": "PartTimePercentage" },
						{ "data": "Positions" },
						{ "data": "Grade" },
						{ "data": "Address" },
						{ "data": "Contact" },
						{ "data": "ContractEndDate" },
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
				
				// employee banl table start 
				this.state.table = $('#employebank_Table').DataTable({
					data: this.state.Employee.EmployeeBankAccount,
					"columns": [
						{ "data": "CompanyId" },
						{ "data": "BankId" },
						{ "data": "IBAN" },
						{ "data": "EffectiveDate" },
						{ "data": "IsPrimary" },
						{ "data": "CurrencyCode" },
						{ "data": "EmployeeId" }
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
			})
			.catch((error) => {
				console.log(error);
				document.getElementById("fuse-splash-screen").style.display="none";

			})
	}
	getEmployeeBankById = (EmployeeId) => {
		axios({
			method: "get",
			url: defaultUrl + "/BankAccount/ByEmployee/" + EmployeeId,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.setState({
					Bank: response.data[0].BankId,
					Currency: response.data[0].CurrencyCode,
					IBAN: response.data[0].IBAN,
					IsPrimary: response.data[0].IsPrimary,
					EffectiveDate: moment(response.data[0].EffectiveDate).format('YYYY-MM-DD'),
				})
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getEmployeePayRollById = (EmployeeId) => {
		axios({
			method: "get",
			url: defaultUrl + "/Employee/PayRoll/" + EmployeeId,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.setState({
					PayRoll: response.data
				})
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getApplicableLaws = (EmployeeId) => {
		axios({
			method: "get",
			url: defaultUrl + "/Employee/ApplicableLaw/" + EmployeeId,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.setState({
					selectedLaws: response.data
				})
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getEmployeeDetailsForEdit = (Id) => {
		console.log(Id);
		this.getEmployeeById(Id);
		this.getEmployeeBankById(Id);
		this.getEmployeePayRollById(Id);
		this.getApplicableLaws(Id);
	}

	render() {
		const { classes, theme } = this.props;

		return (
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="p-24"><h4>Employee Detail</h4></div>
				}
				// contentToolbar={
				// 	<div className="px-24"><h4>Add New Company</h4></div>
				// }
				content={

					<div className={classes.root}>
						 <div>
        <ToastContainer />
      </div>
						<AppBar position="static" color="default">
							<Tabs
								value={this.state.value}
								onChange={this.handleTabChange}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth">

								<Tab label="Employee Detail" />
								<Tab label="Employee Bank" />
								<Tab label="Employee Payroll" />
								<Tab label="Applicable Laws" />
							</Tabs>
						</AppBar>
						<SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}>
						<TabContainer dir={theme.direction}>
								<Paper className={classes.root}>
								{/* <div className="row">
									<div style={{ float: "left", "marginLeft": "8px", "marginTop": "8px" }}>
										<Button variant="outlined" color="primary" className={classes.button} onClick={this.getEmployeeById}>
											Edit
										</Button>
									</div>
									<div style={{ float: "left", "marginLeft": "8px", "marginTop": "8px" }}>
										<Button variant="outlined" color="inherit" className={classes.button} onClick={this.deleteEmployee}>
											Delete
										</Button>
									</div>
								</div> */}
								<table id="employeedetail_Table" className="nowrap header_custom" style={{ "width": "100%" }}>
										<thead>
											<tr>
												{/* <th>EmployeeCode</th>
												<th>Title</th> */}
												<th>FirstName</th>
												<th>LastName</th>
												<th>DOB</th>
												<th>HireDate</th>
												<th>HireReason</th>
												<th>ServiceStartDate</th>
												<th>ProbationEndDate</th>
												<th>PartTimePercentage</th>
												<th>Positions</th>
												<th>Grade</th>
												<th>Address</th>
												{/* <th>PartTimePercentage</th> */}
												{/* <th>ContractEndDate</th> */}
												{/* <th>Address</th> */}
												<th>Contact</th>
												{/* <th>MaritalStatus</th> */}
												{/* <th>Country</th> */}
												{/* <th>CurrentEmployeeStatus</th> */}
												<th>ContractEndDate</th>
												<th>CompanyName</th>
											</tr>
										</thead>
									</table>
								
								</Paper>
							</TabContainer>

							<TabContainer dir={theme.direction}>
								<Paper className={classes.root}>
								{/* <div className="row">
									<div style={{ float: "left", "marginLeft": "8px", "marginTop": "8px" }}>
										<Button variant="outlined" color="primary" className={classes.button} onClick={this.getEmployeeById}>
											Edit
										</Button>
									</div>
									<div style={{ float: "left", "marginLeft": "8px", "marginTop": "8px" }}>
										<Button variant="outlined" color="inherit" className={classes.button} onClick={this.deleteEmployee}>
											Delete
										</Button>
									</div>
								</div> */}
								<table id="employebank_Table" className="nowrap header_custom" style={{ "width": "100%" }}>
										<thead>
											<tr>
												<th>CompanyId</th>
												<th>BankId</th>
												<th>IBAN</th>
												<th>EffectiveDate</th>
												<th>IsPrimary</th>
												<th>CurrencyCode</th>
												<th>EmployeeId</th>
											</tr>
										</thead>
									</table>
								
								</Paper>
							</TabContainer>
						</SwipeableViews>
					</div>
				}
			/>
		)
	}
}
export default withStyles(styles, { withTheme: true })(EmployeeDetail);