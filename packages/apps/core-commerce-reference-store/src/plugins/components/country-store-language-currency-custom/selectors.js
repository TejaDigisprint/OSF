/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getGlobalContext, getRequestContext, getSite, getSites} from '@oracle-cx-commerce/commerce-utils/selector';

export const getSiteData = state => {
  const currentSite = getSite(state);
  const {additionalLanguages, priceListGroupList} = currentSite;
  const {priceListGroup, locale} = getGlobalContext(state);
  const {page} = getRequestContext(state);
  const allSites = getSites(state);

  return {
    additionalLanguages,
    allSites,
    priceListGroup,
    page,
    currentSite,
    locale,
    priceListGroupList
  };
};
