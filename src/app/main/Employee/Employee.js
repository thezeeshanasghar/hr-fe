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
let id = 0;
function createData(BankName, Code, Contact , Email , Address , Country , position) {
	id += 1;
	return { BankName, Code, Contact , Email , Address , Country , position };
}

const rows = [
	createData('61101345656','Salman', '03-05-1994', 'chirfan521@gmail.com' , '13-7-2020', 'IT' , 'Manager'),
	createData('61101345656','Salman', '03-05-1994', 'chirfan521@gmail.com' , '13-7-2020', 'IT' , 'Manager'),
	createData('61101345656','Salman', '03-05-1994', 'chirfan521@gmail.com' , '13-7-2020', 'IT' , 'Manager'),
	createData('61101345656','Salman', '03-05-1994', 'chirfan521@gmail.com' , '13-7-2020', 'IT' , 'Manager'),
	createData('61101345656','Salman', '03-05-1994', 'chirfan521@gmail.com' , '13-7-2020', 'IT' , 'Manager'),
	
	

];

class Employee extends Component {
	state = {
		value: 0,
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
												<CustomTableCell align="center">DOB</CustomTableCell>
												{/* <CustomTableCell align="center">Country Of Birth</CustomTableCell> */}
												<CustomTableCell align="center">Email</CustomTableCell>
												{/* <CustomTableCell align="center">Base Country</CustomTableCell> */}
												{/* <CustomTableCell align="center">Contract Type</CustomTableCell> */}
												{/* <CustomTableCell align="center">Current Employee Status</CustomTableCell> */}
												<CustomTableCell align="center">Hire Date</CustomTableCell>
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

													<CustomTableCell align="center">{row.BankName}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">{row.Code}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Contact}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Email}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Address}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Country}</CustomTableCell>
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
										label="Name"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="Code"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
										<TextField
										id="outlined-name"
										label="Contact No."
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
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
                                    <TextField
										id="outlined-name"
										label="Unit"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
                                    <TextField
										id="outlined-name"
										label="position"
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