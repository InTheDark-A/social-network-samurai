import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false,
};

type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED-SUCCESS' as const})
};

type ThunkType = BaseThunkType<ActionsTypes>;
export const initializeApp = ():ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    });
};

export default appReducer;