import { getEnums } from "./base-thunks";

const PREFIX_URL = "/variations";

export const getVariationEnums = (
  api,
  payload = {
    keys: ["variation"],
  }
) => getEnums(api, payload);
