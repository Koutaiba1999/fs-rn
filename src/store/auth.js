// Action types
const RETRIEVE_DATA = "retrieveData";
const LOGIN = "login";
const LOGOUT = "logout";
const REGISTER = "register";
const SET_ORGANIZATION = "setOrganization";


// Actions
export const retrieveData = ({ userToken, member, orgId }) => {
    return {
        type: RETRIEVE_DATA,
        payload: {
            userToken,
            member,
            orgId,
            isLoading: false,
        },
    };
};
export const login = (userToken, member) => {
    return {
        type: LOGIN,
        payload: {
            userToken,
            member,
            isLoading: false,
        },
    };
};
export const logout = () => {
    return {
        type: LOGOUT,
        payload: {
            userToken: null,
            member: {},
            
        },
    };
};
export const register = (data, token) => {
    return {
        type: REGISTER,
        payload: {
            ...data,
            userToken: token,
            isLoading: false,
        },
    };
};


export const setStateConnection = (isConnected) => {
    return {
        type: SET_ORGANIZATION,
        payload: {
            isConnected,
        },
    };
};



const initState = {
    isLoading: true,
    userName: null,
    userToken: null,
    member: {},
    
    isConnected: true,
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case RETRIEVE_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case LOGIN:
            return {
                ...state,
                ...action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                ...action.payload,
            };
        case REGISTER:
            return {
                ...state,
                ...action.payload,
            };
       
  
        default:
            return state;
    }
}