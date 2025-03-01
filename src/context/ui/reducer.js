import {
  SET_IS_DARK_MODE,
  SET_LOADING_PAGE,
  SET_MESSAGE,
} from "@/context/ui/action-types";
import { MESSAGE_TYPES } from "@/context/ui/init-state";

export default (state, action) => {
  switch (action.type) {
    case SET_IS_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    case SET_MESSAGE:
      let message = action.payload;
      if (!message) {
        message = {
          type: MESSAGE_TYPES.SUCCESS,
          body: "",
        };
      }
      return {
        ...state,
        message,
      };
    case SET_LOADING_PAGE:
      return {
        ...state,
        loadingPage: action.payload,
      };
    default:
      return state;
  }
};
