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
import { Icon, Input, MuiThemeProvider} from '@material-ui/core';
import {Lookups} from '../../services/constant/enum'
import axios from "axios";
import toastr from 'toastr';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleReactValidator from 'simple-react-validator';
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
function createData(Description, CountryCode) {
	id += 1;
	return { Description, CountryCode };
}

const rows = [
	createData('Law-1', 'Pk')

];

class CountryLaws extends Component {
	state = {
		value: 0,
		code:'',
		countryCode:[],
		CurrencyList:[],
		Currency:'',
		mode:'',
		adultAge: '',
		minSalary:'',
		maxSalary:'',
		percentage:'',
		type:'',
		typeList:[],
		modeList:[],
		adultAge:'',
		description:'',
		Id:0,
		Action:"Insert Record",
		CountryLaws:[]
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();

	}
	componentDidMount() {
		this.getCountryLaw();
		this.getCountry();
		this.getCurrency();
		this.getMode();
		this.getType();
		
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
	getCountry = () => {

		axios({
			method: "get",
			url: defaultUrl+"lookups/"+Lookups.Country,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ countryCode: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getCurrency = () => {
		axios({
			method: "get",
			url: defaultUrl+"lookups/"+Lookups.Currency,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ CurrencyList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getMode = () => {
		axios({
			method: "get",
			url: defaultUrl+"lookups/"+Lookups.mode,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ modeList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}

	getType = () => {
		axios({
			method: "get",
			url: defaultUrl+"lookups/"+Lookups.lawtypes,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({typeList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}

	InsertUpdateCountryLaw=()=>{
		if (!this.validator.allValid()) {
			this.validator.showMessages();
			this.forceUpdate();
		} else {

			var method = "post";
			var url = defaultUrl+"countrylaw";
			if(this.state.Action !="Insert Record")
			{
				 method = "put";
				 url = defaultUrl+"countrylaw/"+this.state.Id;
			}

			var obj = {
				Detail: this.state.description,
				CountryCode: this.state.code,
				Currency: this.state.Currency,
				AdultAge: this.state.adultAge,
				CalculationMode: this.state.mode,
				MaxSalary: this.state.maxSalary,
				MinSalary: this.state.minSalary,
				Percentage: this.state.percentage,
				Type: this.state.type
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
					this.getCountryLaw();
					this.setState({
						description:"",
						code:"",
						Currency:"",
						adultAge:"",
						mode:"",
						maxSalary:"",
						minSalary: "",
						percentage:"",
						type:"",
						Action:"Insert Record",
						Id:0,
						value:0
					});
				})
				.catch((error) => {
					console.log(error);
					toastr.error('Operation unsuccessfull');
					this.setState({
						description:"",
						code:"",
						Currency:"",
						adultAge:"",
						mode:"",
						maxSalary:"",
						minSalary: "",
						percentage:"",
						type:"",
						Action:"Insert Record",
						Id:0
					})
				})
		}
	}
	getCountryLawById = (id) => {
		axios({
			method: "get",
			url: defaultUrl+"countrylaw/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
			
				this.setState({
					description:response.data[0].Detail,
					code:response.data[0].CountryCode,
					Currency:response.data[0].Currency,
					adultAge:response.data[0].AdultAge,
					mode:response.data[0].CalculationMode,
					maxSalary:response.data[0].MaxSalary,
					minSalary:response.data[0].MinSalary,
					percentage:response.data[0].Percentage,
					type:response.data[0].Type,
					value: 1,
					Id:response.data[0].Id,
					Action :"Update Record"
				});

			})
			.catch((error) => {
				console.log(error);
			})
	}
	getCountryLaw = () => {
		
		axios({
			method: "get",
			url: defaultUrl+"countrylaw",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ CountryLaws: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	deleteCountryLaw=(id)=>{
		axios({
			method: "delete",
			url: defaultUrl+"countrylaw/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				
				this.getCountryLaw();
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
					<div className="p-24"><h4>Country Laws</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Laws</h4></div>
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
								<Tab label="Add New Laws" />
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
												<CustomTableCell align="center" >Country Code</CustomTableCell>
												<CustomTableCell align="center">Description</CustomTableCell>
												<CustomTableCell align="center">Currency</CustomTableCell>
												<CustomTableCell align="center">Adult Age</CustomTableCell>
												<CustomTableCell align="center">Calculation Mode</CustomTableCell>
												<CustomTableCell align="center">Min Salary</CustomTableCell>
												<CustomTableCell align="center">Percentage</CustomTableCell>
												<CustomTableCell align="center">Type</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.CountryLaws.map(row => (
												<TableRow className={classes.row} key={row.id}>

													<CustomTableCell align="center">{row.CountryCode}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Detail}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Currency}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.AdultAge}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.CalculationMode}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.MinSalary}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Percentage}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Type}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} onClick={()=>this.deleteCountryLaw(row.Id)} aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} onClick={()=>this.getCountryLawById(row.Id)} aria-label="Edit">
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
								<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}    >
										 <FormControl className={classes.formControl}>
										<InputLabel htmlFor="ContractType">Country Code</InputLabel>
										<Select
											value={this.state.code}
											onChange={this.handleChange}
											inputProps={{
												name: 'code',
												id: 'code',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											{this.state.countryCode.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
										</Select>
									</FormControl>
									{this.validator.message('code', this.state.code, 'required')}

									</Grid>

									<Grid item xs={12} sm={5}>
										 <FormControl className={classes.formControl}>
										<InputLabel htmlFor="Currency">Currency Code</InputLabel>
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
											{this.state.CurrencyList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
										</Select>
									</FormControl>
									{this.validator.message('Currency', this.state.Currency, 'required')}
									</Grid>

									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}>
										 <FormControl className={classes.formControl}>
										<InputLabel htmlFor="mode">Calculation Mode</InputLabel>
										<Select
											value={this.state.mode}
											onChange={this.handleChange}
											inputProps={{
												name: 'mode',
												id: 'mode',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											{this.state.modeList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
										</Select>
									</FormControl>
									{this.validator.message('mode', this.state.mode, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} >
									<TextField
										id="adultAge"
										label="Adult Age"
										fullWidth
										type="number"
										name="adultAge"
										className={classes.textField}
										value={this.state.adultAge}
										  onChange={this.handleChange}
										margin="normal"
									/>
									{this.validator.message('adultAge', this.state.adultAge, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} >
									<TextField
										id="minSalary"
										label="Min Salary"
										fullWidth
										type="number"
										name="minSalary"
										className={classes.textField}
										value={this.state.minSalary}
										  onChange={this.handleChange}
										margin="normal"
									/>
									{this.validator.message('minSalary', this.state.minSalary, 'required')}
									</Grid>

									<Grid item xs={12} sm={5} >
									<TextField
										id="maxSalary"
										label="Max Salary"
										fullWidth
										type="number"
										name="maxSalary"
										className={classes.textField}
										value={this.state.maxSalary}
										  onChange={this.handleChange}
										margin="normal"
									/>
									{this.validator.message('maxSalary', this.state.maxSalary, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}>
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
											{this.state.typeList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
										</Select>
									</FormControl>
									{this.validator.message('type', this.state.type, 'required')}
									</Grid>
									<Grid item xs={12} sm={5} >
									<TextField
										id="percentage"
										label="Percentage"
										fullWidth
										type="number"
										name="percentage"
										className={classes.textField}
										value={this.state.percentage}
										  onChange={this.handleChange}
										margin="normal"
									/>
									{this.validator.message('percentage', this.state.percentage, 'required')}
									</Grid>

									<Grid item xs={12} sm={10} >
									<TextField
										id="description"
										label="Law"
										fullWidth
										type="text"
										name="description"
										className={classes.textField}
										value={this.state.description}
										  onChange={this.handleChange}
										margin="normal"
									/>
									{this.validator.message('description', this.state.description, 'required')}
									</Grid>
								</form>
								<div className="row">
								<Grid item xs={12} sm={10} >
									<div style={{float: "right","marginRight":"8px"}}>
									
									<Button variant="outlined" color="secondary" className={classes.button } onClick={this.InsertUpdateCountryLaw} >
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

export default withStyles(styles, { withTheme: true })(CountryLaws);