const PREFIX_URL = "/excels";

export const exportExcel = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const excelUrlWithQueryParams = `${api.defaults.baseURL}${PREFIX_URL}/export/${extra.key}`;
      payload.params["auth_token"] = api.defaults.headers[
        "Authorization"
      ].replace("Bearer ", "");
      const queryParams = new URLSearchParams(payload.params);
      window.open(
        `${excelUrlWithQueryParams}?${queryParams.toString()}`,
        "_blank"
      );
      return {
        data: {},
      };
    },
  };
};
