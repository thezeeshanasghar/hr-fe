
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
		employeeIds:[]
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();

	}
	
	componentDidMount() {
		this.getCompanyDetail();
		//this.getEmployeeDetail();
	}
	
	InsertSalaryPayRoll=()=>{
			if (!this.validator.allValid()) {
				this.validator.showMessages();
				this.forceUpdate();
			} else {
				var method = "post";
				var url = defaultUrl+"payslip";
				// if(this.state.Action !="Generate")
				// {
				// 	 method = "put";
				// 	 url = defaultUrl+"Currency/"+this.state.Id;
				// }
				// console.log(this.state.company,this.state.employee,this.state.dateFrom,this.state.dateTo);
				var obj = {
					CompanyId: this.state.companyId,
					EmployeesIds: this.state.employeeIds.toString(),
					PayMonth: this.state.Date,
					SalaryType: this.state.type
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
	
	handleTabChange = (event, value) => {
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });

	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name == "companyId") {
			this.getEmployeeDetail(e.target.value);
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
												<CustomTableCell align="center" >Employee</CustomTableCell>
												<CustomTableCell align="center" >Company</CustomTableCell>
												<CustomTableCell align="center">Date</CustomTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											
										</TableBody>
									</Table>
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
													<MenuItem value="Grouped">Grouped</MenuItem>
												
										</Select>
										{this.validator.message('type', this.state.type, 'required')}

									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5} >
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
									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}  >
								
									<TextField id="Date" fullWidth label="Date" type="date" name="Date"  value={this.state.Date}  onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									{this.validator.message('Date', this.state.Date, 'required')}

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