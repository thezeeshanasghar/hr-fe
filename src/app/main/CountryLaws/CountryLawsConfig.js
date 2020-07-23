import CountryLaws from './CountryLaws';

export const CountryLawsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/CountryLaws',
            component: CountryLaws
        }
    ]
};