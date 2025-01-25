const PREFIX_URL = "/excels";

export const exportExcel = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      window.open(
        `${api.defaults.baseURL}${PREFIX_URL}/export/${extra.key}?auth_token=${api.defaults.headers["Authorization"]}`,
        "_blank"
      );
      return {
        data: {},
      };
    },
  };
};
