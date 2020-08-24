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
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
import { colors, Icon, Input, MuiThemeProvider } from '@material-ui/core';
//  import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import SimpleReactValidator from 'simple-react-validator';
import defaultUrl from "../../../app/services/constant/constant";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
function createData(Code, Description) {
	id += 1;
	return { Code, Description };
}

const rows = [
	createData("Code", "Description")
];

class Unit extends Component {
	state = {
		value: 0,
		code: "",
		description: "",
		companyId: "",
		Companies:[],
		Units: [],
		Id: 0,
		Action: 'Insert Record'

	};
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
	
	  }

	  componentDidMount(){
		this.getUnitDetail();
		this.getCompanyDetail();
	}
	  
	  handleTab = (event, value) => {
		this.setState({ value });
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	getUnitDetail=()=>{
		axios({
			method: "get",
			url: defaultUrl+"unit",
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Units:response.data});
			})
			.catch((error) => {
				console.log(error);
			})
	  }

	  insertUpdateRecord=()=>{
		if (!this.validator.allValid()) 
		{
			console.log("false");
	    this.validator.showMessages();
	    this.forceUpdate();
  		 return false;
		   }
		   console.log("true");
		//   this.setState({bankName:'',bankCode:'',bankAddress:''})
		var method="post";
		var url= defaultUrl+"unit";
		if(this.state.Action!="Insert Record")
		{
		 method="put";
		 url= defaultUrl+"unit/"+this.state.Id;
		}


		var obj = {
			Code: this.state.code,
			Description: this.state.description,
			CompanyId: this.state.companyId
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
				value:0,
				code: "",
				description: '',
				companyId: 0,
				Action:'Insert Record',
				Id:0
			  });
			})
			.catch((error) => {
				console.log(error);
			  this.setState({
				code: "",
				description: '',
				Action:'Insert Record',
				Id:0
				})
			}).finally(()=>{
			//   document.getElementsByClassName("loader-wrapper")[0].style.display="none";
			});
	  }

	  deleteUnit=(id)=>{
		axios({
			method: "delete",
			url: defaultUrl+"unit/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				
				this.getUnitDetail();
			})
			.catch((error) => {
				console.log(error);
			})
	  }
	  getUnitById=(id)=>{
		axios({
			method: "get",
			url: defaultUrl+"unit/"+id,
			headers: {
			  // 'Authorization': `bearer ${token}`,
			  "Content-Type": "application/json;charset=utf-8",
			},
		  })
			.then((response) => {
				console.log(response);
				this.setState({Action:'Update Record',value:1,code:response.data[0].Code,description:response.data[0].Description, Id:response.data[0].Id });
			})
			.catch((error) => {
				console.log(error);
			})
	  }
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
	render() {
		const { classes, theme } = this.props;

		return (
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="p-24"><h4>Unit</h4></div>
				}
				contentToolbar={
					<div className="px-24"><h4>Add New Unit</h4></div>
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
											<Button variant="contained" color="secondary" style={{ 'marginRight': '2px' }} className={classes.button}>
												PRINT
      								</Button>
										</Paper>
									</MuiThemeProvider>
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<CustomTableCell align="center"  >Code</CustomTableCell>
												<CustomTableCell align="center" >Description</CustomTableCell>
												<CustomTableCell align="center" >Company</CustomTableCell>
												<CustomTableCell align="center" >Action</CustomTableCell>

											</TableRow>
										</TableHead>
										<TableBody>
										{this.state.Units.map(row => (
												<TableRow className={classes.row} key={row.Id}>

													<CustomTableCell align="center">{row.Code=="" || row.Code==null || row.Code == undefined ?'N/A':row.Code}</CustomTableCell>
													<CustomTableCell align="center" component="th" scope="row">
														{row.Description=="" || row.Description==null || row.Description == undefined ?'N/A':row.Description}
													</CustomTableCell>
													<CustomTableCell align="center">{row.CompanyId=="" || row.CompanyId==null || row.CompanyId == undefined ?'N/A':row.CompanyId}</CustomTableCell>
													
													<CustomTableCell align="center" component="th" scope="row">
														<IconButton className={classes.button} onClick={()=>this.deleteUnit(row.Id)}  aria-label="Delete">
															<DeleteIcon />
														</IconButton>
														<IconButton className={classes.button} onClick={()=>this.getUnitById(row.Id)} aria-label="Edit">
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
								<TextField id="code" fullWidth label="Unit Code" name="code" value={this.state.code} onChange={this.handleChange} />
								{this.validator.message('code', this.state.code, 'required')}
									</Grid>
									<Grid item xs={12} sm={5}  >
									<TextField id="description" fullWidth label="Description" name="description" value={this.state.description} onChange={this.handleChange} />
									{this.validator.message('decription', this.state.description, 'required')}
									</Grid>

									<Grid item xs={12} sm={5} >
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="company">Company</InputLabel>
										<Select
											value={this.state.companyId}
											onChange={this.handleChange}
											inputProps={{
												name: 'companyId',
												id: 'companyId',
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											
											{this.state.Companies.map(row => (
													<MenuItem value={row.Id}>{row.CompanyName}</MenuItem>
												))} 
										</Select>
									</FormControl>
									</Grid>
									

								</form>
								<div className="row">
									<div style={{ float: "right", "marginRight": "8px" }}>

										<Button variant="outlined" color="secondary" className={classes.button}onClick={this.insertUpdateRecord}>
										{this.state.Action}
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

export default withStyles(styles, { withTheme: true })(Unit);