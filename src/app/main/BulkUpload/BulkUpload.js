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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import defaultUrl from "../../../app/services/constant/constant";

import $ from 'jquery';
import DataTable from "datatables.net";
import * as responsive from "datatables.net-responsive";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messages from '../toaster';
import { Message } from 'semantic-ui-react';

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
		Action:'Bulk Upload'
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
		
	
	  }
	  componentDidMount(){
		localStorage.removeItem("ids");
		  this.getBankDetail();
	  }
	handleTab = (event, value) => {
		this.setState({ value });
	};
	handleChange = (e) => {
        
        this.setState({ [e.target.name]: e.target.value });
	  };
	  
	   success = () => toast.success('Operation Succesful', {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		}); 

	  error = () => 	toast.error('An error Occured!', {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
	  
	  getBankDetail=()=>{
		localStorage.removeItem("ids");
		if (!$.fn.dataTable.isDataTable('#Bank_Table')) {
			this.state.table = $('#Bank_Table').DataTable({
				ajax: defaultUrl + "Bank",
				"columns": [
					{ "data": "BankName" },
					{ "data": "BranchCode" },
					{ "data": "Address" },
					{ "data": "Action",
					sortable: false,
					"render": function ( data, type, full, meta ) {
					   
						return `<input type="checkbox" name="radio"  value=`+full.Id+`
						onclick=" const checkboxes = document.querySelectorAll('input[name=radio]:checked');
									let values = [];
									checkboxes.forEach((checkbox) => {
										values.push(checkbox.value);
									});
									localStorage.setItem('ids',values);	"
						/>`;
					}
				 }

				],
				rowReorder: {
					selector: 'td:nth-child(2)'
				},
				responsive: true,
				dom: 'Bfrtip',
				buttons: [

				],
				columnDefs: [{
					"defaultContent": "-",
					"targets": "_all"
				  }]
			});
		} else {
			this.state.table.ajax.reload();
		}
	  }
	  insertUpdateRecord=()=>{
		if (!this.validator.fieldValid('bankName')
		|| !this.validator.fieldValid('bankCode')
		|| !this.validator.fieldValid('bankAddress')) 
		{
	    this.validator.showMessages();
	    this.forceUpdate();
  		 return false;
		   }
		   var method="post";
		   var url= defaultUrl+"Bank";
		   if(this.state.Action!="Insert Record")
		   {
			method="put";
			url= defaultUrl+"Bank/"+this.state.Id;
		   }
		   
		//   this.setState({bankName:'',bankCode:'',bankAddress:''})
		var obj = {
			BankName: this.state.bankName,
			BranchCode: this.state.bankCode,
			Address: this.state.bankAddress
		  };
		  axios.interceptors.request.use(function(config) {
			document.getElementById("fuse-splash-screen").style.display="none"
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
			this.getBankDetail();
			this.setState({
				bankName: "",
				bankCode: "",
				bankAddress: "",
				Action:'Insert Record',
				Id:0,
				value:0
			  });
			  document.getElementById("fuse-splash-screen").style.display="none";
			  Messages.success();
			})
			.catch((message) => {
				 document.getElementById("fuse-splash-screen").style.display="none"
				console.log(message);
				// error();
			  this.setState({
				bankName: "",
				bankCode: "",
				bankAddress: "",
				Action:'Insert Record',
				Id:0,
				value:0
				})
			})
	  }
	  deleteBank=()=>{
		var ids=localStorage.getItem("ids");
		if(ids===null)
		{
			Messages.warning("No Record Selected");
		return false;
		}
		document.getElementById("fuse-splash-screen").style.display="block"
		axios({
			method: "delete",
			url: defaultUrl+"Bank/"+ids,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				
				this.getBankDetail();
				document.getElementById("fuse-splash-screen").style.display="none"
			})
			.catch((error) => {
				console.log(error);
				document.getElementById("fuse-splash-screen").style.display="none"
			})
	  }
	  getBankById=()=>{
		let ids = localStorage.getItem("ids")
		if(ids=== null || localStorage.getItem("ids").split(",").length>1)
		{
			Messages.warning("kindly Select one record");
			return false;
		}
		document.getElementById("fuse-splash-screen").style.display="block"
		axios({
			method: "get",
			url: defaultUrl+"Bank/"+ids,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Action:'Update Record',value:1,bankName:response.data[0].BankName,bankCode:response.data[0].BranchCode,bankAddress:response.data[0].Address,
					Id:response.data[0].Id});
					document.getElementById("fuse-splash-screen").style.display="none"
			})
			.catch((error) => {
				document.getElementById("fuse-splash-screen").style.display="none"
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
					<div className="p-24"><h4>Bulk Upload</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Upload Bulk Data</h4></div>
				}
				content={

					<div className={classes.root}>
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
											<InputLabel htmlFor="company">Company</InputLabel>
											<Select
												value={this.state.company}
												onChange={this.handleChange}
												inputProps={{
													name: 'company',
													id: 'company',
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
													<MenuItem value="Bank">Bank</MenuItem>
											</Select>
											{this.validator.message('company', this.state.company, 'required')}
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField type="file" id="bankCode" fullWidth label="Branch Code" InputLabelProps={{
												shrink: true,
											}}
											 name="bankCode" value={this.state.bankCode} onChange={this.handleChange} />
									{this.validator.message('bankCode', this.state.bankCode, 'required')}
									</Grid>
								
								</form>
								<div className="row">
								<Grid item xs={12} sm={10}  >
									<div style={{float: "right","marginRight":"8px"}}>
									
									<Button variant="outlined" color="secondary" className={classes.button } style={{marginTop:"10px"}} onClick={this.insertUpdateRecord} >
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

export default withStyles(styles, { withTheme: true })(BulkUpload);