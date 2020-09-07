// import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { FusePageSimple, DemoContent } from '@fuse';
// import AppBar from '@material-ui/core/AppBar';
// import defaultUrl from "../../services/constant/constant";



// const styles = theme => ({
// 	container: {
// 		display: 'flex',
// 		flexWrap: 'wrap',
// 	},
// 	textField: {
// 		marginLeft: theme.spacing.unit,
// 		marginRight: theme.spacing.unit,
		
// 	},
// 	dense: {
// 		marginTop: 16,
// 	},
// 	menu: {
// 		width: 200,
// 	},
// });



// class TaxationReports extends Component {
// 	state = {
// 		value: 0,
		
// 	};
// 	constructor(props) {
// 		super(props);
	
// 	  }
// 	  componentDidMount(){
	
// 	  }
	
	
// 	render() {
// 		const { classes, theme } = this.props;

// 		return (
// 			<FusePageSimple
// 				classes={{
// 					root: classes.layoutRoot
// 				}}
// 				header={
// 					<div className="p-24"><h4>Taxation Report</h4></div>
// 				}
// 				contentToolbar={
// 					<div className="px-24"><h4> TaxationReports </h4></div>
// 				}
// 				content={

// 					<div className={classes.root}>
// 						<AppBar position="static" color="default">
							
// 						</AppBar>
					
// 					</div>
// 				}
// 			/>
// 		)
// 	}
// }

// export default withStyles(styles, { withTheme: true })(TaxationReports);

