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
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		email: "",
		employeeCode: "",
		insuranceId: "",
		texationId: "",
		PartTime: "",
		cnic: "",
		value: 0,
		Gender: '',
		Status: '',
		Country: '',
		ContractType: '',
		EmployeeStatus: '',
		company: "",
		Position: "",
		grade: "",
		Bank: "",
		Currency: "",
		PaymentMethod: "",
		SalaryStatus: "",
		PayElement: "",
		amount: "",
		PayRollCurrency: "",
		payrollStartDate: "",
		payrollEndDate: "",
		IBAN: "",
		IsPrimary: "",
		EffectiveDate: "",
		HireDate: "",
		reason: "",
		ServiceStartDate: "",
		ProbationEndDate: "",
		parttimepercentage: "",
		ContractEndDate: "",
		Address: "",
		Contact: "",
		title: "",
		Companies: [],
		companyList: [],
		genderList: [],
		countryList: [],
		maritallist: [],
		contractTypeList: [],
		statusList: [],
		currencyList: [],
		parttimeList: [],
		positionList: [],
		gradeList: [],
		salaryStatusList: [],
		paymentmethodList: [],
		socialList: [],
		taxationList: [],
		bankList: [],
		payElements: [],
		PayRoll: [],
		TitleList: [],
		employeeList: [],
		lawsList: [],
		lawId: "",
		selectedLaws: [],
		Id: 0,
		Action: "Insert Record"
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
	}
	componentDidMount() {
		localStorage.removeItem("ids");
		
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
	
	
	getEmployeeById = () => {
		var ids=localStorage.getItem("ids");
		if(ids===null)
		{
		Messages.warning("No Record Selected")
		return false;
		}
		document.getElementById("fuse-splash-screen").style.display="block";

		axios({
			method: "get",
			url: defaultUrl + "/employee/" + ids,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.getPosition(response.data[0].CompanyId);
				this.getGrades(response.data[0].CompanyId);
				this.setState({
					firstName: response.data[0].FirstName,
					lastName: response.data[0].LastName,
					dateOfBirth: moment(response.data[0].DOB).format('YYYY-MM-DD'),
					email: response.data[0].Email,
					employeeCode: response.data[0].EmployeeCode,
					insuranceId: response.data[0].InsuranceId,
					texationId: response.data[0].TaxationId,
					PartTime: response.data[0].PartTimeSituation,
					cnic: response.data[0].Cnic,
					value: 1,
					Gender: response.data[0].Gender,
					Status: response.data[0].MaritalStatus,
					Country: response.data[0].Country,
					ContractType: response.data[0].ContractType,
					EmployeeStatus: response.data[0].CurrentEmployeeStatus,
					company: response.data[0].CompanyId,
					Position: response.data[0].PositionId,
					grade: response.data[0].GradeId,
					HireDate: moment(response.data[0].HireDate).format('YYYY-MM-DD'),
					reason: response.data[0].HiringReason,
					ServiceStartDate: moment(response.data[0].ServiceStartDate).format('YYYY-MM-DD'),
					ProbationEndDate: moment(response.data[0].ProbationEndDate).format('YYYY-MM-DD'),
					parttimepercentage: response.data[0].PartTimePercentage,
					ContractEndDate: moment(response.data[0].ContractEndDate).format('YYYY-MM-DD'),
					Address: response.data[0].Address,
					Contact: response.data[0].Contact,
					title: response.data[0].Title,
					Action: "Update Record",
					Id: response.data[0].Id
				})
				document.getElementById("fuse-splash-screen").style.display="none";

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
>
								<Tab label="View" />
								<Tab label="Employee Detail" />
								<Tab label="Employee Bank" />
								<Tab label="Employee Payroll" />
								<Tab label="Applicable Laws" />
							</Tabs>
						</AppBar>
						<SwipeableViews>
							
						</SwipeableViews>
					</div>
				}
			/>
		)
	}
}
export default withStyles(styles, { withTheme: true })(EmployeeDetail);