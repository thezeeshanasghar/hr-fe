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
function createData(Name, Company, Bank , IBAN , Currency , EDate , IsPrimary) {
	id += 1;
	return { Name, Company, Bank , IBAN , Currency , EDate , IsPrimary };
}

const rows = [
	createData('Usman Ahmed','Telenor', 'UBL', '3041', 'PKR' , '26/4/2020' , 'YES'),
	createData('Usman Ahmed','Telenor', 'UBL', '3041', 'PKR' , '26/4/2020' , 'YES'),
	createData('Usman Ahmed','Telenor', 'UBL', '3041', 'PKR' , '26/4/2020' , 'YES'),
	createData('Usman Ahmed','Telenor', 'UBL', '3041', 'PKR' , '26/4/2020' , 'YES'),
	createData('Usman Ahmed','Telenor', 'UBL', '3041', 'PKR' , '26/4/2020' , 'YES'),
	createData('Usman Ahmed','Telenor', 'UBL', '3041', 'PKR' , '26/4/2020' , 'YES')
];

class EmployeeBankAccount extends Component {
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
					<div className="p-24"><h4>Employee Bank Account</h4></div>
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
											    <CustomTableCell align="center" >Employee</CustomTableCell>
												<CustomTableCell align="center" >Company</CustomTableCell>                                              
                                                <CustomTableCell align="center" >Bank</CustomTableCell>
												<CustomTableCell align="center" >IBan</CustomTableCell>
												<CustomTableCell align="center">Currency Code</CustomTableCell>
												<CustomTableCell align="center">Effective Date</CustomTableCell>
                                                <CustomTableCell align="center">Action</CustomTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map(row => (
												<TableRow className={classes.row} key={row.id}>
													<CustomTableCell align="center" component="th" scope="row">{row.Name}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Company}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Bank}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.IBAN}</CustomTableCell>
                                                    <CustomTableCell align="center" component="th" scope="row">{row.Currency}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">{row.EDate}</CustomTableCell>
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
							<h4>Add New Account</h4>
								<form className={classes.container} noValidate autoComplete="off">
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
										id="outlined-name"
										label="Effective Date"
										fullWidth
										className={classes.textField}
										value={this.state.name}
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
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

export default withStyles(styles, { withTheme: true })(EmployeeBankAccount);