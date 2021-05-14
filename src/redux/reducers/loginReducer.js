const CHANGE_CURRENT_INPUT_TEXT = 'CHANGE_CURRENT_INPUT_TEXT';
const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';
const SET_USER_NAME = 'SET_USER_NAME';

let initialState = {
    isLoggined: false,
    currentInputText: '',
    userName: ''
}

let loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_CURRENT_INPUT_TEXT:
            return {
                ...state,
                currentInputText: action.currentInputText
            }
        case CHANGE_LOGIN_STATUS:
            return {
                ...state,
                isLoggined: action.isLoggined
            }

        case SET_USER_NAME:
            return {
                ...state,
                userName: action.userName
            }

        default: 
            return state
    }
}



//Action Creators
export const changeCurrentInputTextAC = (currentInputText) => {
    return {type: CHANGE_CURRENT_INPUT_TEXT, currentInputText: currentInputText}
}

export const changeLoginStatusAC = (isLoggined) => {
    return {type: CHANGE_LOGIN_STATUS, isLoggined: isLoggined}
}

export const setUserName = (userName) => {
    return {type: SET_USER_NAME, userName: userName}
}

export default loginReducer;