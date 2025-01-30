const PREFIX_URL = "media";

export const deleteMedia = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.media_id}`);
    },
  };
};
