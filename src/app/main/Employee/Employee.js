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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Icon, Input, MuiThemeProvider} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Lookups } from '../../services/constant/enum'
import defaultUrl from "../../../app/services/constant/constant";
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
	formControl:{
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
function createData(Cnic, Name , Email  , Unit , position) {
	id += 1;
	return { Cnic, Name , Email ,  Unit , position };
}

const rows = [
	createData('61101345656','Salman',  'chirfan521@gmail.com' ,  'IT' , 'Manager'),
	createData('61101345656','Salman',  'chirfan521@gmail.com' ,  'IT' , 'Manager'),
	createData('61101345656','Salman', 'chirfan521@gmail.com' ,  'IT' , 'Manager'),
	createData('61101345656','Salman', 'chirfan521@gmail.com' , 'IT' , 'Manager'),
	createData('61101345656','Salman',  'chirfan521@gmail.com' ,  'IT' , 'Manager'),
	
	

];

class Employee extends Component {
	state = {
		firstName:"",
		lastName:"",
		dateOfBirth:"",
		email:"",
		employeeCode:"",
		insuranceId:"",
		texationId:"",
		texationId:"",
		PartTime:"",
		cnic:"",
		value: 0,
		Gender:'',
		Status:'',
		Country:'',
		ContractType:'',
		EmployeeStatus:'',
		company:"",
		Position:"",
		grade:"",
		Companies:[],
		companyList:[],
		genderList:[],
		countryList:[],
		maritallist:[],
		contractTypeList:[],
		statusList:[],
		parttimeList:[],
		positionList:[],
		gradeList:[]
	};
	componentDidMount() {
		this.getGender();
		this.getCountry();
		this.getMaritalStatus();
		this.getContractType();
		this.getEmployeeStatus();
		this.getPartTime();
		this.getCompanyDetail();
	}
	handleTabChange = (event, value) => {
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });

	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		if(e.target.name=="company")
		{
			this.getPosition(e.target.value);
			this.getGrades(e.target.value);
		}
	};
	getMaritalStatus= () => {
		axios({
			method: "get",
			url: defaultUrl +"/lookups/"+Lookups.marital_Status,
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
			url: defaultUrl +"/lookups/"+Lookups.gender,
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
			url: defaultUrl +"/lookups/"+Lookups.Country,
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
			url: defaultUrl +"/lookups/"+Lookups.Contract_Type,
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
			url: defaultUrl +"/lookups/"+Lookups.EmployeeStatus,
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
	getCompanyDetail=()=>{
		axios({
			method: "get",
			url: "http://localhost:3000/api/company",
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Companies:response.data});
			})
			.catch((error) => {
				console.log(error);
			})
	  }
	
	getPartTime=()=>{
		
		axios({
			method: "get",
			url: defaultUrl +"/lookups/"+Lookups.parttime,
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
			url: defaultUrl+"position/ByCompany/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data);
				this.setState({
					positionList:response.data
				});

			})
			.catch((error) => {
				console.log(error);
			})
	}
	getGrades = (id) => {
	
		axios({
			method: "get",
			url: defaultUrl+"Grades/ByCompany/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data);
				this.setState({
					gradeList:response.data
				});

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
								<Button variant="contained"  color="secondary" style={{'marginRight':'2px'}} className={classes.button}>
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
												<CustomTableCell align="center">Unit</CustomTableCell>
												{/* <CustomTableCell align="center">Job</CustomTableCell> */}
												<CustomTableCell align="center">Position</CustomTableCell>
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
											{rows.map(row => (
												<TableRow className={classes.row} key={row.id}>

													<CustomTableCell align="center">{row.Cnic}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Name}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Email}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Unit}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">{row.position}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} aria-label="Edit">
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
								
								<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									 <TextField id="standard-basic" fullWidth label="First Name" name="firstName" onChange={this.handleChange} />
									</Grid>
									<Grid item xs={12} sm={5}>
									<TextField id="standard-basic" fullWidth label="Last Name" name="lastName" onChange={this.handleChange} />

									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
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
									</Grid>
                               
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
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
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField
										id="date"
										label="Date of Birth"
										type="date"
										fullWidth
										name="dateOfBirth"
										className={classes.textField}
										onChange={this.handleChange}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									</Grid>
									
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									<TextField id="standard-basic" fullWidth label="Email" onChange={this.handleChange} name="email" />

									</Grid>
								
									<Grid item xs={12} sm={5}   >
									<TextField id="standard-basic" fullWidth label="Employee Cdoe" name="employeeCode" onChange={this.handleChange} />

									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									<TextField id="standard-basic" fullWidth label="Insurance Id" name="insuranceId" onChange={this.handleChange} />
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField id="standard-basic" fullWidth label="Texation Id" onChange={this.handleChange} name="texationId" />
									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									<TextField id="standard-basic" fullWidth label="Cnic" onChange={this.handleChange} name="cnic" />

									</Grid>
									<Grid item xs={12} sm={5}   >
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
									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
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
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField
										id="date"
										label="Hire Date"
										type="date"
										fullWidth
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									
									<TextField id="standard-basic" value={this.state.reason} fullWidth label="Cnic" onChange={this.handleChange} name="reason" />
									</Grid>
									<Grid item xs={12} sm={5}   >
											<FormControl className={classes.formControl}>
										<InputLabel htmlFor="ContractType">PartTime Situation</InputLabel>
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
									</Grid>
									<Grid item xs={12} sm={5}   style={{marginRight:'5px'}}  >
											<TextField
										id="date"
										label="Service Start Date"
										type="date"
										fullWidth
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									</Grid>
									<Grid item xs={12} sm={5}   >
										<TextField
										id="date"
										label="Probation End Date"
										type="date"
										fullWidth
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									</Grid>
								
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									
									<TextField id="standard-basic" type="number" value={this.state.parttime} fullWidth label="Part Time Percentage" onChange={this.handleChange} name="parttime" />
									</Grid>
									<Grid item xs={12} sm={5}   >
										<TextField
										id="date"
										label="Contract End Date"
										type="date"
										fullWidth
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									</Grid>
									<Grid item xs={12} sm={5}  >
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
									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
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
											<MenuItem value='1'>pkr</MenuItem>
											<MenuItem value='2'>usd</MenuItem>
										</Select>
									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
										<FormControl className={classes.formControl}>
										<InputLabel htmlFor="SalaryStatus">Salary Status</InputLabel>
										<Select
											value={this.state.SalaryStatus}
											onChange={this.handleChange}
											inputProps={{
												name: 'SalaryStatus',
												id: 'SalaryStatus',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='Active'>Active</MenuItem>
											<MenuItem value='Deactive'>Deactive</MenuItem>
										</Select>
									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}  >
										<FormControl className={classes.formControl}>
										<InputLabel htmlFor="PaymentMethod">Payment Method</InputLabel>
										<Select
											value={this.state.PaymentMethod}
											onChange={this.handleChange}
											inputProps={{
												name: 'PaymentMethod',
												id: 'PaymentMethod',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>By Hand</MenuItem>
											<MenuItem value='2'>By Bank</MenuItem>
										</Select>
									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
										<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Social">Social Security</InputLabel>
										<Select
											value={this.state.Social}
											onChange={this.handleChange}
											inputProps={{
												name: 'Social',
												id: 'Social',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>Social1</MenuItem>
											<MenuItem value='2'>Social2</MenuItem>
										</Select>
									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5} >
										<FormControl className={classes.formControl}>
										<InputLabel htmlFor="taxation">Applicable taxation</InputLabel>
										<Select
											value={this.state.taxation}
											onChange={this.handleChange}
											inputProps={{
												name: 'taxation',
												id: 'taxation',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>tax 1</MenuItem>
											<MenuItem value='2'>tax 2</MenuItem>
										</Select>
									</FormControl>
									</Grid>
									
								</form>
								<div className="row">
								<Grid item xs={12} sm={10}  >
									<div style={{float: "right","marginRight":"8px"}}>
									
									<Button variant="outlined" color="secondary" className={classes.button }>
										Insert Record
      								</Button>
									</div>
								</Grid>
									
								</div>
							</TabContainer>
							<TabContainer dir={theme.direction}>
							<h4>Add New Account</h4>
								<form className={classes.container} noValidate autoComplete="off">
								<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Employee">Employee</InputLabel>
										<Select
											value={this.state.Employee}
											onChange={this.handleChange}
											inputProps={{
												name: 'Employee',
												id: 'Employee',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>Employee1</MenuItem>
											<MenuItem value='2'>Employee2</MenuItem>
										</Select>
									</FormControl>
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
											<MenuItem value='1'>Bank1</MenuItem>
											<MenuItem value='2'>Bank2</MenuItem>
										</Select>
									</FormControl>
									<TextField
										id="outlined-name"
										label="IBAN"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="Currency"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
										<TextField
										id="date"
										label="Effective Date"
										type="date"
										fullWidth
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
                                    <TextField
										id="outlined-name"
										label="IsPrimary"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
								</form>
								<div className="row">
									<div style={{float: "right","marginRight":"8px"}}>
									
									<Button variant="outlined" color="secondary" className={classes.button }>
										Insert Record
      								</Button>
									</div>
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



// import Grid from '@material-ui/core/Grid';



// export default function Employee() {
  

//   return (
//     <div >
// 			
// 					<div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper >xs=12</Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper >xs=12 sm=6</Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper >xs=12 sm=6</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper >xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper >xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper >xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper >xs=6 sm=3</Paper>
//         </Grid>
//       </Grid>
//     </div>

				

	
//   );
// }
