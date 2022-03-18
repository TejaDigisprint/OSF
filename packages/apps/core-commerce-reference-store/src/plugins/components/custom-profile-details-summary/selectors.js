/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getCurrentProfileId, getProfile, isAuthenticated} from '@oracle-cx-commerce/commerce-utils/selector';

export const getPageData = state => {
  return {
    ...getProfile(state),
    isUserLoggedIn: isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous'
  };
};
