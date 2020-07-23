import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {BankConfig} from 'app/main/Bank/BankConfig';

const routeConfigs = [
    ExampleConfig,
    BankConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    },
  
];

 export default routes;
