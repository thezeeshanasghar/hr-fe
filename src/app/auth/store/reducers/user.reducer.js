import * as Actions from '../actions';

const parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
var tokendata={};
if(localStorage.getItem('token'))
{
    tokendata = parseJwt(localStorage.getItem('token')); 
}

const initialState = {
    role: 'admin',
    data: {
        'displayName': tokendata.Name,
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : tokendata.Name+"@gmail.com",
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
      }
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
