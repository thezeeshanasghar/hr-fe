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
		value: 0,
		Gender:'Male',
		Status:'Single',
		Country:'Pakistan',
		ContractType:'1',
		EmployeeStatus:'Active'
	};
	handleChange = (event, value) => {
		this.setState({ value });
	};
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
								onChange={this.handleChange}
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
									<TextField
										id="outlined-name"
										label="Title"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="First Name"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="Last Name"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
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
											<MenuItem value='Male'>Male</MenuItem>
											<MenuItem value='Female'>Female</MenuItem>
										</Select>
									</FormControl>

									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Gender">Marital Status</InputLabel>
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
											<MenuItem value='Married'>Married</MenuItem>
											<MenuItem value='Single'>Single</MenuItem>
										</Select>
									</FormControl>
									<TextField
										id="date"
										label="Date of Birth"
										type="date"
										fullWidth
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									
                                    <TextField
										id="outlined-name"
										label="Email"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
                                 <FormControl className={classes.formControl}>
										<InputLabel htmlFor="Country">Country</InputLabel>
										<Select
											value={this.state.Gender}
											onChange={this.handleChange}
											inputProps={{
												name: 'Country',
												id: 'Country',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='Pakistan'>Pakistan</MenuItem>
											<MenuItem value='Turkey'>Turkey</MenuItem>\
										</Select>
									</FormControl>
  									<TextField
										id="outlined-name"
										label="Employee Code"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
										<TextField
										id="outlined-name"
										label="Insurance Id"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="Taxation Id"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="CNIC"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
										 <FormControl className={classes.formControl}>
										<InputLabel htmlFor="ContractType">Contract Type</InputLabel>
										<Select
											value={this.state.Gender}
											onChange={this.handleChange}
											inputProps={{
												name: 'ContractType',
												id: 'ContractType',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>Permanent</MenuItem>
											<MenuItem value='2'>Part-time</MenuItem>\
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="ContractType">Employee Status</InputLabel>
										<Select
											value={this.state.Gender}
											onChange={this.handleChange}
											inputProps={{
												name: 'EmployeeStatus',
												id: 'EmployeeStatus',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='Active'>Active</MenuItem>
											<MenuItem value='Deactive'>Deactive</MenuItem>\
										</Select>
									</FormControl>
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
										<TextField
										id="outlined-name"
										label="Hiring Reason"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
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
									<TextField
										id="outlined-name"
										label="Part-time Situation"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
										<TextField
										id="outlined-name"
										label="Part-time Percentage"
										type="number"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
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
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="ContractType">Unit</InputLabel>
										<Select
											value={this.state.Unit}
											onChange={this.handleChange}
											inputProps={{
												name: 'Unit',
												id: 'Unit',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='Active'>Unit1</MenuItem>
											<MenuItem value='Deactive'>Unit2</MenuItem>
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Job">Job</InputLabel>
										<Select
											value={this.state.Job}
											onChange={this.handleChange}
											inputProps={{
												name: 'Job',
												id: 'Job',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='Active'>Job1</MenuItem>
											<MenuItem value='Deactive'>Job2</MenuItem>
										</Select>
									</FormControl>
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
											<MenuItem value='1'>Position1</MenuItem>
											<MenuItem value='2'>Position2</MenuItem>
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Grade">Grade</InputLabel>
										<Select
											value={this.state.Grade}
											onChange={this.handleChange}
											inputProps={{
												name: 'Grade',
												id: 'Grade',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>Grade1</MenuItem>
											<MenuItem value='2'>Grade2</MenuItem>
										</Select>
									</FormControl>
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
											<MenuItem value='2'>tax 2</MenuItem>\
										</Select>
									</FormControl>
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