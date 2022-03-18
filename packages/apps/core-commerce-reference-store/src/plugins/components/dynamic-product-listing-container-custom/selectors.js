/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getSearchResults, isMobile} from '@oracle-cx-commerce/commerce-utils/selector';
import {getSearchResultsFetcherData} from '@oracle-cx-commerce/fetchers/search/selectors';

/**
 * This selector provides the subset of the application state
 * that is needed by the component. All of the properties in the
 * returned object will be passed to the component as props.
 */
export const getComponentData = state => {
  const {contextId, pageId, pageType} = getSearchResultsFetcherData(state);
  const searchResults = getSearchResults(state);
  const mobile = isMobile(state);

  return {
    contextId,
    pageId,
    pageType,
    searchResults,
    mobile
  };
};
