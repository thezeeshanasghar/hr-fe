import ElementGroup from './ElementGroup';

export const ElementGroupConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/elementgroup',
            component: ElementGroup
        }
    ]
};

/**
 * Lazy load Example
 */
/*
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: FuseLoadable({
                loader: () => import('./Example')
            })
        }
    ]
};
*/