import React, {Component} from 'react';
import {withStyles, Card, CardContent, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';
import axios from 'axios';

const styles = theme => ({
    root   : {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText
    },
    divider: {
        backgroundColor: theme.palette.divider
    }
});

class TaxationReports extends Component {

    state = {
        invoice: [
				{
					'id'      : '5725a6802d',
					'from'    : {
						'title'  : 'Fuse Inc.',
						'address': '2810 Country Club Road Cranford, NJ 07016',
						'phone'  : '+66 123 455 87',
						'email'  : 'hello@fuseinc.com',
						'website': 'www.fuseinc.com'
					},
					'client'  : {
						'title'  : 'John Doe',
						'address': '9301 Wood Street Philadelphia, PA 19111',
						'phone'  : '+55 552 455 87',
						'email'  : 'johndoe@mail.com'
					},
					'number'  : 'P9-0004',
					'date'    : 'Jul 19, 2015',
					'dueDate' : 'Aug 24, 2015',
					'services': [
						{
							'id'       : '1',
							'title'    : 'Prototype & Design',
							'detail'   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
							'unit'     : 'Hour',
							'unitPrice': '12.00',
							'quantity' : '240',
							'total'    : '2880'
						},
						{
							'id'       : '2',
							'title'    : 'Coding',
							'detail'   : 'Vestibulum ligula sem, rutrum et libero id, porta vehicula metus. Cras dapibus neque sit amet laoreet vestibulum.',
							'unit'     : 'Hour',
							'unitPrice': '10.50',
							'quantity' : '350',
							'total'    : '3675'
						},
						{
							'id'       : '3',
							'title'    : 'Testing',
							'detail'   : 'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
							'unit'     : 'Hour',
							'unitPrice': '4.00',
							'quantity' : '50',
							'total'    : '200'
						},
						{
							'id'       : '4',
							'title'    : 'Documentation & Training',
							'detail'   : 'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
							'unit'     : 'Hour',
							'unitPrice': '6.50',
							'quantity' : '260',
							'total'    : '1690'
						}
					],
					'subtotal': '8445',
					'tax'     : '675.60',
					'discount': '120.60',
					'total'   : '9000'
				}
			
			]
    };

    componentDidMount()
    {
    
	}


    render()
    {
		console.log(this.state.invoice[0]);
        const {classes} = this.props;
		let {invoice} = this.state.invoice[0];
		console.log(invoice);
        const formatter = new Intl.NumberFormat('en-US',
            {
                style                : 'currency',
                currency             : 'USD',
                minimumFractionDigits: 2
            });

        return (
            <div className={classNames(classes.root, "flex-grow flex-no-shrink p-0 sm:p-64 print:p-0")}>

(
					
                    <FuseAnimate animation={{translateY: [0, '100%']}} duration={600}>
						{/* {console.log(this.state.invoice[0])} */}
                        <Card className="mx-auto w-xl print:w-full print:shadow-none">

                            <CardContent className="p-88 print:p-0">

                                <div className="flex flex-row justify-between items-start">

                                    <div className="flex flex-col">

                                        <div className="flex items-center mb-80 print:mb-0">

                                            <img className="w-160 print:w-60" src="assets/images/logos/fuse.svg" alt="logo"/>

                                            <div className={classNames(classes.divider, "mx-48 w-px h-128 print:mx-16")}/>

                                            <div className="max-w-160">

                                                <Typography color="textSecondary">Fuse Inc.</Typography>

                                              
                                                    <Typography color="textSecondary">
                                                        2810 Country Club Road Cranford, NJ 07016
                                                    </Typography>
                                            
                                               
                                                    <Typography color="textSecondary">
                                                        <span>Phone:</span>
                                                        +66 123 455 87
                                                    </Typography>
                                                
                                               
                                                    <Typography color="textSecondary">
                                                        <span>Email:</span>
														hello@fuseinc.com
                                                    </Typography>
                                                
                                            
                                                    <Typography color="textSecondary">
                                                        <span>Web:</span>
                                                        www.fuseinc.com
                                                    </Typography>
                                            
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="flex justify-end items-center w-160 print:w-60">
                                                <Typography variant="h5" className="font-light print:text-16" color="textSecondary">CLIENT</Typography>
                                            </div>

                                            <div className={classNames(classes.divider, "mx-48 w-px h-128 print:mx-16")}/>

                                            <div className="max-w-160">

                                                <Typography color="textSecondary">John Doe</Typography>

                                            
                                                    <Typography color="textSecondary">
                                                       9301 Wood Street Philadelphia, PA 19111
                                                    </Typography>
                                             
                                              
                                                    <Typography color="textSecondary">
                                                        <span>Phone:</span>
														+55 552 455 87
                                                    </Typography>
                                             
                                              
                                                    <Typography color="textSecondary">
                                                        <span>Email:</span>
														johndoe@mail.com
                                                    </Typography>
                                              
                                               
                                                    <Typography color="textSecondary">
                                                        <span>Web:</span>
														johndoe@mail.com
                                                    </Typography>
                                    
                                            </div>
                                        </div>
                                    </div>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="pr-16 pb-32">
                                                    <Typography className="font-light" variant="h4" color="textSecondary">
                                                        INVOICE
                                                    </Typography>
                                                </td>
                                                <td className="pb-32">
                                                    <Typography className="font-light" variant="h4" color="inherit">
													P9-0004
                                                    </Typography>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="text-right pr-16">
                                                    <Typography color="textSecondary">
                                                        INVOICE DATE
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography color="inherit">
													Jul 19, 2015
                                                    </Typography>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="text-right pr-16">
                                                    <Typography color="textSecondary">
                                                        DUE DATE
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography color="inherit">
													Aug 24, 2015
                                                    </Typography>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="text-right pr-16">
                                                    <Typography color="textSecondary">
                                                        TOTAL DUE
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography color="inherit">
                                                        {formatter.format(9000)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-96 print:mt-0">

                                    <table className="simple invoice-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    SERVICE
                                                </th>
                                                <th>
                                                    UNIT
                                                </th>
                                                <th className="text-right">
                                                    UNIT PRICE
                                                </th>
                                                <th className="text-right">
                                                    QUANTITY
                                                </th>
                                                <th className="text-right">
                                                    TOTAL
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {invoice.services.map((service) => (
                                                <tr key={service.id}>
                                                    <td>
                                                        <Typography className="mb-8" variant="subtitle1">{service.title}</Typography>
                                                        <Typography variant="caption">{service.detail}</Typography>
                                                    </td>
                                                    <td>
                                                        {service.unit}
                                                    </td>
                                                    <td className="text-right">
                                                        {formatter.format(service.unitPrice)}
                                                    </td>
                                                    <td className="text-right">
                                                        {service.quantity}
                                                    </td>
                                                    <td className="text-right">
                                                        {formatter.format(service.total)}
                                                    </td>
                                                </tr>
                                            ))} */}
                                        </tbody>
                                    </table>

                                    <table className="simple">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">SUBTOTAL</Typography>
                                                </td>
                                                <td className="text-right">
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                        {formatter.format(this.state.invoice[0].subtotal)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">TAX</Typography>
                                                </td>
                                                <td className="text-right">
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                        {formatter.format(this.state.invoice[0].tax)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">DISCOUNT</Typography>
                                                </td>
                                                <td className="text-right">
                                                    <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                        {formatter.format(this.state.invoice[0].discount)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography className="font-light" variant="h4" color="textSecondary">TOTAL</Typography>
                                                </td>
                                                <td className="text-right">
                                                    <Typography className="font-light" variant="h4" color="textSecondary">
                                                        {formatter.format(this.state.invoice[0].total)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <div className="mt-96 print:mt-0 print:px-16">

                                    <Typography className="mb-24 print:mb-12" variant="body1">Please pay within 15 days. Thank you for your business.</Typography>

                                    <div className="flex">

                                        <div className="flex-no-shrink mr-24">
                                            <img className="w-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                                        </div>

                                        <Typography className="font-medium mb-64" variant="caption" color="textSecondary">
                                            In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque
                                            scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit
                                            quam at leo commodo, a suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia.
                                            Mauris placerat sem sit amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero
                                            tincidunt lacinia et eget eros.
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FuseAnimate>
                )
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(TaxationReports);
/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 **/
