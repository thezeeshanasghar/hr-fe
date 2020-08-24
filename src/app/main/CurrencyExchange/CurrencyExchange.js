
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
		currency:"",
		toCurrency:"",
		rate:"",
		effectiveDate:"",
		CurrencyList:[],
		Action:"Insert Record",
		Id:0,
		ExchangeRate:[]
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();

	}
	componentDidMount() {
		this.getCurrency();
		this.getExchangeRate();
	}
	InsertUpdateExchange=()=>{
			if (!this.validator.allValid()) {
				this.validator.showMessages();
				this.forceUpdate();
			} else {
				var method = "post";
				var url = defaultUrl+"Currency";
				if(this.state.Action !="Insert Record")
				{
					 method = "put";
					 url = defaultUrl+"Currency/"+this.state.Id;
				}
				// console.log(this.state.company,this.state.employee,this.state.dateFrom,this.state.dateTo);
				var obj = {
					Currency: this.state.currency,
					ToCurrency: this.state.toCurrency,
					Rate: this.state.rate,
					EffectiveDate: this.state.effectiveDate
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
							currency: "",
							toCurrency: "",
							rate: "",
							effectiveDate: "",
							Action:"Insert Record",
							Id:0
						});
					})
					.catch((error) => {
						console.log(error);
						toastr.error('Operation unsuccessfull');
						this.setState({
							currency: "",
							toCurrency: "",
							rate: "",
							effectiveDate: "",
							Action:"Insert Record",
							Id:0
						})
					})
	
	
			}
		
	}
	getCurrency = () => {
		console.log("23423432")
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
	getExchangeRate = () => {
		
		axios({
			method: "get",
			url: defaultUrl+"Currency",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ ExchangeRate: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}

	getExchangeById=(id)=>{
		axios({
			method: "get",
			url:  defaultUrl+"Currency/"+id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({
				currency:response.data[0].Currency,
				toCurrency:response.data[0].Currency,
				rate:response.data[0].Rate,
				effectiveDate:moment(response.data[0].EffectiveDate).format('YYYY-MM-DD'),
				Action:"Update Record",
				Id:response.data[0].Id,
				value:1
				});
			})
			.catch((error) => {
				console.log(error);
			})
	}
	deleteExchange=(id)=>{
		axios({
			method: "delete",
			url:  defaultUrl+"Currency/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				
				this.getExchangeRate();
			})
			.catch((error) => {
				console.log(error);
			})
	  }

	getCurrentDate(separator='-'){

		let newDate = new Date()
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
		
		return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
	}
	
	handleTabChange = (event, value) => {
		this.setState({ value });
		this.setState({ [event.target.name]: event.target.value });

	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
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
								onChange={this.handleTabChange}
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
												<CustomTableCell align="center" >Currency</CustomTableCell>
												<CustomTableCell align="center" >Rate</CustomTableCell>
												<CustomTableCell align="center">To Currency</CustomTableCell>
												<CustomTableCell align="center">Effective Date</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.ExchangeRate.map(row => (
												<TableRow className={classes.row} key={row.Id}>

													<CustomTableCell align="center">{row.CurrencyName }</CustomTableCell>
													<CustomTableCell align="center">{row.Rate}</CustomTableCell>
											<CustomTableCell align="center">{row.ToCurrencyName}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{moment(row.EffectiveDate).format('YYYY-MM-DD')}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} onClick={()=>this.deleteExchange(row.Id)} aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} onClick={()=>this.getExchangeById(row.Id)} aria-label="Edit">
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
								<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="currency">Currency</InputLabel>
										<Select
											value={this.state.currency}
											onChange={this.handleChange}
											inputProps={{
												name: 'currency',
												id: 'currency',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											{this.state.CurrencyList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
										</Select>
										{this.validator.message('currency', this.state.currency, 'required')}

									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}   >
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="toCurrency">To Currency</InputLabel>
										<Select
											value={this.state.toCurrency}
											onChange={this.handleChange}
											inputProps={{
												name: 'toCurrency',
												id: 'toCurrency',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											{this.state.CurrencyList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))}
										</Select>
										{this.validator.message('toCurrency', this.state.toCurrency, 'required')}

									</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
									<TextField
										id="rate"
										label="rate"
										type="number"
										value={this.state.rate}
										fullWidth
										name="rate"
										onChange={this.handleChange}
									/>
									{this.validator.message('rate', this.state.rate, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}  >
								
									<TextField id="effectiveDate" fullWidth label="Effective Date" type="date" name="effectiveDate"  value={this.state.effectiveDate}  onChange={this.handleChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									{this.validator.message('effectiveDate', this.state.effectiveDate, 'required')}

									</Grid>
								</form>
								<div className="row">
								<Grid item xs={12} sm={10}  >
									<div style={{ float: "right", "marginRight": "8px", "marginTop": "2px", "marginBottom": "2px" }}>

										<Button variant="outlined" color="secondary" className={classes.button} onClick={this.InsertUpdateExchange} >
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

export default withStyles(styles, { withTheme: true })(CurrencyExchange);