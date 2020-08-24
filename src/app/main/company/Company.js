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
import Grid from '@material-ui/core/Grid';
import axios from "axios";
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
function createData(BankName, Code, Contact , Email , Address , Country) {
	id += 1;
	return { BankName, Code, Contact , Email , Address , Country };
}

const rows = [
	createData('Telenor', '1234', '03143041544', 'chirfan521@gmail.com' , 'Islamabad' , 'Pakistan'),
	createData('Zong','3467','03143041544','chirfan521@gmail.com' , 'Islamabad' , 'Pakistan'),
	createData('Agility', '3456','03143041544','chirfan521@gmail.com' , 'Islamabad' , 'Pakistan' ),
	createData('engro foods', '4567','03143041544','chirfan521@gmail.com' , 'Islamabad' , 'Pakistan'),
	createData('NCCS', '4567', '03143041544','chirfan521@gmail.com' , 'Islamabad' , 'Pakistan')

];

class Company extends Component {
	state = {
		value: 0,
		Name: '',
		Code: '',
		Contact: '',
		Email: '',
		Address: '',
		CountryCode: '',
		Companies: [],
		Id: 0,
		Action: 'Insert Record'

	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
	
	  }

	  componentDidMount(){
		this.getCompanyDetail();
	}

	handleTab = (event, value) => {
		this.setState({ value });
	};


	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	  getCompanyDetail=()=>{
		axios({
			method: "get",
			url: defaultUrl+"company",
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Companies:response.data});
			})
			.catch((error) => {
				console.log(error);
			})
	  }
	insertUpdateRecord=()=>{
		if (!this.validator.fieldValid('Name')
		|| !this.validator.fieldValid('Code')
		|| !this.validator.fieldValid('Contact')
		|| !this.validator.fieldValid('Email')
		|| !this.validator.fieldValid('Address')
		|| !this.validator.fieldValid('CountryCode')) 
		{
	    this.validator.showMessages();
	    this.forceUpdate();
  		 return false;
		   }
		   var method="post";
		   var url= defaultUrl+"company";
		   if(this.state.Action!="Insert Record")
		   {
			method="put";
			url= defaultUrl+"company/"+this.state.Id;
		   }
		//   this.setState({bankName:'',bankCode:'',bankAddress:''})
		var obj = {
			CompanyName: this.state.Name,
			Code: this.state.Code,
			Email: this.state.Email,
			Contact: this.state.Contact,
			CountryCode: this.state.CountryCode,
			Adress: this.state.Address
		  };
		  axios.interceptors.request.use(function(config) {
			// document.getElementsByClassName("loader-wrapper")[0].style.display="block"
			return config;
		  }, function(error) {
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
	
			  console.log(response);
			  this.setState({
				Name: "",
				Code: "",
				Contact: '',
		        Email: '',
		        Address: '',
				CountryCode: '',
				Action:'Insert Record',
				Id:0
			  });
			})
			.catch((error) => {
				console.log(error);
			  this.setState({
				Name: "",
				Code: "",
				Contact: '',
		        Email: '',
		        Address: '',
				CountryCode: '',
				Action:'Insert Record',
				Id:0
				})
			}).finally(()=>{
			//   document.getElementsByClassName("loader-wrapper")[0].style.display="none";
			});
	  }

	  deleteCompany=(id)=>{
		axios({
			method: "delete",
			url:  defaultUrl+"company/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				
				this.getCompanyDetail();
			})
			.catch((error) => {
				console.log(error);
			})
	  }

	  getCompanyById=(id)=>{
		axios({
			method: "get",
			url: defaultUrl+"company/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Action:'Update Record',value:1,Name:response.data[0].CompanyName,Code:response.data[0].Code,Address:response.data[0].Address,
				Id:response.data[0].Id, Contact:response.data[0].Contact , Email:response.data[0].Email , CountryCode:response.data[0].CountryCode });
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
					<div className="p-24"><h4>Companies</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Company</h4></div>
				}
				content={

					<div className={classes.root}>
						<AppBar position="static" color="default">
							<Tabs
								value={this.state.value}
								onChange={this.handleTab}
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
												<CustomTableCell align="center" >Name</CustomTableCell>
                                                <CustomTableCell align="center" >Code</CustomTableCell>
                                                <CustomTableCell align="center" >Contact</CustomTableCell>
                                                <CustomTableCell align="center" >Email</CustomTableCell>
												<CustomTableCell align="center">Address</CustomTableCell>
												<CustomTableCell align="center">Country</CustomTableCell>
                                                <CustomTableCell align="center">Action</CustomTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
										{this.state.Companies.map(row => (
												<TableRow className={classes.row} key={row.Id}>

													<CustomTableCell align="center">{row.CompanyName=="" || row.CompanyName==null || row.CompanyName == undefined ?'N/A':row.CompanyName}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Code=="" || row.Code==null || row.Code == undefined ?'N/A':row.Code}
													</CustomTableCell>
													<CustomTableCell align="center">{row.Contact=="" || row.Contact==null || row.Contact == undefined ?'N/A':row.Contact}</CustomTableCell>
													<CustomTableCell align="center">{row.Email=="" || row.Email==null || row.Email == undefined ?'N/A':row.Email}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Address=="" || row.Address==null || row.Address == undefined ?'N/A':row.Address}
													</CustomTableCell>
													
													<CustomTableCell align="center" component="th" scope="row">
														{row.Country=="" || row.Country==null || row.Country == undefined ?'N/A':row.Country}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} onClick={()=>this.deleteCompany(row.Id)}  aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} onClick={()=>this.getCompanyById(row.Id)} aria-label="Edit">
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
								<TextField id="Name" fullWidth label="Company Name" name="Name" value={this.state.Name} onChange={this.handleChange} />
								{this.validator.message('Name', this.state.Name, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField id="Code" fullWidth label="Company Code" name="Code" value={this.state.Code} onChange={this.handleChange} />
									{this.validator.message('Code', this.state.Code, 'required')}
									</Grid>
									
									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
								<TextField id="Contact" fullWidth label="Contact Number" name="Contact" value={this.state.Contact} onChange={this.handleChange} />
								{this.validator.message('Contact', this.state.Contact, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField id="Email" fullWidth label="Company Email" name="Email" value={this.state.Email} onChange={this.handleChange} />
									{this.validator.message('Email', this.state.Email, 'required')}
									</Grid>

									<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
								<TextField id="Address" fullWidth label="Address" name="Address" value={this.state.Address} onChange={this.handleChange} />
								{this.validator.message('Address', this.state.Contact, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField id="CountryCode" fullWidth label="CountryCode" name="CountryCode" value={this.state.CountryCode} onChange={this.handleChange} />
									{this.validator.message('CountryCode', this.state.CountryCode, 'required')}
									</Grid>

								</form>
								<div className="row">
									<div style={{float: "right","marginRight":"8px"}}>
									
									<Button variant="outlined" color="secondary" className={classes.button} onClick={this.insertUpdateRecord}>
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

export default withStyles(styles, { withTheme: true })(Company);