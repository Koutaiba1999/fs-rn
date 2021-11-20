// Action types
const RETRIEVE_DATA = "retrieveData";
const LOGIN = "login";
const LOGOUT = "logout";
const REGISTER = "register";
const SET_ORGANIZATION = "setOrganization";


// Actions
//une action pour schanger les variables user token et membre
export const retrieveData = ({ userToken, member }) => {
    return {
        type: RETRIEVE_DATA,
        payload: {
            userToken,
            member,
            
            isLoading: false,
        },
    };
};
//action pour stocker les informations d utilisateur lorsque il connecte
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
//action pour supprimer les informations de l'utilisateur lors de déconnexion
export const logout = () => {
    return {
        type: LOGOUT,
        payload: {
            userToken: null,
            member: {},
            
        },
    };
};
//action pour stocker les informations d inscription 
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






const initState = {
    isLoading: true,
    userName: null,
    userToken: null,
    member: {},
    
    
};
// selon le type d'action on change une variable du store
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