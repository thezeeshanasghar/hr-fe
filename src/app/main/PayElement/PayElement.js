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
function createData(Code, Description, Group, Increment, Periodicity, Currency, Lumpsum, NoofDays, ofMonth) {
	id += 1;
	return { Code, Description, Group, Increment, Periodicity, Currency, Lumpsum, NoofDays, ofMonth };
}

const rows = [
	createData("Code", "Desc", "Group1", "5000", "true", "usd", "false", "22", "jan")
];

class PayElement extends Component {
	state = {
		value: 0,
		labelWidth: 0,
		Month:1,
		Days:1,
		Periodicity:true
	};
	handleChange = (event, value) => {
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });

	};
	render() {
		const { classes, theme } = this.props;

		return (
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="p-24"><h4>Pay Element</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New PayElement</h4></div>
				}
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
												<CustomTableCell align="center"  >Code</CustomTableCell>
												<CustomTableCell align="center" >Description</CustomTableCell>
												<CustomTableCell align="center">Group</CustomTableCell>
												<CustomTableCell align="center">Increment</CustomTableCell>
												<CustomTableCell align="center">Periodicity</CustomTableCell>
												<CustomTableCell align="center">Currency</CustomTableCell>
												{/* <CustomTableCell align="center">Lumpsum</CustomTableCell> */}
												{/* <CustomTableCell align="center">NoofDays</CustomTableCell> */}
												{/* <CustomTableCell align="center">ofMonth</CustomTableCell> */}
												<CustomTableCell align="center">Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map(row => (
												<TableRow className={classes.row} key={row.id}>

													<CustomTableCell align="center"  >{row.Code}</CustomTableCell>
													<CustomTableCell align="center">{row.Description}</CustomTableCell>
													<CustomTableCell align="center">{row.Group}</CustomTableCell>
													<CustomTableCell align="center">{row.Increment}</CustomTableCell>
													<CustomTableCell align="center">{row.Periodicity}</CustomTableCell>
													<CustomTableCell align="center">{row.Currency}</CustomTableCell>
													{/* <CustomTableCell align="center">{row.Lumpsum}</CustomTableCell> */}
													{/* <CustomTableCell align="center">{row.NoofDays}</CustomTableCell> */}
													{/* <CustomTableCell align="center">{row.ofMonth}</CustomTableCell> */}
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
										label="Code"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="Description"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="Group Name"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										type="number"
										label="Incremenet/Decrement"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
								
								<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Periodicity">Periodicity</InputLabel>
										<Select
											value={this.state.Periodicity}
											onChange={this.handleChange}
											inputProps={{
												name: 'Periodicity',
												id: 'Periodicity',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={true}>true</MenuItem>
											<MenuItem value={false}>false</MenuItem>\
										</Select>
									</FormControl>
							
									<TextField
										id="outlined-name"
										label="Currency Code"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="lumpsum"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
								
								<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Days">Days</InputLabel>
										<Select
											value={this.state.Days}
											onChange={this.handleChange}
											inputProps={{
												name: 'Days',
												id: 'Days',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={1}>1</MenuItem>
											<MenuItem value={2}>2</MenuItem>
											<MenuItem value={3}>3</MenuItem>
											<MenuItem value={4}>4</MenuItem>
											<MenuItem value={5}>5</MenuItem>
											<MenuItem value={6}>6</MenuItem>
											<MenuItem value={7}>7</MenuItem>
											<MenuItem value={8}>8</MenuItem>
											<MenuItem value={9}>9</MenuItem>
											<MenuItem value={10}>10</MenuItem>
											<MenuItem value={20}>20</MenuItem>
											<MenuItem value={30}>30</MenuItem>
										</Select>
									</FormControl>
							
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Month">Month</InputLabel>
										<Select
											value={this.state.Month}
											onChange={this.handleChange}
											inputProps={{
												name: 'Month',
												id: 'Month',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={1}>Jan</MenuItem>
											<MenuItem value={2}>Feb</MenuItem>
											<MenuItem value={3}>March</MenuItem>
											<MenuItem value={4}>April</MenuItem>
											<MenuItem value={5}>May</MenuItem>
											<MenuItem value={6}>June</MenuItem>
											<MenuItem value={7}>July</MenuItem>
											<MenuItem value={8}>Aug</MenuItem>
											<MenuItem value={9}>Sep</MenuItem>
											<MenuItem value={10}>Oct</MenuItem>
											<MenuItem value={11}>Nov</MenuItem>
											<MenuItem value={12}>Dec</MenuItem>
										</Select>
									</FormControl>
								</form>
								<div className="row">
									<div style={{ float: "right", "marginRight": "8px" }}>

										<Button variant="outlined" color="secondary" className={classes.button}>
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

export default withStyles(styles, { withTheme: true })(PayElement);