const navigationConfig = [
    {
        'id': 'Dashboard-component',
        'title': 'Dashboard',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/dashboard'
    },
    {

        'id': 'Configuration',
        'title': 'Configuration',
        'type': 'collapse',
        'icon': 'lock',
        'badge': {
            'title': 8,
            'bg': '#525e8a',
            'fg': '#FFFFFF'
        },
        'children': [
            {
                'id': 'Bank-component',
                'title': 'Bank',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/Bank'
            },

            {
                'id': 'company-component',
                'title': 'Company',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/company'
            },
            {
                'id': 'currencyexchange-component',
                'title': 'Currency Exchange',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/currencyexchange'
            },
            {
                'id': 'countrylaw-component',
                'title': 'Country Laws',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/countrylaw'
            },
            {
                'id': 'Grades-component',
                'title': 'Grades',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/grades'
            },
            {
                'id': 'Unit-component',
                'title': 'Unit',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/unit'
            },
            {
                'id': 'Position-component',
                'title': 'Position',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/position'
            },
            {
                'id': 'Jobs-component',
                'title': 'Jobs',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/job'
            }

        ]
    },
    {

        'id': 'Humanresource',
        'title': 'Human resource',
        'type': 'collapse',
        'icon': 'contacts',
        'badge': {
            'title': 4,
            'bg': '#525e8a',
            'fg': '#FFFFFF'
        },
        'children': [
            {
                'id': 'employee-component',
                'title': 'employee',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/employee'
            },
            {
                'id': 'UnpaidLeaves-component',
                'title': 'UnpaidLeaves',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/unpaidleaves'
            },
            {
                'id': 'UserProtection-component',
                'title': 'User Protection',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/userprotection'
            },
            {
                'id': 'SalaryPayRoll-component',
                'title': 'Salary Payroll',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/salarypayroll'
            },
            
            {
                'id': 'Termination-component',
                'title': 'Employee Termination',
                'type': 'item',
                'icon': 'whatshot',
                'url': '/termination'
            }
        ]
    },
    {

        'id': 'Accounts',
        'title': 'Accounts',
        'type': 'collapse',
        'icon': 'money',
        'badge': {
            'title': 5,
            'bg': '#525e8a',
            'fg': '#FFFFFF'
        },
        'children': [
    {
        'id': 'costcenter-component',
        'title': 'Cost Center',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/costcenter'
    },
    
    {
        'id': 'GLAccount-component',
        'title': 'GL Account',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/glaccount'
    }
    ,

    {
        'id': 'PayElement-component',
        'title': 'Pay Element',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/payelement'
    },

    {
        'id': 'PayElementGlAccount-component',
        'title': 'Pay Element GlAccount',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/payelementglaccount'
    }
        ]
    },    {

        'id': 'Reports',
        'title': 'Reports',
        'type': 'collapse',
        'icon': 'money',
        'badge': {
            'title': 3,
            'bg': '#525e8a',
            'fg': '#FFFFFF'
        },
        'children': [
           
    {
        'id': 'EmployeeReports',
        'title': 'Payment Reports',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/employeereports'
    },
    {
        'id': 'EmployeeVarianceReport',
        'title': 'Variance Reports',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/EmployeeVarianceReport'
    },
    {
        'id': 'EmployeeVarianceReportDetail',
        'title': 'Employee Wise Variance Reports',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/EmployeeVarianceReportDetail'
    },
    // {
    //     'id': 'PayrollReports',
    //     'title': 'Payroll Reports',
    //     'type': 'item',
    //     'icon': 'whatshot',
    //     'url': '/payrollreports'
    // },
        ]
    },
    {
        'id': 'BulkUpload-component',
        'title': 'Bulk Upload',
        'type': 'item',
        'icon': 'whatshot',
        'url': '/bulkupload'
    },
   
];



export default navigationConfig;
