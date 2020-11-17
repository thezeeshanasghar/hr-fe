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
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import toastr from 'toastr'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Select1 from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import defaultUrl from "../../../app/services/constant/constant";

import $ from 'jquery';
import DataTable from "datatables.net";
import * as responsive from "datatables.net-responsive";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Message } from 'semantic-ui-react';
import Messages from '../toaster';
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


class BulkUpload extends Component {
	state = {
		Type:"",
		File:null,
		value: 0,
		FilePath:"",
		companyId:"",
		CompanySelected:"",
		companyList:[],
		Action:'Bulk Upload'
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
		this.getCompanyDetail();
	
	  }
	  handledropdown = (e) => {

		this.setState({ 'companyId': e.value, 'CompanySelected': e });
	}
	  getCompanyDetail = () => {
		axios({
			method: "get",
			url: defaultUrl + "company/Selective/data",
			headers: {
				// 'Authorization': `bearer ${token}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response);

				this.setState({ companyList: response.data });
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			})
	}

	handleTab = (event, value) => {
		this.setState({ value });
	};
	handleChange = (e) => {
        console.log(e.target.value);
		this.setState({ [e.target.name]: e.target.value });
		if(e.target.name=="File")
		{
		  if(e.target.files[0]==undefined)
		  {
			this.setState({File:""});
			return false;
		  }
		  var extension=e.target.files[0].name.split(".")[1];
		  if(extension.toLowerCase()!="xlsx" )
		  {
			  Messages.warning("Invalid valid formate");
			return false;
		  }
		  document.getElementById("fuse-splash-screen").style.display="block";
		  const formData = new FormData();
		  formData.append("file" , e.target.files[0]);
		  axios.post(defaultUrl+"/Upload", formData, {
 		 headers: {
    		'accept': 'application/json',
    		'Accept-Language': 'en-US,en;q=0.8',
   			 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  			}
		})
 		 .then((response) => {
  		  console.log("success",response);
			this.setState({File:response.data});
			Messages.success();
			document.getElementById("fuse-splash-screen").style.display="none";
		  }).catch((error) => {
			console.log("error",error);
			Messages.error();
			document.getElementById("fuse-splash-screen").style.display="none";
  		  });
		}

	  };
	  uploadFile=()=>{
		if(this.state.Type=="Bank" || this.state.Type=="Company" || this.state.Type=="Exchange" || this.state.Type=="CountryLaw" )
		{
			if (!this.validator.fieldValid('Type') || !this.validator.fieldValid('FilePath') ) {
				this.validator.showMessages();
				this.forceUpdate();
			} else {
				document.getElementById("fuse-splash-screen").style.display="block";
				var obj={
					Path: this.state.File,
					Type:this.state.Type,
					Company:0
				}
				axios({
					method: "post",
					url: defaultUrl+"bulkupload",
					data:obj,
					headers: {
						// 'Authorization': `bearer ${token}`,
						"Content-Type": "application/json;charset=utf-8",
					},
				})
					.then((response) => {
						Messages.success();
						document.getElementById("fuse-splash-screen").style.display="none";
					})
					.catch((error) => {
						Messages.error();
						document.getElementById("fuse-splash-screen").style.display="none";
					})
		
			}
		}else{
			if (!this.validator.allValid()) {
				this.validator.showMessages();
				this.forceUpdate();
			} else {
				document.getElementById("fuse-splash-screen").style.display="block";
				var obj={
					Path: this.state.File,
					Type:this.state.Type,
					Company:this.state.companyId
				}
				axios({
					method: "post",
					url: defaultUrl+"bulkupload",
					data:obj,
					headers: {
						// 'Authorization': `bearer ${token}`,
						"Content-Type": "application/json;charset=utf-8",
					},
				})
					.then((response) => {
						Messages.success();
						document.getElementById("fuse-splash-screen").style.display="none";
					})
					.catch((error) => {
						Messages.error();
						document.getElementById("fuse-splash-screen").style.display="none";
					})
		
			}
		}
		
	  }
	
	render() {
		
		const { classes, theme } = this.props;

		return (
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="p-24"><h4>Bulk Upload</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Upload Bulk Data</h4></div>
				}
				content={

					<div className={classes.root} style={{height:'300px'}}>
						  <div>
        <ToastContainer />
      </div>
						<AppBar position="static" color="default">
							<Tabs
								value={this.state.value}
								onChange={this.handleTab}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth"
							>
								<Tab label="Upload Data" />
							</Tabs>
						</AppBar>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}
						>
							<TabContainer dir={theme.direction}>
								<form className={classes.container} noValidate autoComplete="off">
								<Grid item xs={12} sm={5}  style={{marginRight:'5px'}} >
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
													<MenuItem value="Bank">Bank</MenuItem>
													<MenuItem value="Company">Company</MenuItem>
													<MenuItem value="Exchange">Exchange Rate</MenuItem>
													<MenuItem value="CountryLaw">Country Laws</MenuItem>
													<MenuItem value="Grade">Grade</MenuItem>
													<MenuItem value="Unit">Unit</MenuItem>
													<MenuItem value="Position">Position</MenuItem>
													<MenuItem value="Job">Job</MenuItem>
													<MenuItem value="Employee">Employee(Basic)</MenuItem>
													<MenuItem value="EmployeeBank">Employee(Bank)</MenuItem>
													<MenuItem value="EmployeePayroll">Employee(Payroll-Periodic)</MenuItem>
													<MenuItem value="EmployeePayrollOneTime">Employee(Payroll-oneTime)</MenuItem>
													<MenuItem value="ApplicableLaws">Employee(ApplicableLaws)</MenuItem>
													<MenuItem value="UnpaidLeaves">Employee(UnpaidLeaves)</MenuItem>
													<MenuItem value="overtime">Employee(overTime)</MenuItem>
													<MenuItem value="CostCenter">Cost Center</MenuItem>
													<MenuItem value="GlAccount">GL Account</MenuItem>
													<MenuItem value="PayElement">Pay Element</MenuItem>
													<MenuItem value="PayElementGlAccount">PayElement GlAccount</MenuItem>
													<MenuItem value ="Termination">Termination</MenuItem>
											</Select>
											{this.validator.message('Type', this.state.Type, 'required')}
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={5} style={{marginTop: "10px"}} className={this.state.Type=="Bank" || this.state.Type=="Company" || this.state.Type=="Exchange" || this.state.Type=="CountryLaw" ? 'd-none' : ''   } >
										<FormControl className={classes.formControl}>
									
											<Select1

												name="companyId"
												options={this.state.companyList}
												value={this.state.CompanySelected}
												className="basic-multi-select"
												classNamePrefix="select"
												onChange={this.handledropdown}
											
											/>
											{this.validator.message('companyId', this.state.companyId, 'required')}
										</FormControl>
									</Grid>
									
									<Grid item xs={12} sm={5}  >
									<TextField type="file" id="File" fullWidth label="File" InputLabelProps={{
												shrink: true,
											}}
											 name="File"  onChange={this.handleChange} />
									{this.validator.message('File', this.state.File, 'required')}
									</Grid>
								
								</form>
								<div className="row">
								<Grid item xs={12} sm={10}  >
									<div style={{float: "right","marginRight":"8px"}}>
									
									<Button variant="outlined" color="secondary" className={classes.button } style={{marginTop:"10px"}} onClick={this.uploadFile} >
										{this.state.Action}
      								</Button>
									</div>
									</Grid>
									<div style={{height:'200px'}}></div>
								</div>
							</TabContainer>
						</SwipeableViews>
					</div>
				}
			/>
		)
	}
}

export default withStyles(styles, { withTheme: true })(BulkUpload);