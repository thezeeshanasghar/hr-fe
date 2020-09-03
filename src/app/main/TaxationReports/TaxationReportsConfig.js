import TaxationReports from './TaxationReports';

export const TaxationReportsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/TaxationReports',
            component: TaxationReports
        }
    ]
};