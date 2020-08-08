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
function createData(Law, Code, Type) {
	id += 1;
	return { Law, Code, Type };
}

const rows = [
	createData("Law", "Code", "Type")
];

class SocialSecurityElement extends Component {
	state = {
		value: 0,
		labelWidth: 0,
		Law: 1,
		Type: 1
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
					<div className="p-24"><h4>Social Security/Taxation</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Social Security/Taxation</h4></div>
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
												<CustomTableCell align="center"  >Law</CustomTableCell>
												<CustomTableCell align="center" >Code</CustomTableCell>
												<CustomTableCell align="center">Type</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>
											
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map(row => (
												<TableRow className={classes.row} key={row.id}>

													<CustomTableCell align="center"  >{row.Law}</CustomTableCell>
													<CustomTableCell align="center">{row.Code}</CustomTableCell>
													<CustomTableCell align="center">{row.Type}</CustomTableCell>
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
										<InputLabel htmlFor="Law">Law</InputLabel>
										<Select
											value={this.state.Law}
											onChange={this.handleChange}
											inputProps={{
												name: 'Law',
												id: 'Laaw',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={1}>Law1</MenuItem>
											<MenuItem value={2}>Law2</MenuItem>
										</Select>
									</FormControl>
									<TextField
										id="outlined-name"
										label=" Code"
										className={classes.textField}
										value={this.state.name}
										fullWidth
										//   onChange={this.handleChange('name')}
										margin="normal"
										variant="outlined"
									/>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="Type">Type</InputLabel>
										<Select
											value={this.state.Type}
											onChange={this.handleChange}
											inputProps={{
												name: 'Type',
												id: 'Type',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={1}>Social Security</MenuItem>
											<MenuItem value={2}>Taxation</MenuItem>
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

export default withStyles(styles, { withTheme: true })(SocialSecurityElement);