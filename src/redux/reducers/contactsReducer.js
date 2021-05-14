const GET_CONTACT_NAME = 'GET_CONTACT_NAME';
const GET_CONTACT_PHONE ='GET_CONTACT_PHONE';
const ADD_CONTACT = 'ADD_CONTACT';
const CLEAR_FIELDS = 'CLEAR_FIELDS';

let initialState = {
    contacts: [],
    currentContactName: '',
    currentContactPhone: ''
}

let contactsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CONTACT_NAME:
            return {
                ...state,
                currentContactName: action.currentContactName
            }
        
        case GET_CONTACT_PHONE:
            return {
                ...state,
                currentContactPhone: action.currentContactPhone
            }

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.newContact]
            }
        
        case CLEAR_FIELDS:
            return {
                ...state,
                currentContactName: '',
                currentContactPhone: ''
            }

        default: 
            return state
    }
}



//Action Creators
export const getContactNameAC = (currentContactName) => {
    return{type: GET_CONTACT_NAME, currentContactName: currentContactName}
}

export const getContactPhoneAC = (currentContactPhone) => {
    return{type: GET_CONTACT_PHONE, currentContactPhone: currentContactPhone}
}

export const addContactAC = (newContact) => {
    return{type: ADD_CONTACT, newContact: newContact}
}

export const clearFieldsAC = () => {
    return{type: CLEAR_FIELDS}
}

export default contactsReducer;