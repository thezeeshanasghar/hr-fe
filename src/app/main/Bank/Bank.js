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


class Bank extends Component {
	state = {
		value: 0,
		bankName:'',
		bankCode:'',
		bankAddress:'',
		Banks:[],
		Id:0,
		Action:'Insert Record'
	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
	
	  }
	  componentDidMount(){
		  this.getBankDetail();
	  }
	handleTab = (event, value) => {
		this.setState({ value });
	};
	handleChange = (e) => {
        
        this.setState({ [e.target.name]: e.target.value });
	  };
	  getBankDetail=()=>{
		axios({
			method: "get",
			url: defaultUrl+"Bank",
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Banks:response.data});
			})
			.catch((error) => {
				console.log(error);
			})
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
			toastr.success('Operation successfull');	
			this.getBankDetail();
			this.setState({
				bankName: "",
				bankCode: "",
				bankAddress: "",
				Action:'Insert Record',
				Id:0
			  });
			})
			.catch((error) => {
				console.log(error);
				toastr.error('Operation unsuccessfull');
			  this.setState({
				bankName: "",
				bankCode: "",
				bankAddress: "",
				Action:'Insert Record',
				Id:0
				})
			})
	  }
	  deleteBank=(id)=>{
		axios({
			method: "delete",
			url: defaultUrl+"Bank/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				
				this.getBankDetail();
			})
			.catch((error) => {
				console.log(error);
			})
	  }
	  getBankById=(id)=>{
		axios({
			method: "get",
			url: defaultUrl+"Bank/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Action:'Update Record',value:1,bankName:response.data[0].BankName,bankCode:response.data[0].BranchCode,bankAddress:response.data[0].Address,
					Id:response.data[0].Id});
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
					<div className="p-24"><h4>Bank</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Bank</h4></div>
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
								<Tab label="Add New Bank" />
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
												<CustomTableCell align="center" >Bank Name</CustomTableCell>
												<CustomTableCell align="center">Address</CustomTableCell>
												<CustomTableCell align="center">Action</CustomTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.Banks.map(row => (
												<TableRow className={classes.row} key={row.Id}>

													<CustomTableCell align="center">{row.BankName=="" || row.BankName==null || row.BankName == undefined ?'N/A':row.BankName}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Address=="" || row.Address==null || row.Address == undefined ?'N/A':row.Address}
													</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} onClick={()=>this.deleteBank(row.Id)}  aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} onClick={()=>this.getBankById(row.Id)} aria-label="Edit">
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
								<TextField id="bankName" fullWidth label="Bank Name" name="bankName" value={this.state.bankName} onChange={this.handleChange} />
								{this.validator.message('bankName', this.state.bankName, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField id="bankCode" fullWidth label="Branch Code" name="bankCode" value={this.state.bankCode} onChange={this.handleChange} />
									{this.validator.message('bankCode', this.state.bankCode, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField id="bankAddress" fullWidth label="Bank Address" name="bankAddress" value={this.state.bankAddress} onChange={this.handleChange} />
									{this.validator.message('bankAddress', this.state.bankAddress, 'required')}
									</Grid>
								
								</form>
								<div className="row">
								<Grid item xs={12} sm={10}  >
									<div style={{float: "right","marginRight":"8px"}}>
									
									<Button variant="outlined" color="secondary" className={classes.button } onClick={this.insertUpdateRecord} >
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

export default withStyles(styles, { withTheme: true })(Bank);