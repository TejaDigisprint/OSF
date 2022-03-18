/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getCurrentOrder, getCurrentProfileId, isAuthenticated} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const {numberOfItems} = getCurrentOrder(state);
  const isUserLoggedIn = isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous';

  return {
    numberOfItems,
    isUserLoggedIn
  };
};
