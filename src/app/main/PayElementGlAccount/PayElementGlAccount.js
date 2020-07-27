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
function createData(PayElement, GlAccount, CostCenterPosting, CostCenter, PostingPerEmployee) {
	id += 1;
	return { PayElement, GlAccount, CostCenterPosting, CostCenter, PostingPerEmployee };
}

const rows = [
	createData("PayElement", "GlAccount", "true", "CostCenter", "PostingPerEmployee")
];

class PayElementGlAccount extends Component {
	state = {
		value: 0,
		labelWidth: 0,
		Month: 1,
		Days: 1,
		Periodicity: true,
		PayElement: 1,
		GLAccount: 1,
		CostCenterPosting: true,
		CostCenter: 1
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
					<div className="p-24"><h4>Pay-Element/GL-Account</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Pay-Element/GL-Account</h4></div>
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
												<CustomTableCell align="center"  >PayElement</CustomTableCell>
												<CustomTableCell align="center" >GlAccount</CustomTableCell>
												<CustomTableCell align="center">CostCenterPosting</CustomTableCell>
												<CustomTableCell align="center">CostCenter</CustomTableCell>
												{/* <CustomTableCell align="center">Periodicity</CustomTableCell> */}
												<CustomTableCell align="center">PostingPerEmployee</CustomTableCell>

												<CustomTableCell align="center">Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map(row => (
												<TableRow className={classes.row} key={row.id}>

													<CustomTableCell align="center"  >{row.PayElement}</CustomTableCell>
													<CustomTableCell align="center">{row.GlAccount}</CustomTableCell>
													<CustomTableCell align="center">{row.CostCenterPosting}</CustomTableCell>
													<CustomTableCell align="center">{row.CostCenter}</CustomTableCell>
													{/* <CustomTableCell align="center">{row.Periodicity}</CustomTableCell> */}
													<CustomTableCell align="center">{row.PostingPerEmployee}</CustomTableCell>
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
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="PayElement">PayElement</InputLabel>
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
											<MenuItem value={1}>PayElement1</MenuItem>
											<MenuItem value={2}>PayElement2</MenuItem>\
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="PayElement">GL-Account</InputLabel>
										<Select
											value={this.state.GLAccount}
											onChange={this.handleChange}
											inputProps={{
												name: 'GLAccount',
												id: 'GLAccount',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={1}>GLAccount1</MenuItem>
											<MenuItem value={2}>GLAccount2</MenuItem>\
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="CostCenterPosting">CostCenter Posting</InputLabel>
										<Select
											value={this.state.CostCenterPosting}
											onChange={this.handleChange}
											inputProps={{
												name: 'CostCenterPosting',
												id: 'CostCenterPosting',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={true}>true</MenuItem>
											<MenuItem value={false}>false</MenuItem>
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="PayElement">Cost Center</InputLabel>
										<Select
											value={this.state.CostCenter}
											onChange={this.handleChange}
											inputProps={{
												name: 'CostCenter',
												id: 'CostCenter',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={1}>CostCenter1</MenuItem>
											<MenuItem value={2}>CostCenter2</MenuItem>\
										</Select>
									</FormControl>

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
										type="number"
										label="Posting Per Employee"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
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

export default withStyles(styles, { withTheme: true })(PayElementGlAccount);