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

const routeConfigs = [
    ExampleConfig,
    BankConfig,
    CostCenterConfig,
    CountryLawsConfig,
    CurrencyExchangeConfig,
    CompanyConfig,
    ElementGroupConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    },
  
];

 export default routes;
