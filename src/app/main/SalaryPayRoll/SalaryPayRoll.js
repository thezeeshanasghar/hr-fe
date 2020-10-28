
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
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Icon, Input, MuiThemeProvider} from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import toastr from 'toastr';
import {Lookups} from '../../services/constant/enum'
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import defaultUrl from "../../services/constant/constant";
import Checkbox from '@material-ui/core/Checkbox';
import Messages from '../toaster';
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
		Date:"",
		Action:"Generate",
		Id:0,
		companyId:"",
		companyList:[],
		type:"",
		employeeList:[],
		employeeIds:[],
		table:null,
		File:"",
		datefrom:"",
		dateto:""
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();

	}
	
	componentDidMount() {
		this.getCompanyDetail();
		this.getSalaryPayRoll();
	}
	getSalaryPayRoll=()=>{
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
	InsertSalaryPayRoll=()=>{

		if(this.state.type=="Regular"){
			if (!this.validator.fieldValid('companyId') || !this.validator.fieldValid('type') || !this.validator.fieldValid('Date') || !this.validator.fieldValid('employeeIds') ) {
				this.validator.showMessages();
				this.forceUpdate();
			
			}else{
				var method = "post";
				var url = defaultUrl+"payslip";

				var obj = {
					CompanyId: this.state.companyId,
					EmployeesIds: this.state.employeeIds.toString(),
					PayMonth: this.state.Date,
					SalaryType: this.state.type,
					dateFrom:this.state.datefrom,
					dateTo:this.state.dateto,
					File:this.state.File
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
						this.getExchangeRate();
						this.setState({
							companyId: "",
							employeeIds: [],
							Date: "",
							type: "",
							Id:0
						});
					})
					.catch((error) => {
						console.log(error);
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.error('Operation unsuccessfull');
						this.setState({
							companyId: "",
							employeeIds: [],
							Date: "",
							type: "",
							Id:0
						})
					})
	
			}
		}else if(this.state.type=="OffCycle"){
			if (!this.validator.fieldValid('companyId') || !this.validator.fieldValid('type') || !this.validator.fieldValid('Date') || !this.validator.fieldValid('employeeIds') 
			|| !this.validator.fieldValid('datefrom') || !this.validator.fieldValid('dateto')) {
				this.validator.showMessages();
				this.forceUpdate();
			
			}else{
				var method = "post";
				var url = defaultUrl+"payslip";

				var obj = {
					CompanyId: this.state.companyId,
					EmployeesIds: this.state.employeeIds.toString(),
					PayMonth: this.state.Date,
					SalaryType: this.state.type,
					dateFrom:this.state.datefrom,
					dateTo:this.state.dateto,
					File:this.state.File
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
						this.getExchangeRate();
						this.setState({
							companyId: "",
							employeeIds: [],
							Date: "",
							type: "",
							Id:0
						});
					})
					.catch((error) => {
						console.log(error);
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.error('Operation unsuccessfull');
						this.setState({
							companyId: "",
							employeeIds: [],
							Date: "",
							type: "",
							Id:0
						})
					})
	
			}
		}
		else if(this.state.type=="Bonus")
		{
			if (!this.validator.fieldValid('companyId') || !this.validator.fieldValid('type') || !this.validator.fieldValid('File')) {
				this.validator.showMessages();
				this.forceUpdate();
			
			}else{
				var method = "post";
				var url = defaultUrl+"payslip";

				var obj = {
					CompanyId: this.state.companyId,
					EmployeesIds: this.state.employeeIds.toString(),
					PayMonth: this.state.Date,
					SalaryType: this.state.type,
					dateFrom:this.state.datefrom,
					dateTo:this.state.dateto,
					File:this.state.File
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
							employeeIds: [],
							Date: "",
							type: "",
							Id:0
						});
					})
					.catch((error) => {
						console.log(error);
						// document.getElementsByClassName("loader-wrapper")[0].style.display="none"
						toastr.error('Operation unsuccessfull');
						this.setState({
							companyId: "",
							employeeIds: [],
							Date: "",
							type: "",
							Id:0
						})
					})
	
			}
		}
		
	}
	
	handleTabChange = (event, value) => {
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });

	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name == "companyId") {
			this.getEmployeeDetail(e.target.value);
		}
		
		if(e.target.name=="File")
		{
		  if(e.target.files[0]==undefined)
		  {
			this.setState({File:""});
			return false;
		  }
		  var extension=e.target.files[0].name.split(".")[1];
		  if(extension.toLowerCase()!="xlsx" )
		  {
			  Messages.warning("Invalid valid formate");
			return false;
		  }
		//   document.getElementById("fuse-splash-screen").style.display="block";
		  const formData = new FormData();
		  formData.append("file" , e.target.files[0]);
		  axios.post(defaultUrl+"/Upload", formData, {
 		 headers: {
    		'accept': 'application/json',
    		'Accept-Language': 'en-US,en;q=0.8',
   			 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  			}
		})
 		 .then((response) => {
  		  console.log("success",response);
			this.setState({File:response.data});
			Messages.success();
			// document.getElementById("fuse-splash-screen").style.display="none";
		  }).catch((error) => {
			console.log("error",error);
			Messages.error();
			// document.getElementById("fuse-splash-screen").style.display="none";
  		  });
		}
	};
	getCompanyDetail=()=>{
		axios({
			method: "get",
			url: defaultUrl+"company",
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({companyList:response.data.data});
			})
			.catch((error) => {
				console.log(error);
			})
	  }
	  getEmployeeDetail=(id)=>{
		axios({
			method: "get",
			url: defaultUrl+"employee/bycompany/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({employeeList:response.data});
			})
			.catch((error) => {
				console.log(error);
			})
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
										<InputLabel htmlFor="company">Company</InputLabel>
										<Select
											value={this.state.companyId}
											onChange={this.handleChange}
											//onChange={this.getEmployeeDetail()}
											inputProps={{
												name: 'companyId',
												id: 'companyId',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											
											{this.state.companyList.map(row => (
													<MenuItem value={row.Id}>{row.CompanyName}</MenuItem>
												))} 
										</Select>
										{this.validator.message('companyId', this.state.companyId, 'required')}
									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="type">Type</InputLabel>
										<Select
											value={this.state.type}
											onChange={this.handleChange}
											inputProps={{
												name: 'type',
												id: 'type',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											
													<MenuItem value="Regular">Regular</MenuItem>
													<MenuItem value="OffCycle">OffCycle Regular</MenuItem>
													<MenuItem value="Bonus">Bonus</MenuItem>
												
										</Select>
										{this.validator.message('type', this.state.type, 'required')}

									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type!="Bonus"?"":"d-none"} >
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="employee">Employee</InputLabel>
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
										</Select>
										{this.validator.message('employeeIds', this.state.employeeIds, 'required')}

									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type!="Bonus"?"":"d-none"}  >
								
									<TextField id="Date" fullWidth label="Date" type="date" name="Date"  value={this.state.Date}  onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									{this.validator.message('Date', this.state.Date, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type=="OffCycle"?"":"d-none"}  style={{ "marginRight": "5px" }} >
									<TextField type="date" id="datefrom" fullWidth label="Payment Date From" InputLabelProps={{
												shrink: true,
											}}
											 name="datefrom"  onChange={this.handleChange} />
									{this.validator.message('datefrom', this.state.datefrom, 'required')}
									</Grid>
									
									<Grid item xs={12} sm={5} className={this.state.type=="OffCycle"?"":"d-none"}  >
									<TextField type="date" id="dateto" fullWidth label="Payment Date To" InputLabelProps={{
												shrink: true,
											}}
											 name="dateto"  onChange={this.handleChange} />
									{this.validator.message('dateto', this.state.dateto, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} className={this.state.type=="Bonus"?"":"d-none"}  >
									<TextField type="file" id="File" fullWidth label="Payment Details" InputLabelProps={{
												shrink: true,
											}}
											 name="File"  onChange={this.handleChange} />
									{this.validator.message('File', this.state.File, 'required')}
									</Grid>
									
								</form>
								<div className="row">
								<Grid item xs={12} sm={10}  >
									<div style={{ float: "right", "marginRight": "8px", "marginTop": "2px", "marginBottom": "2px" }}>

										<Button variant="outlined" color="secondary" className={classes.button} onClick={this.InsertSalaryPayRoll} >
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

export default withStyles(styles, { withTheme: true })(SalaryPayRoll);