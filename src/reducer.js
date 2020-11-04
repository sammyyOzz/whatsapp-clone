export const initialState = {
    user: null,
    mobileMenu: false
}

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_MENU: "SET_MENU"
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionTypes.SET_MENU:
            return {
                ...state,
                mobileMenu: action.mobileMenu
            }

        default: 
            return state;
    }
}

export default reducer;