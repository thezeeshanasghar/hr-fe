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
import defaultUrl from "../../../app/services/constant/constant";
import moment from 'moment';
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

const rows = [
	createData('61101345656', 'Salman', 'chirfan521@gmail.com', 'IT', 'Manager'),
	createData('61101345656', 'Salman', 'chirfan521@gmail.com', 'IT', 'Manager'),
	createData('61101345656', 'Salman', 'chirfan521@gmail.com', 'IT', 'Manager'),
	createData('61101345656', 'Salman', 'chirfan521@gmail.com', 'IT', 'Manager'),
	createData('61101345656', 'Salman', 'chirfan521@gmail.com', 'IT', 'Manager'),



];

class Employee extends Component {
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
		this.getGender();
		this.getCountry();
		this.getMaritalStatus();
		this.getContractType();
		this.getEmployeeStatus();
		this.getPartTime();
		this.getCompanyDetail();
		this.getCurrency();
		this.getSalaryStatus();
		this.getPaymentMethod();
		this.getBanks();
		this.getTitle();
		this.getEmployeeList();
		this.getCountryLaws();
	}
	deleteRow = (element) => {
		console.log(element);
		this.setState({ PayRoll: this.state.PayRoll.filter(x => x.PayElement != element) })
	}
	AddPayRoll = () => {
		if (!this.validator.fieldValid('payrollEndDate') ||
			!this.validator.fieldValid('payrollStartDate') ||
			!this.validator.fieldValid('PayRollCurrency') ||
			!this.validator.fieldValid('amount') ||
			!this.validator.fieldValid('PayElement')) {
			this.validator.showMessages();
			this.forceUpdate();
			return false;
		}
		let list = this.state.PayRoll;
		let count = list.filter(x => x.PayElement == this.state.PayElement).length;

		if (count > 0) {
			this.setState({ PayRoll: list, PayElement: "", amount: "", payrollStartDate: "", payrollEndDate: "" })
			return false;
		}

		list.push({
			PayelementId: this.state.PayElement,
			value: this.state.amount,
			Currency: this.state.PayRollCurrency,
			StartDate: this.state.payrollStartDate,
			EndDate: this.state.payrollEndDate
		});

		this.setState({ PayRoll: list, PayElement: "", amount: "", payrollStartDate: "", payrollEndDate: "" })
	}

	addLaw = () => {
		if (!this.validator.fieldValid('lawId')) {
			this.validator.showMessages();
			this.forceUpdate();
			return false;
		}
		var array = [];
		array = this.state.selectedLaws;
		let count = array.filter(x => x.LawId == this.state.lawId).length;
		if (!(count > 0)) {
			array.push({
				LawId: this.state.lawId
			})
			console.log(array);
			this.setState({ selectedLaws: array });
		}
	}
	deleteLawRow = (id) => {
		this.setState({ selectedLaws: this.state.selectedLaws.filter(x => x.LawId != id) })
	}

	handleTabChange = (event, value) => {
		if(value==1 || value==0)
		{
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });
		}
		

	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name == "company") {
			this.getPosition(e.target.value);
			this.getGrades(e.target.value);
			this.getPayElement(e.target.value);
		}
	};
	getMaritalStatus = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.marital_Status,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ maritallist: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getGender = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.gender,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ genderList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getCountry = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.Country,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ countryList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getContractType = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.Contract_Type,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ contractTypeList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getEmployeeStatus = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.EmployeeStatus,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ statusList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getCurrency = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.Currency,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ currencyList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getSalaryStatus = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.salarystatus,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ salaryStatusList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getPaymentMethod = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.paymentmethod,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ paymentmethodList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getCompanyDetail = () => {
		axios({
			method: "get",
			url: defaultUrl + "company",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ Companies: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getPartTime = () => {

		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.parttime,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ parttimeList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getPosition = (id) => {
		console.log(id);
		axios({
			method: "get",
			url: defaultUrl + "position/ByCompany/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data);
				this.setState({
					positionList: response.data
				});

			})
			.catch((error) => {
				console.log(error);
			})
	}
	getGrades = (id) => {

		axios({
			method: "get",
			url: defaultUrl + "Grades/ByCompany/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data);
				this.setState({
					gradeList: response.data
				});

			})
			.catch((error) => {
				console.log(error);
			})
	}
	getSocialSecurity = (id) => {

		axios({
			method: "get",
			url: defaultUrl + "socialsecurity",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data);
				this.setState({
					socialList: response.data
				});

			})
			.catch((error) => {
				console.log(error);
			})
	}
	getTaxation = (id) => {

		axios({
			method: "get",
			url: defaultUrl + "taxation",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data);
				this.setState({
					taxationList: response.data
				});

			})
			.catch((error) => {
				console.log(error);
			})
	}
	getBanks = () => {
		axios({
			method: "get",
			url: defaultUrl + "Bank",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ bankList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getPayElement = (id) => {
		axios({
			method: "get",
			url: defaultUrl + "payelement/ByCompany/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ payElements: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getPayRollDetail = () => {
		var detail = "";

		for (var i = 0; i < this.state.PayRoll.length; i++) {
			detail += this.state.PayRoll[i].PayelementId + '@' + this.state.PayRoll[i].value + "_" + this.state.PayRoll[i].Currency + "&" + this.state.PayRoll[i].StartDate + "|" + this.state.PayRoll[i].EndDate + "!;";
		}
		return detail;
	}
	getLawsDetail = () => {
		var detail = "";

		for (var i = 0; i < this.state.selectedLaws.length; i++) {
			detail += this.state.selectedLaws[i].LawId + ";";
		}
		return detail;
	}
	getTitle = () => {
		axios({
			method: "get",
			url: defaultUrl + "/lookups/" + Lookups.Title,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ TitleList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getCountryLaws = () => {
		axios({
			method: "get",
			url: defaultUrl + "countryLaw",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ lawsList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	insertUpdateEmployee = () => {

		var method = "post";
		var url = defaultUrl + "employee";
		if (this.state.Action != "Insert Record") {
			method = "put";
			url = defaultUrl + "employee/" + this.state.Id;
		}
		var obj = {
			Title: this.state.title,
			TaxationId: this.state.texationId,
			Address: this.state.Address,
			Contact: this.state.Contact,
			IsPrimary: this.state.IsPrimary,
			IBAN: this.state.IBAN,
			EffectiveDate: this.state.EffectiveDate,
			FirstName: this.state.firstName,
			LastName: this.state.lastName,
			DOB: this.state.dateOfBirth,
			HireDate: this.state.HireDate,
			HiringReason: this.state.reason,
			ServiceStartDate: this.state.ServiceStartDate,
			ProbationEndDate: this.state.ProbationEndDate,
			PartTimePercentage: this.state.parttimepercentage,
			ContractEndDate: this.state.ContractEndDate,
			Email: this.state.email,
			EmployeeCode: this.state.employeeCode,
			InsuranceId: this.state.insuranceId,
			PartTimeSituation: this.state.PartTime,
			Cnic: this.state.cnic,
			Gender: this.state.Gender,
			MaritalStatus: this.state.Status,
			Country: this.state.Country,
			ContractType: this.state.ContractType,
			CurrentEmployeeStatus: this.state.EmployeeStatus,
			CompanyId: this.state.company,
			PositionId: this.state.Position,
			GradeId: this.state.grade,
			BankId: this.state.Bank,
			CurrencyCode: this.state.Currency,
			Paymethod: this.state.PaymentMethod,
			SalaryStatus: this.state.SalaryStatus,
			PayRollDetail: this.getPayRollDetail(),
			ApplicableLaws: this.getLawsDetail(),
		};
		axios.interceptors.request.use(function (config) {
			return config;
		}, function (error) {
			console.log('Error');
			return Promise.reject(error);
		});
		axios({
			method: method,
			url: url,
			data: JSON.stringify(obj),
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.getEmployeeList();
				this.setState({
					firstName: "",
					lastName: "",
					dateOfBirth: "",
					email: "",
					employeeCode: "",
					insuranceId: "",
					texationId: "",
					PartTime: "",
					cnic: "",
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
					PayRoll: [],
					selectedLaws: [],
					Id: 0,
					Action: 'Insert Record'
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					firstName: "",
					lastName: "",
					dateOfBirth: "",
					email: "",
					employeeCode: "",
					insuranceId: "",
					texationId: "",
					PartTime: "",
					cnic: "",
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
					PayRoll: [],
					selectedLaws: [],
					Id: 0,
					Action: 'Insert Record'
				})
			})

	}
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
	getEmployeeList = () => {
		axios({
			method: "get",
			url: defaultUrl + "/employee/",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.setState({ employeeList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	deleteEmployee = (id) => {
		axios({
			method: "delete",
			url: defaultUrl + "/employee/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.getEmployeeList();
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getEmployeeById = (id) => {
		axios({
			method: "get",
			url: defaultUrl + "/employee/" + id,
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
			})
			.catch((error) => {
				console.log(error);
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
					<div className="p-24"><h4>Companies</h4></div>
				}
				// contentToolbar={
				// 	<div className="px-24"><h4>Add New Company</h4></div>
				// }
				content={

					<div className={classes.root}>

						<AppBar position="static" color="default">
							<Tabs
								value={this.state.value}
								onChange={this.handleTabChange}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth"
							>
								<Tab label="View" />
								<Tab label="Employee Detail" />
								<Tab label="Employee Bank" />
								<Tab label="Employee Payroll" />
								<Tab label="Applicable Laws" />
							</Tabs>
						</AppBar>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}
						>
							<TabContainer dir={theme.direction}>
								<Paper className={classes.root}>
									<MuiThemeProvider theme={this.props.theme}>
										<Paper className={"flex items-center h-44 w-full"} elevation={1}>


											<Input

												placeholder="Search..."
												className="pl-16"
												disableUnderline
												fullWidth
												inputProps={{
													'aria-label': 'Search'
												}}
											/>
											<Icon color="action" className="mr-16">search</Icon>
											<Button variant="contained" color="secondary" style={{ 'marginRight': '2px' }} className={classes.button}>
												PRINT
      								</Button>
										</Paper>
									</MuiThemeProvider>
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												{/* <CustomTableCell align="center" >Employee Code</CustomTableCell> */}
												<CustomTableCell align="center" >CNIC</CustomTableCell>
												<CustomTableCell align="center" >First Name</CustomTableCell>
												{/* <CustomTableCell align="center" >Middle Name</CustomTableCell> */}
												{/* <CustomTableCell align="center">Family Name</CustomTableCell> */}
												{/* <CustomTableCell align="center">Gender</CustomTableCell> */}
												{/* <CustomTableCell align="center">Marital Status</CustomTableCell> */}
												{/* <CustomTableCell align="center">DOB</CustomTableCell> */}
												{/* <CustomTableCell align="center">Country Of Birth</CustomTableCell> */}
												{/* <CustomTableCell align="center">Email</CustomTableCell> */}
												{/* <CustomTableCell align="center">Base Country</CustomTableCell> */}
												{/* <CustomTableCell align="center">Contract Type</CustomTableCell> */}
												{/* <CustomTableCell align="center">Current Employee Status</CustomTableCell> */}
												<CustomTableCell align="center">Email</CustomTableCell>
												{/* <CustomTableCell align="center">Hiring Reason</CustomTableCell> */}
												{/* <CustomTableCell align="center">Service Start Date</CustomTableCell> */}
												{/* <CustomTableCell align="center">Probation End Date</CustomTableCell> */}
												{/* <CustomTableCell align="center">Part Time Situation</CustomTableCell>
												<CustomTableCell align="center">Part Time percentage</CustomTableCell>
												<CustomTableCell align="center">Contract End Date</CustomTableCell> */}
												{/* <CustomTableCell align="center">Unit</CustomTableCell> */}
												{/* <CustomTableCell align="center">Job</CustomTableCell> */}
												{/* <CustomTableCell align="center">Position</CustomTableCell> */}
												{/* <CustomTableCell align="center">Grade</CustomTableCell> */}
												{/* <CustomTableCell align="center">Currency</CustomTableCell>
												<CustomTableCell align="center">Salary Status</CustomTableCell>
												<CustomTableCell align="center">paymethod</CustomTableCell>
												<CustomTableCell align="center">Taxation</CustomTableCell>
												<CustomTableCell align="center">Social Security</CustomTableCell> */}
												<CustomTableCell align="center">Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.employeeList.map(row => (
												<TableRow className={classes.row} key={row.Id}>

													<CustomTableCell align="center">{row.Cnic}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">{row.FirstName}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">{row.Email}</CustomTableCell>
													{/* <CustomTableCell align="center" component="th" scope="row">{row.Unit}</CustomTableCell> */}
													{/* <CustomTableCell align="center" component="th" scope="row">{row.position}</CustomTableCell> */}
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} aria-label="Delete" onClick={() => this.deleteEmployee(row.Id)} >
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} aria-label="Edit" onClick={() => this.getEmployeeDetailsForEdit(row.Id)} >
															<EditIcon />
														</IconButton>
													</CustomTableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Paper>
							</TabContainer>
							<TabContainer dir={theme.direction}>

								<form className={classes.container} noValidate autoComplete="off">
									<Grid item xs={12} sm={2} style={{ marginRight: '5px' }} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="title">Title</InputLabel>
											<Select
												value={this.state.title}
												onChange={this.handleChange}
												inputProps={{
													name: 'title',
													id: 'title',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.TitleList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('title', this.state.title, 'required')}

									</Grid>
									<Grid item xs={12} sm={3} style={{ marginRight: '5px' }} >
										<TextField id="standard-basic" fullWidth label="First Name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
										{this.validator.message('firstName', this.state.firstName, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}>
										<TextField id="standard-basic" fullWidth label="Last Name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
										{this.validator.message('lastName', this.state.lastName, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Gender">Gender</InputLabel>
											<Select
												value={this.state.Gender}
												onChange={this.handleChange}
												inputProps={{
													name: 'Gender',
													id: 'Gender',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.genderList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('Gender', this.state.Gender, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}  >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Country">Country</InputLabel>
											<Select
												value={this.state.Country}
												onChange={this.handleChange}
												inputProps={{
													name: 'Country',
													id: 'Country',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.countryList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('Country', this.state.Country, 'required')}
									</Grid>

									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Status">Marital Status</InputLabel>
											<Select
												value={this.state.Status}
												onChange={this.handleChange}
												inputProps={{
													name: 'Status',
													id: 'Status',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.maritallist.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('Status', this.state.Status, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}  >
										<TextField
											id="date"
											label="Date of Birth"
											type="date"
											fullWidth
											name="dateOfBirth"
											value={this.state.dateOfBirth}
											className={classes.textField}
											onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('dateOfBirth', this.state.dateOfBirth, 'required')}

									</Grid>

									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<TextField id="standard-basic" fullWidth label="Email" value={this.state.email} onChange={this.handleChange} name="email" />
										{this.validator.message('email', this.state.email, 'required')}

									</Grid>

									<Grid item xs={12} sm={5}   >
										<TextField id="standard-basic" value={this.state.employeeCode} fullWidth label="Employee Code" name="employeeCode" onChange={this.handleChange} />
										{this.validator.message('employeeCode', this.state.employeeCode, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<TextField id="standard-basic" fullWidth label="Insurance Id" value={this.state.insuranceId} name="insuranceId" onChange={this.handleChange} />
										{this.validator.message('insuranceId', this.state.insuranceId, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}  >
										<TextField id="standard-basic" fullWidth label="Texation Id" onChange={this.handleChange} name="texationId" value={this.state.texationId} />
										{this.validator.message('texationId', this.state.texationId, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<TextField id="standard-basic" fullWidth label="Cnic" onChange={this.handleChange} name="cnic" />
										{this.validator.message('cnic', this.state.cnic, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}>
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="ContractType">Contract Type</InputLabel>
											<Select
												value={this.state.ContractType}
												onChange={this.handleChange}
												inputProps={{
													name: 'ContractType',
													id: 'ContractType',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.contractTypeList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('ContractType', this.state.ContractType, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="ContractType">Employee Status</InputLabel>
											<Select
												value={this.state.EmployeeStatus}
												onChange={this.handleChange}
												inputProps={{
													name: 'EmployeeStatus',
													id: 'EmployeeStatus',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.statusList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('EmployeeStatus', this.state.EmployeeStatus, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}  >
										<TextField
											id="date"
											label="Hire Date"
											type="date"
											name="HireDate"
											value={this.state.HireDate}
											fullWidth
											className={classes.textField}
											onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('HireDate', this.state.HireDate, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >

										<TextField id="standard-basic" value={this.state.reason} fullWidth label="Hiring Reason" onChange={this.handleChange} name="reason" />
										{this.validator.message('reason', this.state.reason, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}   >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="PartTime">PartTime Situation</InputLabel>
											<Select
												value={this.state.PartTime}
												onChange={this.handleChange}
												inputProps={{
													name: 'PartTime',
													id: 'PartTime',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.parttimeList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('PartTime', this.state.PartTime, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}  >
										<TextField
											id="date"
											label="Service Start Date"
											type="date"
											fullWidth
											name="ServiceStartDate"
											value={this.state.ServiceStartDate}
											className={classes.textField}
											onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('ServiceStartDate', this.state.ServiceStartDate, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}   >
										<TextField
											id="date"
											label="Probation End Date"
											type="date"
											fullWidth
											name="ProbationEndDate"
											value={this.state.ProbationEndDate}
											className={classes.textField}
											onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('ProbationEndDate', this.state.ProbationEndDate, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >

										<TextField id="standard-basic" type="number" value={this.state.parttimepercentage} fullWidth label="Part Time Percentage" onChange={this.handleChange} name="parttimepercentage" />
										{this.validator.message('parttimepercentage', this.state.parttimepercentage, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}   >
										<TextField
											id="date"
											label="Contract End Date"
											type="date"
											fullWidth
											name="ContractEndDate"
											value={this.state.ContractEndDate}
											className={classes.textField}
											onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('ContractEndDate', this.state.ContractEndDate, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="company">Company</InputLabel>
											<Select
												value={this.state.company}
												onChange={this.handleChange}
												inputProps={{
													name: 'company',
													id: 'company',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>

												{this.state.Companies.map(row => (
													<MenuItem value={row.Id}>{row.CompanyName}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('company', this.state.company, 'required')}
									</Grid>

									<Grid item xs={12} sm={5}  >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Position">Position</InputLabel>
											<Select
												value={this.state.Position}
												onChange={this.handleChange}
												inputProps={{
													name: 'Position',
													id: 'Position',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>

												{this.state.positionList.map(row => (
													<MenuItem value={row.Id}>{row.Title}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('Position', this.state.Position, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Grade">Grade</InputLabel>
											<Select
												value={this.state.grade}
												onChange={this.handleChange}
												inputProps={{
													name: 'grade',
													id: 'grade',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>

												{this.state.gradeList.map(row => (
													<MenuItem value={row.Id}>{row.Code}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('grade', this.state.grade, 'required')}
									</Grid>


									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
										<TextField id="standard-basic" value={this.state.Contact} fullWidth label="Contact" onChange={this.handleChange} name="Contact" />
										{this.validator.message('Contact', this.state.Contact, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} >
										<TextField id="standard-basic" value={this.state.Address} fullWidth label="Address" onChange={this.handleChange} name="Address" />
										{this.validator.message('Address', this.state.Address, 'required')}
									</Grid>

								</form>
								<div className="row" >
									<Grid item xs={12} sm={10}  >
										<div style={{ float: "right", "marginRight": "8px" }}>

											<Button style={{ "marginBottom": "10px" }} variant="outlined" color="secondary" className={classes.button} onClick={() => this.nextTab(2)}>
												Next
      								</Button>
										</div>
									</Grid>

								</div>
							</TabContainer>
							<TabContainer dir={theme.direction}>
								<h4>Add New Account</h4>
								<form className={classes.container} noValidate autoComplete="off">
									<Grid item xs={12} sm={5} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Bank">Bank</InputLabel>
											<Select
												value={this.state.Bank}
												onChange={this.handleChange}
												inputProps={{
													name: 'Bank',
													id: 'Bank',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.bankList.map(row => (
													<MenuItem value={row.Id}>{row.BankName}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('Bank', this.state.Bank, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="ContractType">Currency</InputLabel>
											<Select
												value={this.state.Currency}
												onChange={this.handleChange}
												inputProps={{
													name: 'Currency',
													id: 'Currency',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.currencyList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('Currency', this.state.Currency, 'required')}

									</Grid>

									<Grid item xs={12} sm={5} >

										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="ContractType">Is Primary</InputLabel>
											<Select
												value={this.state.IsPrimary}
												onChange={this.handleChange}
												inputProps={{
													name: 'IsPrimary',
													id: 'IsPrimary',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												<MenuItem value="1">Yes</MenuItem>
												<MenuItem value="0">No</MenuItem>

											</Select>
										</FormControl>
										{this.validator.message('IsPrimary', this.state.IsPrimary, 'required')}
									</Grid>

									<Grid item xs={12} sm={5} >
										<TextField
											id="date"
											label="Effective Date"
											type="date"
											name="EffectiveDate"
											value={this.state.EffectiveDate}
											fullWidth
											className={classes.textField}
											onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('EffectiveDate', this.state.EffectiveDate, 'required')}
									</Grid>

									<Grid item xs={12} sm={5} >
										<TextField
											id="outlined-name"
											label="IBAN"
											className={classes.textField}
											value={this.state.IBAN}
											name="IBAN"
											fullWidth
											onChange={this.handleChange}
											margin="normal"
										//variant="outlined"
										/>
										{this.validator.message('IBAN', this.state.IBAN, 'required')}

									</Grid>
								</form>
								<div className="row" style={{ "marginBottom": "10px" }} >
									<div style={{ float: "left", "marginLeft": "8px" }}>

										<Button style={{ "marginBottom": "10px" }} variant="outlined" color="secondary" className={classes.button} onClick={() => this.nextTab(1)}>
											Previous
  										</Button>
									</div>
									<div style={{ float: "right", "marginRight": "8px" }}>

										<Button style={{ "marginBottom": "10px" }} variant="outlined" color="secondary" className={classes.button} onClick={() => this.nextTab(3)}>
											Next
      									</Button>
									</div>
								</div>
							</TabContainer>

							<TabContainer dir={theme.direction}>
								<h4>Employee PayRoll</h4>
								<form className={classes.container} noValidate autoComplete="off">

									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}  >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="ContractType">Pay Elements</InputLabel>
											<Select
												value={this.state.PayElement}
												onChange={this.handleChange}
												inputProps={{
													name: 'PayElement',
													id: 'PayElement',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.payElements.map(row => (
													<MenuItem value={row.Id}>{row.Code}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('PayElement', this.state.PayElement, 'required')}

									</Grid>

									<Grid item xs={12} sm={5}  >
										<TextField id="amount" fullWidth label="amount" name="amount" value={this.state.amount} onChange={this.handleChange} />
										{this.validator.message('amount', this.state.amount, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Currency">Currency</InputLabel>
											<Select
												value={this.state.PayRollCurrency}
												onChange={this.handleChange}
												inputProps={{
													name: 'PayRollCurrency',
													id: 'PayRollCurrency',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.currencyList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('PayRollCurrency', this.state.PayRollCurrency, 'required')}

									</Grid>

									<Grid item xs={12} sm={5} >
										<TextField
											id="date"
											label="Start Date"
											type="date"
											fullWidth
											value={this.state.payrollStartDate}
											name="payrollStartDate"
											onChange={this.handleChange}
											className={classes.textField}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('payrollStartDate', this.state.payrollStartDate, 'required')}

									</Grid>

									<Grid item xs={12} sm={5} >
										<TextField
											id="date"
											label="End Date"
											type="date"
											fullWidth
											value={this.state.payrollEndDate}
											name="payrollEndDate"
											onChange={this.handleChange}
											className={classes.textField}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('payrollEndDate', this.state.payrollEndDate, 'required')}

									</Grid>

								</form>
								<div className="row">
									<div style={{ float: "right", "marginRight": "8px" }}>

										<IconButton className={classes.button} aria-label="Add" onClick={this.AddPayRoll} >
											<AddIcon />
										</IconButton>
									</div>
								</div>
								<div className="row">

									<Table className={classes.table}>
										<TableHead>
											<TableRow>

												<CustomTableCell align="center" >Pay Element</CustomTableCell>
												<CustomTableCell align="center" >Ammount</CustomTableCell>
												<CustomTableCell align="center" >Currency</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.PayRoll.map(row => (
												<TableRow className={classes.row} key={row.Id}>
													<CustomTableCell align="center">{row.PayelementId}</CustomTableCell>
													<CustomTableCell align="center">{row.value}</CustomTableCell>
													<CustomTableCell align="center">{row.Currency}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} aria-label="Delete" onClick={() => this.deleteRow(row.PayRollCurrency)} >
															<DeleteIcon />
														</IconButton>
													</CustomTableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
								<div className="row" style={{ "marginBottom": "10px" }} >
									<Grid item xs={12} sm={12}  >
										<div style={{ float: "left", "marginLeft": "8px" }}>
											<Button style={{ "marginBottom": "10px" }} variant="outlined" color="secondary" className={classes.button} onClick={() => this.nextTab(2)}>
												Previous
  											</Button>
										</div>
										<div style={{ float: "right", "marginRight": "8px" }}>
											<Button style={{ "marginBottom": "10px" }} variant="outlined" color="secondary" className={classes.button} onClick={() => this.nextTab(4)}>
												Next
      									</Button>
										</div>
									</Grid>
								</div>
							</TabContainer>

							<TabContainer dir={theme.direction}>
								<h4>Applicable Laws</h4>
								<form className={classes.container} noValidate autoComplete="off">

									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}  >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="ContractType">Country Laws</InputLabel>
											<Select
												value={this.state.lawId}
												onChange={this.handleChange}
												inputProps={{
													name: 'lawId',
													id: 'lawId',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.lawsList.map(row => (
													<MenuItem value={row.Id}>{row.Detail}</MenuItem>
												))}
											</Select>
										</FormControl>
										{this.validator.message('lawId', this.state.lawId, 'required')}

									</Grid>


								</form>
								<div className="row">
									<div style={{ float: "right", "marginRight": "8px" }}>

										<IconButton className={classes.button} aria-label="Add" onClick={this.addLaw} >
											<AddIcon />
										</IconButton>
									</div>
								</div>
								<div className="row">

									<Table className={classes.table}>
										<TableHead>
											<TableRow>

												<CustomTableCell align="center" >Law</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.selectedLaws.map(row => (
												<TableRow className={classes.row} key={row.LawId}>
													<CustomTableCell align="center">{row.LawId}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} aria-label="Delete" onClick={() => this.deleteLawRow(row.LawId)} >
															<DeleteIcon />
														</IconButton>
													</CustomTableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
								<div className="row">
									<Grid item xs={12} sm={12}  >
									<div style={{ float: "left", "marginLeft": "8px" }}>
											<Button style={{ "marginBottom": "10px" }} variant="outlined" color="secondary" className={classes.button} onClick={() => this.nextTab(3)}>
												Previous
  											</Button>
										</div>
										<div style={{ float: "right", "marginRight": "8px" }}>
											<Button variant="outlined" color="secondary" className={classes.button} onClick={this.insertUpdateEmployee} >
												{this.state.Action}
											</Button>
										</div>
									</Grid>
								</div>
							</TabContainer>
						</SwipeableViews>
					</div>
				}
			/>
		)
	}
}
export default withStyles(styles, { withTheme: true })(Employee);