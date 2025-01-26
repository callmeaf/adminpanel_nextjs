import { useState } from "react";

const useModal = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const [open, setOpen] = useState(false);

  const toggleHandler = (newState = {}, value, keepOldState = false) => {
    setOpen(value ?? !open);
    setState(
      keepOldState
        ? {
            ...state,
            ...newState,
          }
        : newState
    );
  };

  const openHandler = (newState, keepOldState) =>
    toggleHandler(newState, true, keepOldState);

  const closeHandler = (newState, keepOldState) =>
    toggleHandler(newState, false, keepOldState);

  return {
    open,
    state,
    openHandler,
    closeHandler,
    toggleHandler,
  };
};

export default useModal;
