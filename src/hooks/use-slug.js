import { uniqueSlug } from "@/thunks/slug-thunks";
import useApi from "./use-api";
import { useState } from "react";

let slugTimeout;

const useSlug = (type, { initialValue = "" } = {}) => {
  const [slug, setSlug] = useState(initialValue);
  const { handle, loading } = useApi();

  const uniqueSlugHandler = async (value) => {
    if (!value) {
      setSlug("");
      return;
    }
    const data = await handle(
      uniqueSlug,
      {
        payload: {
          params: {
            value,
          },
        },
        extra: {
          type,
        },
      },
      {
        showSuccessAlert: false,
      }
    );

    setSlug(data?.slug);
  };

  const onBlurInputHandler = (e) => {
    if (slugTimeout) {
      clearTimeout(slugTimeout);
    }

    slugTimeout = setTimeout(() => {
      uniqueSlugHandler(e.target.value.toString().trim());
    }, 500);
  };

  return {
    loading,
    slug,
    onBlurInputHandler,
  };
};

export default useSlug;
