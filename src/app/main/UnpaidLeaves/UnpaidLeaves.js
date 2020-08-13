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
import { Icon, Input, MuiThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import toastr from 'toastr';
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

class UnpaidLeaves extends Component {
	state = {
		value: 0,
		labelWidth: 0,
		employee: "",
		dateTo: moment(),
		dateFrom: moment(),
		company: "",
		Companies: [],
		Employees: [],
		leaves: [],
		Action:""

	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();

	}
	componentDidMount() {
		this.getCompanies();
		this.getUnPaidLeaves();
	}
	getCompanies = () => {
		axios({
			method: "get",
			url: "http://localhost:3000/api/Company",
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
	getEmployees = (companyId) => {
		axios({
			method: "get",
			url: "http://localhost:3000/api/Employees/ByCompany/" + companyId,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ Employees: response.data });
			})
			.catch((error) => {
				console.log(error);
			})

	}

	handleTabChange = (event, value) => {
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });

	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(e.target.name, e.target.value);
		if (e.target.name == "company" && e.target.value != "") {
			this.getEmployees(e.target.value);
		}
	};
	insertUpdateLeaves = () => {
		if (!this.validator.allValid()) {
			this.validator.showMessages();
			this.forceUpdate();
		} else {
			var method = "post";
			var url = "http://localhost:3000/api/Unpaidleaves";
			// console.log(this.state.company,this.state.employee,this.state.dateFrom,this.state.dateTo);
			var obj = {
				CompanyId: this.state.company,
				EmployeeId: this.state.employee,
				LeaveStartDate: this.state.dateFrom,
				LeaveEndDate: this.state.dateTo
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
					this.getBankDetail();
					this.setState({
						company: "",
						employee: "",
						dateFrom: "",
						dateTo: ""
					});
				})
				.catch((error) => {
					console.log(error);
					toastr.error('Operation unsuccessfull');
					this.setState({
						company: "",
						employee: "",
						dateFrom: "",
						dateTo: ""
					})
				})


		}
	}
	getUnPaidLeaves = () => {
		axios({
			method: "get",
			url: "http://localhost:3000/api/Unpaidleaves",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ leaves: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getLeavesById = (id) => {
		axios({
			method: "get",
			url: "http://localhost:3000/api/Unpaidleaves/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.getEmployees(response.data[0].CompanyId);
				this.setState({
					employee: response.data[0].EmployeeId,
					dateTo: moment(response.data[0].LeaveStartDate).format('YYYY-MM-DD'),
					dateFrom: moment(response.data[0].LeaveEndDate).format('YYYY-MM-DD'),
					company: response.data[0].CompanyId,
					value: 1
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
					<div className="p-24"><h4>Unpaid Leave</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Unpaid Leave</h4></div>
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
								<Tab label="Add New" />
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
												<CustomTableCell align="center"  >Employee</CustomTableCell>
												<CustomTableCell align="center"  >Company</CustomTableCell>
												<CustomTableCell align="center" >Date From</CustomTableCell>
												<CustomTableCell align="center">Date To</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.leaves.map(row => (
												<TableRow className={classes.row} key={row.Id}>

													<CustomTableCell align="center"  >{row.FirstName}</CustomTableCell>
													<CustomTableCell align="center"  >{row.CompanyName}</CustomTableCell>
													<CustomTableCell align="center">{moment(row.LeaveStartDate).format('YYYY-MM-DD')}</CustomTableCell>
													<CustomTableCell align="center">{moment(row.LeaveEndDate).format('YYYY-MM-DD')}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} onClick={() => this.getLeavesById(row.Id)} aria-label="Edit">
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
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}   >
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
											{this.validator.message('company', this.state.company, 'required')}
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={5} >
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="Employee">Employee</InputLabel>
											<Select
												value={this.state.employee}
												onChange={this.handleChange}
												inputProps={{
													name: 'employee',
													id: 'employee',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{this.state.Employees.map(row => (
													<MenuItem value={row.Id}>{row.FirstName}</MenuItem>
												))}
											</Select>
											{this.validator.message('employee', this.state.employee, 'required')}
										</FormControl>
										{/* {this.validator.message('bankName', this.state.bankName, 'required')} */}
									</Grid>

									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}>
											<TextField
											label="Date From"
											name="dateFrom"
											id="dateFrom"
											type="date"
											value={this.state.dateFrom}
											className={classes.textField}
											fullWidth
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('dateFrom', this.state.dateFrom, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}>
										<TextField
											label="Date To"
											name="dateTo"
											id="dateTo"
											type="date"
											value={this.state.dateTo}
											className={classes.textField}
											fullWidth
											InputLabelProps={{
												shrink: true,
											}}
										/>
										{this.validator.message('dateTo', this.state.dateTo, 'required')}
									</Grid>

								</form>
								<div className="row">
									<Grid item xs={12} sm={10} >
										<div style={{ float: "right", "marginRight": "8px", "marginTop": "5px" }}>

											<Button variant="outlined" color="secondary" className={classes.button} onClick={this.insertUpdateLeaves} >
												Insert Record
      								</Button>
										</div>
									</Grid>
								</div>
							</TabContainer>
						</SwipeableViews>
					</ div>
				}
			/>
		)
	}
}

export default withStyles(styles, { withTheme: true })(UnpaidLeaves);