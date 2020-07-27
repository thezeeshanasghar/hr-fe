import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {BankConfig} from 'app/main/Bank/BankConfig';
import {CostCenterConfig} from 'app/main/CostCenter/CostCenterConfig';
import {CountryLawsConfig} from 'app/main/CountryLaws/CountryLawsConfig';
import {CurrencyExchangeConfig} from 'app/main/CurrencyExchange/CurrencyExchangeConfig';
import {CompanyConfig} from 'app/main/company/CompanyConfig';
import {ElementGroupConfig} from 'app/main/element_group/ElementGroupConfig';
import {EmployeeBankAccountConfig} from 'app/main/EmployeeBankAccount/EmployeeBankAccountConfig';
import {EmployeeConfig} from 'app/main/Employee/EmployeeConfig';

import {GLAccountConfig} from 'app/main/GLAccount/GLAccountConfig';
import {GradesConfig} from 'app/main/Grades/GradesConfig';
import {PayElementConfig} from 'app/main/PayElement/PayElementConfig';
import {JobsConfig} from 'app/main/Jobs/JobsConfig';
import {PositionConfig} from 'app/main/Position/PositionConfig';
import {PayElementGlAccountConfig} from 'app/main/PayElementGlAccount/PayElementGlAccountConfig';

import {SocialSecurityElementConfig} from 'app/main/SocialSecurityElement/SocialSecurityElementConfig';
import {UnitConfig} from 'app/main/Unit/UnitConfig';
import {UnpaidLeavesConfig} from 'app/main/UnpaidLeaves/UnpaidLeavesConfig';
import {UserProtectionConfig} from 'app/main/UserProtection/UserProtectionConfig';
const routeConfigs = [
    ExampleConfig,
    BankConfig,
    CostCenterConfig,
    CountryLawsConfig,
    CurrencyExchangeConfig,
    CompanyConfig,
    ElementGroupConfig,
    EmployeeBankAccountConfig,
    EmployeeConfig,
    GLAccountConfig,
    GradesConfig,
    PayElementConfig,
    JobsConfig,
    PositionConfig,
    PayElementGlAccountConfig,
    UnitConfig,
    SocialSecurityElementConfig,
    UnpaidLeavesConfig,
    UserProtectionConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    },
  
];

 export default routes;
