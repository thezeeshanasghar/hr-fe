import CostCenter from './CostCenter';

export const CostCenterConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/CostCenter',
            component: CostCenter
        }
    ]
};