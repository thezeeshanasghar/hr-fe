import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {DashboardConfig} from 'app/main/dashboard/DashboardConfig';
import {BankConfig} from 'app/main/Bank/BankConfig';
import {CostCenterConfig} from 'app/main/CostCenter/CostCenterConfig';
import {CountryLawsConfig} from 'app/main/CountryLaws/CountryLawsConfig';
import {CurrencyExchangeConfig} from 'app/main/CurrencyExchange/CurrencyExchangeConfig';
import {CompanyConfig} from 'app/main/company/CompanyConfig';
import {EmployeeConfig} from 'app/main/Employee/EmployeeConfig';
import {GLAccountConfig} from 'app/main/GLAccount/GLAccountConfig';
import {GradesConfig} from 'app/main/Grades/GradesConfig';
import {PayElementConfig} from 'app/main/PayElement/PayElementConfig';
import {JobsConfig} from 'app/main/Jobs/JobsConfig';
import {PositionConfig} from 'app/main/Position/PositionConfig';
import {PayElementGlAccountConfig} from 'app/main/PayElementGlAccount/PayElementGlAccountConfig';
import {UnitConfig} from 'app/main/Unit/UnitConfig';
import {UnpaidLeavesConfig} from 'app/main/UnpaidLeaves/UnpaidLeavesConfig';
import {UserProtectionConfig} from 'app/main/UserProtection/UserProtectionConfig';
import {LoginConfig} from 'app/main/Login/LoginConfig'
import {SalaryPayRollConfig} from 'app/main/SalaryPayRoll/SalaryPayRollConfig.js'
import {EmployeeReportsConfig} from 'app/main/EmployeeReports/EmployeeReportsConfig'
import {EmployeeVarianceReportConfig} from 'app/main/EmployeeVarianceReport/EmployeeVarianceReportConfig'
import {PayrollReportsConfig} from 'app/main/PayrollReports/PayrollReportsConfig'
import {BulkUploadConfig} from 'app/main/BulkUpload/BulkUploadConfig'
const routeConfigs = [
    DashboardConfig,
    BankConfig,
    CostCenterConfig,
    CountryLawsConfig,
    CurrencyExchangeConfig,
    CompanyConfig,
    EmployeeConfig,
    GLAccountConfig,
    GradesConfig,
    PayElementConfig,
    JobsConfig,
    PositionConfig,
    PayElementGlAccountConfig,
    UnitConfig,
    UnpaidLeavesConfig,
    UserProtectionConfig,
    LoginConfig,
    SalaryPayRollConfig,
    EmployeeReportsConfig,
    PayrollReportsConfig,
    EmployeeVarianceReportConfig,
    BulkUploadConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/dashboard"/>
    }
];

 export default routes;
