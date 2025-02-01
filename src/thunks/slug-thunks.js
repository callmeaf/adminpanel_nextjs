const PREFIX_URL = "/slugs";

export const uniqueSlug = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/${extra.type}/unique`, payload);
    },
    onSuccess: async ({ result, finalData }) => {
      finalData.slug = result.value;
    },
  };
};
