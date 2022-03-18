/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  getCardTypes,
  isAuthenticated,
  isCurrentUserB2B,
  getCurrentProfileId
} from '@oracle-cx-commerce/commerce-utils/selector';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

export const getPageData = state => {
  const cardTypes = getCardTypes(state);

  return {
    //an empty object is always treated as new object and causes render of widget so explicitly
    //check if card types is not empty object then only return it otherwise return undefined
    cardTypes: !isEmptyObject(cardTypes) ? cardTypes : undefined,
    isUserLoggedIn: isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous',
    isB2BUser: isCurrentUserB2B(state)
  };
};
