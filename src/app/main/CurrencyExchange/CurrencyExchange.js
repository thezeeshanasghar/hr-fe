
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

class CurrencyExchange extends Component {
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
					<div className="p-24"><h4>Currency-Exchange</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Currency-Exchange</h4></div>
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
								<Tab label="Add New Currency-Rate" />
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
												<CustomTableCell align="center" >Currency</CustomTableCell>
												<CustomTableCell align="center" >Rate</CustomTableCell>
												<CustomTableCell align="center">To Currency</CustomTableCell>
												<CustomTableCell align="center">Effective Date</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map(row => (
												<TableRow className={classes.row} key={row.id}>

													<CustomTableCell align="center">{row.Currency}</CustomTableCell>
													<CustomTableCell align="center">{row.Rate}</CustomTableCell>
													<CustomTableCell align="center">{row.ToCurrency}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.EffectiveDate}
													</CustomTableCell>
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
										label="Currency"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="Rate"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<TextField
										id="outlined-name"
										label="To Currency"
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
										defaultValue="2017-05-24"
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									{/* <FormControl className={classes.formControl}>
										<InputLabel htmlFor="age-simple">Age</InputLabel>
										<Select
											value={this.state.age}
											onChange={this.handleChange}
											inputProps={{
												name: 'age',
												id: 'age-simple',
											}}
											className="form-control"
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl> */}
								</form>
								<div className="row">
									<div style={{ float: "right", "marginRight": "8px", "marginTop": "2px", "marginBottom": "2px" }}>

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

export default withStyles(styles, { withTheme: true })(CurrencyExchange);