
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
import VerifyIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Icon, Input, MuiThemeProvider } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import toastr from 'toastr';
import { Lookups } from '../../services/constant/enum'
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import defaultUrl from "../../services/constant/constant";
import Checkbox from '@material-ui/core/Checkbox';
import Messages from '../toaster';
import $ from 'jquery';
import DataTable from "datatables.net";
import * as responsive from "datatables.net-responsive";
import AsyncSelect from 'react-select/lib/Async'
import Select from 'react-select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]
const styles = theme => ({
	root: {
		height: 300,
		flexGrow: 1,
		minWidth: 300,
		transform: 'translateZ(0)',
		// The position fixed scoping doesn't work in IE 11.
		// Disable this demo to preserve the others.
		'@media all and (-ms-high-contrast: none)': {
			display: 'none',
		},
	},
	modal: {
		display: 'flex',
		// padding: theme.spacing(1),
		alignItems: 'center',
		justifyContent: 'center',

	},
	paper: {
		height: "500px",
		width: "80%",
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		overflowY: "scroll"
		// padding: theme.spacing(2, 4, 3),
	},

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
		margin: theme.spacing.unit,
		minWidth: "99%",
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
function createData(Currency, Rate, ToCurrency, EffectiveDate) {
	id += 1;
	return { Currency, Rate, ToCurrency, EffectiveDate };
}

const rows = [
	createData('$', 165, 'PKR', '07/23/2020')

];


class SalaryPayRoll extends Component {
	state = {
		value: 0,
		Date: "",
		Action: "Generate",
		Id: 0,
		companyName: "",
		companyId: "",
		companyList: [],
		type: "",
		employeeList: [],
		employeeIds: "",
		employeeSelected: "",
		table: null,
		File: "",
		datefrom: "",
		dateto: "",
		CompanySelected: "",
		TypeSelected: "",
		Dates: [],
		payroles: [],
		PaymentDetail: [],
		PayElementList: [],
		PayElement: "",
		PayElementSelected: "",
		logs:[],
		Isdisplay:"0",
		typeList: [
			{ "value": "Regular", "label": "Regular" },
			{ "value": "OffCycle", "label": "OffCycle" },
			{ "value": "Bonus", "label": "Bonus" }
		]
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();

	}

	hidemodel=()=>{
		this.setState({Isdisplay:0});
	}
	loadOptions = (inputValue, callback) => {

		setTimeout(() => {
			callback(this.filterColors(inputValue));
		}, 1000);
	};
	GetCompanyMonthlyPayment = (group) => {
		this.setState({ 'PaymentDetail': this.state.payroles.filter(x => x.PayGroup == group && x.CompanyId == this.state.companyId) })
		
	}
	reversePayroll = (group) => {
		var obj = {
			GroupName: group,
			Company: this.state.companyId
		};
		
		var check=window.confirm("do you want to reverse this payroll of date:"+group)
if(check==true){
axios({
			method: "post",
			url: defaultUrl + "payslip/reversePayroll",
			data: JSON.stringify(obj),
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {

			})
			.catch((error) => {
				console.log(error);
			})	
}
		
	}
	getPayElements = (id) => {
		axios({
			method: "get",
			url: defaultUrl + "payelement/Selective/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				this.setState({ PayElementList: response.data })
			})
			.catch((error) => {
				console.log(error);
			})
	}
	loadCompanyData = (val) => {
		axios({
			method: "get",
			url: defaultUrl + "payslip",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				if (response.data) {
					console.log(response.data)
					var data = response.data.data.filter(x => x.CompanyId == val);
					var dates = [...new Set(data.map(x => x.Paidon))]
					this.setState({  payroles: response.data.data });
					console.log(dates);
				} else {
					this.setState({ Dates: [] });
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}
	componentDidMount() {

		// this.getCompanyDetail();
		this.getSalaryPayRoll();


	}
	getSalaryPayRoll = () => {
		localStorage.removeItem("ids");
		if (!$.fn.dataTable.isDataTable('#PayRoll_Table')) {
			this.state.table = $('#PayRoll_Table').DataTable({
				ajax: defaultUrl + "payslip",
				"columns": [
					{ "data": "FirstName" },
					{ "data": "payables" },
					{ "data": "taxdeduction" },
					{ "data": "leavededuct" },
					{ "data": "paid" },
					{ "data": "PayRollType" },
					// 	{ "data": "Action",
					// 	sortable: false,
					// 	"render": function ( data, type, full, meta ) {

					// 		return `<input type="checkbox" name="radio"  value=`+full.Id+`
					// 		onclick=" const checkboxes = document.querySelectorAll('input[name=radio]:checked');
					// 					let values = [];
					// 					checkboxes.forEach((checkbox) => {
					// 						values.push(checkbox.value);
					// 					});
					// 					localStorage.setItem('ids',values);	"
					// 		/>`;
					// 	}
					//  }

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
	InsertSalaryPayRoll = () => {

		console.log(this.state)
		if (this.state.type == "Regular") {
			if (!this.validator.fieldValid('companyId') || !this.validator.fieldValid('type') || !this.validator.fieldValid('Date') || !this.validator.fieldValid('employeeIds') || !this.validator.fieldValid('PayElement')) {
				this.validator.showMessages();
				this.forceUpdate();
				console.log("error")
			} else {
				console.log("working")
				var method = "post";
				var url = defaultUrl + "payslip";

				var obj = {
					CompanyId: this.state.companyId,
					EmployeesIds: this.state.employeeIds.slice(0, -1).toString(),
					PayMonth: this.state.Date,
					SalaryType: this.state.type,
					dateFrom: this.state.datefrom,
					dateTo: this.state.dateto,
					File: this.state.File,
					PayElement: this.state.PayElement
				};
				axios.interceptors.request.use(function (config) {
					// document.getElementsByClassName("loader-wrapper")[0].style.display="block"
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
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						console.log(response);
						
						
						this.setState({
							companyId: "",
							employeeIds: "",
							Date: "",
							type: "",
							Id: 0,
							employeeSelected: "",
							CompanySelected: "",
							TypeSelected: "",
							PayElementSelected: "",
							logs:response.data.data.recordset,
							Isdisplay:"1",
							Dates:[]
						});
						toastr.success('PayRoll Executed');
					})
					.catch((error) => {
						console.log(error);
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.error('Operation unsuccessfull');
						this.setState({
							companyId: "",
							employeeIds: "",
							Date: "",
							type: "",
							Id: 0,
							employeeSelected: "",
							CompanySelected: "",
							TypeSelected: "",
							PayElementSelected: "",
							Dates:[]
						})
					})

			}
		} else if (this.state.type == "OffCycle") {
			if (!this.validator.fieldValid('companyId') || !this.validator.fieldValid('type') || !this.validator.fieldValid('Date') || !this.validator.fieldValid('employeeIds')
				|| !this.validator.fieldValid('datefrom') || !this.validator.fieldValid('dateto') || !this.validator.fieldValid('PayElement')) {
				this.validator.showMessages();
				this.forceUpdate();

			} else {
				var method = "post";
				var url = defaultUrl + "payslip";

				var obj = {
					CompanyId: this.state.companyId,
					EmployeesIds: this.state.employeeIds.slice(0, -1).toString(),
					PayMonth: this.state.Date,
					SalaryType: this.state.type,
					dateFrom: this.state.datefrom,
					dateTo: this.state.dateto,
					File: this.state.File,
					PayElement: this.state.PayElement
				};
				axios.interceptors.request.use(function (config) {
					// document.getElementsByClassName("loader-wrapper")[0].style.display="block"
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
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.success('Operation successfull');
						this.setState({
							companyId: "",
							employeeIds: "",
							Date: "",
							type: "",
							Id: 0,
							employeeSelected: "",
							CompanySelected: "",
							TypeSelected: "",
							PayElementSelected: "",
							Dates:[]
						});
					})
					.catch((error) => {
						console.log(error);
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.error('Operation unsuccessfull');
						this.setState({
							companyId: "",
							employeeIds: "",
							Date: "",
							type: "",
							Id: 0,
							employeeSelected: "",
							CompanySelected: "",
							TypeSelected: "",
							PayElementSelected: "",
							Dates:[]
						})
					})

			}
		}
		else if (this.state.type == "Bonus") {
			if (!this.validator.fieldValid('companyId') || !this.validator.fieldValid('type') || !this.validator.fieldValid('File')) {
				this.validator.showMessages();
				this.forceUpdate();

			} else {
				var method = "post";
				var url = defaultUrl + "payslip";

				var obj = {
					CompanyId: this.state.companyId,
					EmployeesIds: this.state.employeeIds.slice(0, -1).toString(),
					PayMonth: this.state.Date,
					SalaryType: this.state.type,
					dateFrom: this.state.datefrom,
					dateTo: this.state.dateto,
					File: this.state.File
				};
				axios.interceptors.request.use(function (config) {
					// document.getElementsByClassName("loader-wrapper")[0].style.display="block"
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
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.success('Operation successfull');
						this.setState({
							companyId: "",
							employeeIds: "",
							Date: "",
							type: "",
							Id: 0,
							employeeSelected: "",
							CompanySelected: "",
							TypeSelected: "",
							Dates:[]
						});
					})
					.catch((error) => {
						console.log(error);
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.error('Operation unsuccessfull');
						this.setState({
							companyId: "",
							employeeIds: "",
							Date: "",
							type: "",
							Id: 0,
							employeeSelected: "",
							CompanySelected: "",
							TypeSelected: "",
							Dates:[]
						})
					})

			}
		}

	}
	handlePayelementChange = (e) => {
		var PayElements = "";
		for (var i = 0; i < e.length; i++) {
			PayElements += e[i].value + ','
		}
		this.setState({ 'PayElement': PayElements.slice(0, -1), PayElementSelected: e.value });
	}
	handleTabChange = (event, value) => {
		this.setState({ value });
		this.getCompanyDetail();
		this.setState({ [event.target.name]: event.target.value });

	};
	handledropdown = (e) => {
		console.log(e, 'afdhsgfjhsdgfjhsdg')

		this.setState({ 'companyId': e.value, employeeIds: "", 'CompanySelected': e, PaymentDetail: [] });
		this.getPayElements(e.value)
		this.getEmployeeDetail(e.value);
		this.loadCompanyData(e.value);
		this.getSelectivePayrolls(e.value)
	}
	handleetypeChange = (e) => {
		this.setState({ 'type': e.value, 'TypeSelected': e });

	}
	handleEmployeedropdown = (e) => {

		var employees = "";
		for (var i = 0; i < e.length; i++) {
			employees += e[i].value + ','
		}
		this.setState({ 'employeeIds': employees, employeeSelected: e.value });
	}
	handleChange = (e) => {
		console.log(e)
		this.setState({ [e.target.name]: e.target.value });

		if (e.target.name == "File") {
			if (e.target.files[0] == undefined) {
				this.setState({ File: "" });
				return false;
			}
			var extension = e.target.files[0].name.split(".")[1];
			if (extension.toLowerCase() != "xlsx") {
				Messages.warning("Invalid valid formate");
				return false;
			}
			//   document.getElementById("fuse-splash-screen").style.display="block";
			const formData = new FormData();
			formData.append("file", e.target.files[0]);
			axios.post(defaultUrl + "/Upload", formData, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
				}
			})
				.then((response) => {
					console.log("success", response);
					this.setState({ File: response.data });
					Messages.success();
					// document.getElementById("fuse-splash-screen").style.display="none";
				}).catch((error) => {
					console.log("error", error);
					Messages.error();
					// document.getElementById("fuse-splash-screen").style.display="none";
				});
		}
	};
	getCompanyDetail = () => {
		axios({
			method: "get",
			url: defaultUrl + "company/Selective/data",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);

				this.setState({ companyList: response.data });
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getEmployeeDetail = (id) => {
		axios({
			method: "get",
			url: defaultUrl + "employee/selective/data/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ employeeList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getSelectivePayrolls = (id) => {
		axios({
			method: "get",
			url: defaultUrl + "payslip/specific/"+id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data.data);

				this.setState({ Dates: response.data.data  });
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			})
	}
	closeCurrent=(code)=>{
		if(window.confirm("do you want to close current payroll"))
		{
			axios({
				method: "get",
				url: defaultUrl + "payslip/status/closed/"+code,
				headers: {
					// 'Authorization': `bearer ${token}`,
					"Content-Type": "application/json;charset=utf-8",
				},
			})
				.then((response) => {
					console.log(response.data.data);
					this.getSelectivePayrolls(this.state.companyId);
				})
				.catch((error) => {
					console.log(error);
				})
		}
	}
	render() {
		const { classes, theme } = this.props;

		return (
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="p-24"><h4>Salary Payroll</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Salary PayRoll</h4></div>
				}
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
								<Tab label="Add New Salary PayRoll" />
							</Tabs>
						</AppBar>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}
						>
							<TabContainer dir={theme.direction}>
								<Paper className={classes.root}>
									<table id="PayRoll_Table" className="nowrap header_custom" style={{ "width": "100%" }}>
										<thead>
											<tr>
												<th>Name</th>
												<th>Payables</th>
												<th>taxdedutions</th>
												<th>leavededuct</th>
												<th>paid</th>
												<th>PayRollType</th>
												{/* <th>Action</th> */}
											</tr>
										</thead>

									</table>
								</Paper>
							</TabContainer>
							<TabContainer dir={theme.direction}>
								<form className={classes.container} noValidate autoComplete="off">
									<Grid item xs={12} sm={5} >
										<FormControl className={classes.formControl}>
									
											<Select

												name="companyId"
												options={this.state.companyList}
												value={this.state.CompanySelected}
												className="basic-multi-select"
												classNamePrefix="select"
												onChange={this.handledropdown}
											/>
											{this.validator.message('companyId', this.state.companyId, 'required')}
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}>
										<FormControl className={classes.formControl}>
											<Select
												name='type'
												id='type'
												options={this.state.typeList}
												className="basic-multi-select"
												classNamePrefix="select"
												value={this.state.TypeSelected}
												onChange={this.handleetypeChange}
											/>
											{this.validator.message('type', this.state.type, 'required')}

										</FormControl>

									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type != "Bonus" ? "" : "d-none"} style={{ marginRight: "5px" }} >
										<FormControl className={classes.formControl}>
											{/* <InputLabel htmlFor="employee">Employee</InputLabel>
											<Select
												multiple
												value={this.state.employeeIds}
												onChange={this.handleChange}
												input={<Input id="select-multiple-checkbox" />}
												renderValue={selected => selected.join(', ')}
												inputProps={{
													name: 'employeeIds',
													id: 'employeeIds',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>

												{this.state.employeeList.map(row => (
													<MenuItem value={row.Id}><Checkbox checked={this.state.employeeIds.indexOf(row.Id) > -1} />{row.FirstName}</MenuItem>
												))}
											</Select> */}
											<Select
												isMulti
												name="employeeIds"
												options={this.state.employeeList}
												className="basic-multi-select"
												classNamePrefix="select"
												value={this.state.employeeSelected}
												onChange={this.handleEmployeedropdown}
											/>
											{this.validator.message('employeeIds', this.state.employeeIds, 'required')}

										</FormControl>
									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type != "Bonus" ? "" : "d-none"} >
										<FormControl className={classes.formControl}>
											<Select
												isMulti
												name='PayElement'
												id='PayElement'
												options={this.state.PayElementList}
												className="basic-multi-select"
												classNamePrefix="select"
												value={this.state.PayElementSelected}
												onChange={this.handlePayelementChange}
											/>
											{this.validator.message('PayElement', this.state.PayElement, 'required')}

										</FormControl>

									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type != "Bonus" ? "" : "d-none"}  >

										<TextField id="Date" fullWidth label="Date" type="date" name="Date" value={this.state.Date} onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('Date', this.state.Date, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type == "OffCycle" ? "" : "d-none"} style={{ "marginRight": "5px" }} >
										<TextField type="date" id="datefrom" fullWidth label="Payment Date From" InputLabelProps={{
											shrink: true,
										}}
											name="datefrom" onChange={this.handleChange} />
										{this.validator.message('datefrom', this.state.datefrom, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type == "OffCycle" ? "" : "d-none"}  >
										<TextField type="date" id="dateto" fullWidth label="Payment Date To" InputLabelProps={{
											shrink: true,
										}}
											name="dateto" onChange={this.handleChange} />
										{this.validator.message('dateto', this.state.dateto, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type == "Bonus" ? "" : "d-none"}  >
										<TextField type="file" id="File" fullWidth label="Payment Details" InputLabelProps={{
											shrink: true,
										}}
											name="File" onChange={this.handleChange} />
										{this.validator.message('File', this.state.File, 'required')}
									</Grid>

									<Grid item xs={12} sm={10} style={{ marginBottom: "5px" }}  >
										<div style={{ float: "right", "marginRight": "8px", "marginTop": "2px", "marginBottom": "2px" }}>

											<Button variant="outlined" color="secondary" className={classes.button} onClick={this.InsertSalaryPayRoll} >
												{this.state.Action}
											</Button>

										</div>
									</Grid>

									<Grid item xs={12} sm={6}  >
										<div style={{ height: "500px", overflowY: "scroll", boxShadow: "0px 0px 4px gray", border: "solid 2px black", marginRight: "5px" }}>

											<List component="nav" className={classes.root} aria-label="contacts">
												{this.state.Dates.map(x =>
													<ListItem button onClick={() => this.GetCompanyMonthlyPayment(x.PayGroup)}>
														<ListItemText primary={'Group-' + x.PayGroup} /> 
														<ListItemText primary={'Generated on-' + x.paidon} /> 
														<ListItemText primary={'Status-' + x.Status} /> 
														<VerifyIcon onClick={()=>this.closeCurrent(x.PayGroup)} title="Mark as Closed" ></VerifyIcon>
														<button type="button"  onClick={() => this.closeCurrent(x.PayGroup)} >Close Payroll</button>
															
														<DeleteIcon onClick={() => this.reversePayroll(x.PayGroup)}  title="reverse payroll"></DeleteIcon> 
														<button type="button"  onClick={() => this.reversePayroll(x.PayGroup)} >Reverse Payroll</button>
													</ListItem>
												)}

											</List>

										</div>
									</Grid>
									<Grid item xs={12} sm={5}  >

										<div style={{ height: "500px", overflowY: "scroll", boxShadow: "0px 0px 4px gray", border: "solid 2px black" }}>
											{this.state.PaymentDetail.map(x =>
												<List component="nav" className={classes.root} aria-label="contacts">

													<ListItem button divider>
														<ListItemText primary={'Name:' + x.FirstName} />
													</ListItem>
													<ListItem button divider>
														<ListItemText primary={'paid:' + x.payables} />
													</ListItem>
													<ListItem button divider>
														<ListItemText primary={'Type:' + x.PayRollType} />
													</ListItem>
													<br></br>
												</List>
											)}
										</div>
									</Grid>
								</form>



							</TabContainer>
						</SwipeableViews>
						<Modal
							disablePortal
							disableEnforceFocus
							disableAutoFocus
							open={this.state.Isdisplay=="0"?false:true}
							aria-labelledby="server-modal-title"
							aria-describedby="server-modal-description"
							className={classes.modal}
						// container={() => rootRef.current}
						>
							<div className={classes.paper}>
								<Grid item xs={5} sm={5} style={{ marginTop: "5px" }} >
									<h2 id="server-modal-title">PayRoll Generation Logs	<Button variant="outlined" color="secondary" className={classes.button} onClick={this.hidemodel} >
										Close
											</Button></h2>
								</Grid>

								<ol>
								{this.state.logs.map(row=>(
									<li>{row.Detail}</li>
								))}
									

								</ol>

							</div>
						</Modal>
					</div>
				}
			/>
		)
	}
}

export default withStyles(styles, { withTheme: true })(SalaryPayRoll);