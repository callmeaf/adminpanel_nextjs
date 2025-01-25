import { useContext, useEffect } from "react";
import { UiContext } from "@/context/ui/ui-context";
import { useSnackbar } from "notistack";

const SnackbarLayout = () => {
  const { state: uiState } = useContext(UiContext);
  const { message } = uiState;

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (message.body && message.body.trim().length !== 0) {
      enqueueSnackbar(message.body, { variant: message.type });
    }
  }, [message.body]);

  return;
};

export default SnackbarLayout;
