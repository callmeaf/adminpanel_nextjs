import { callIfFunction } from "@/helpers";
import { useState } from "react";

const useAutoCompleteOptions = (
  fetchHandler,
  {
    preventFetchOnOpen = null,
    preventFetchOnScroll = null,
    preventFetchOnSearch = null,
    searchParams = [],
  } = {}
) => {
  const [options, setOptions] = useState({});
  const [cleanOptions, setCleanOptions] = useState({});

  const searchQueryParams = (searchValue) =>
    Object.fromEntries(
      searchParams.map((searchParam) => [searchParam, searchValue])
    );

  const onOpen = async () => {
    if (preventFetchRequest("open")) {
      return;
    }
    const fetchData = await fetchHandler();
    setOptions(fetchData);
    setCleanOptions(fetchData);
  };

  const onScroll = async ({ searchValue }) => {
    if (preventFetchRequest("scroll")) {
      return;
    }
    const params = searchQueryParams(searchValue);
    params.page = options.pagination?.meta?.nextPage;
    const fetchData = await fetchHandler({
      params: params,
    });
    const fetchDataMerged = fetchData.mergeData(options.data);
    setOptions(fetchDataMerged);
    if (!searchValue) {
      setCleanOptions(fetchDataMerged);
    }
  };

  const onSearch = async ({ searchValue }) => {
    if (preventFetchRequest("search")) {
      return;
    }

    const fetchData = await fetchHandler({
      params: searchQueryParams(searchValue),
    });
    if (searchValue) {
      setOptions(fetchData);
    } else {
      setOptions(cleanOptions);
    }
  };

  const preventFetchRequest = (type) => {
    switch (type) {
      case "open":
        return callIfFunction(
          preventFetchOnOpen,
          options.data && options.data.length !== 0
        );
      case "scroll":
        return callIfFunction(
          preventFetchOnScroll,
          options.pagination && !options.pagination.meta.hasNextPage()
        );
      case "search":
        return callIfFunction(preventFetchOnSearch, false);
    }
  };

  return {
    options,
    onOpen,
    onScroll,
    onSearch,
  };
};

export default useAutoCompleteOptions;
