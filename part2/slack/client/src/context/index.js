import { createContext, useReducer } from "react";
import {
    AUTH_INFO,
    USER_LIST,
    CURRENT_CHAT,
    GROUP_CHAT,
    GROUP_LIST,
} from "./action";

// 1
const initialState = {
    loginInfo: {
        userId: "",
        socketId: "",
    },
    userList: [],
    groupList: [],
    currentChat: {
        targetId: [],
        roomNumber: "",
        targetSocketId: "",
    },
    groupChat: {
        textBarStatus: false,
        groupChatNames: [],
    },
};

const Context = createContext({});

// 2
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INFO:
            return {
                ...state,
                loginInfo: action.payload,
            };
        case USER_LIST:
            return {
                ...state,
                userList: action.payload,
            };
        case GROUP_LIST:
            return {
                ...state,
                groupList: action.payload,
            };
        case CURRENT_CHAT:
            return {
                ...state,
                currentChat: action.payload,
            };
        case GROUP_CHAT:
            return {
                ...state,
                groupChat: action.payload,
            };
        default:
            return state;
    }
};

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, StoreProvider };
