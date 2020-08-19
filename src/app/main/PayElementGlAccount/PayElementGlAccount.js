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
import { Lookups } from '../../services/constant/enum'
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
		PayElement:"",
		GLAccount: "",
		CostCenterPosting: "",
		CostCenter: "",
		payElements:[],
		postperEmployee:"",
		glaccountList:[],
		PeriodicityList:[],
		costcenterList:[],
		payelementglAccountList:[],
		Id:0,
		Action:"Insert Record"
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();

	}
	componentDidMount() {
	this.getPayElement();
	this.getGlAccount();
	this.getPeriodicity();
	this.getCostCenter();
	this.getpayelementglAccountList();
	}
	getCostCenter = () => {
		axios({
			method: "get",
			url: "http://localhost:3000/api/CostCenter",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ costcenterList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getPeriodicity=()=>{
		axios({
			method: "get",
			url: defaultUrl + "lookups/"+Lookups.periodicity,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ PeriodicityList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}

	getPayElement = () => {
		axios({
			method: "get",
			url: defaultUrl+"payelement",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ payElements: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getGlAccount = () => {
		axios({
			method: "get",
			url: defaultUrl+"glaccount",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ glaccountList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	insertUpdatePayElementGLAccount= () => {
		if (!this.validator.allValid()) {
			this.validator.showMessages();
			this.forceUpdate();
		} else {
			var method = "post";
			var url = defaultUrl+"PayElementGLAccount";
			if(this.state.Action !="Insert Record")
			{
				 method = "put";
				 url = defaultUrl+"PayElementGLAccount/"+this.state.Id;
			}
			// console.log(this.state.company,this.state.employee,this.state.dateFrom,this.state.dateTo);
			var obj = {
				PayElementId:this.state.PayElement,
				GLAccountId:this.state.GLAccount,
				CostCenterPosting:this.state.CostCenterPosting,
				CostCenterId:this.state.CostCenter,
				PostingPerEmployee:this.state.postperEmployee,

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
				this.getpayelementglAccountList();
					this.setState({
						PayElement:"",
						GLAccount:"",
						CostCenterPosting:"",
						CostCenter:"",
						postperEmployee:"",
						Id: 0,
						Action:'Insert Record'
					});
				})
				.catch((error) => {
					console.log(error);
					toastr.error('Operation unsuccessfull');
					this.setState({
						PayElement:"",
						GLAccount:"",
						CostCenterPosting:"",
						CostCenter:"",
						postperEmployee:"",
						Id: 0,
						Action:'Insert Record'
					})
				})


		}
	}
	getpayelementglAccountList = () => {
		axios({
			method: "get",
			url: defaultUrl+"PayElementGLAccount",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);
				this.setState({ payelementglAccountList: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getPayElementById = (id) => {
		axios({
			method: "get",
			url: defaultUrl+"PayElementGLAccount/" + id,
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				
				this.setState({
					PayElement:response.data[0].PayElementId,
					GLAccount: response.data[0].GLAccountId,
					CostCenterPosting: response.data[0].CostCenterPosting,
					CostCenter:response.data[0].CostCenterId,
					postperEmployee:response.data[0].PostingPerEmployee,
					value :  1,
					Id : response.data[0].Id,
					Action : "Update Record"
				});

			})
			.catch((error) => {
				console.log(error);
			})
	}
	deletePayElement =(id)=>{
		axios({
			method: "delete",
			url: defaultUrl+"PayElementGLAccount/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				
				this.getpayelementglAccountList();
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
								<Button variant="contained"  color="secondary" style={{'marginRight':'2px'}} className={classes.button}>
											PRINT
      								</Button>
                            </Paper>
                        </MuiThemeProvider>
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												{/* <CustomTableCell align="center"  >PayElement</CustomTableCell> */}
												{/* <CustomTableCell align="center" >GlAccount</CustomTableCell> */}
												<CustomTableCell align="center">CostCenterPosting</CustomTableCell>
												{/* <CustomTableCell align="center">CostCenter</CustomTableCell> */}
												{/* <CustomTableCell align="center">Periodicity</CustomTableCell> */}
												<CustomTableCell align="center">PostingPerEmployee</CustomTableCell>

												<CustomTableCell align="center">Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.payelementglAccountList.map(row => (
												<TableRow className={classes.row} key={row.id}>

													{/* <CustomTableCell align="center"  >{row.PayElement}</CustomTableCell> */}
													{/* <CustomTableCell align="center">{row.GlAccount}</CustomTableCell> */}
													<CustomTableCell align="center">{row.CostCenterPosting}</CustomTableCell>
													{/* <CustomTableCell align="center">{row.CostCenter}</CustomTableCell> */}
													{/* <CustomTableCell align="center">{row.Periodicity}</CustomTableCell> */}
													<CustomTableCell align="center">{row.PostingPerEmployee}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} onClick={()=>this.deletePayElement(row.Id)}  aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} onClick={()=>this.getPayElementById(row.Id)}  aria-label="Edit">
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
								<Grid item xs={12} sm={5} style={{ marginRight: '5px' }}>
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
											{this.state.payElements.map(row => (
													<MenuItem value={row.Id}>{row.Code}</MenuItem>
												))} 
										</Select>
									</FormControl>
									{this.validator.message('PayElement', this.state.PayElement, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}>
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
											{this.state.glaccountList.map(row => (
													<MenuItem value={row.Id}>{row.Account}</MenuItem>
												))} 
										</Select>
									</FormControl>
									{this.validator.message('GLAccount', this.state.GLAccount, 'required')}

									</Grid>
									<Grid item xs={12} sm={5} style={{ marginRight: '5px' }} >
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
											
											{this.state.PeriodicityList.map(row => (
													<MenuItem value={row.Id}>{row.Name}</MenuItem>
												))} 
										</Select>
									</FormControl>
									{this.validator.message('CostCenterPosting', this.state.CostCenterPosting, 'required')}

									</Grid>
									<Grid item xs={12} sm={5}>
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
											
											{this.state.costcenterList.map(row => (
													<MenuItem value={row.Id}>{row.Code}</MenuItem>
												))} 
										</Select>
									</FormControl>
									{this.validator.message('CostCenter', this.state.CostCenter, 'required')}

									</Grid>
									
									<Grid item xs={12} sm={5}>
										<TextField
										id="postperEmployee"
										type="number"
										label="Posting Per Employee"
										className={classes.textField}
										value={this.state.postperEmployee}
										name="postperEmployee"
										fullWidth
										  onChange={this.handleChange}
										margin="normal"
										/>
										{this.validator.message('postperEmployee', this.state.postperEmployee, 'required')}

									</Grid>
								</form>
								<div className="row">
								<Grid item xs={12} sm={10}>
									<div style={{ float: "right", "marginRight": "8px" }}>

										<Button variant="outlined" color="secondary" onClick={this.insertUpdatePayElementGLAccount} className={classes.button}>
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

export default withStyles(styles, { withTheme: true })(PayElementGlAccount);