/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.
 */

import {
  getCurrencyCode,
  getCurrencySymbol,
  getCurrentOrder,
  getCurrentPriceListGroup,
  getOrder,
  getPage,
  isCurrentUserB2B
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getOrderData = state => {
  const contextOrderId = getPage(state).contextId;
  const currentOrder = contextOrderId ? getOrder(state, {id: contextOrderId}) : getCurrentOrder(state);
  const isB2BUser = isCurrentUserB2B(state);
  const currentPriceListGroup = getCurrentPriceListGroup(state);
  const currencyCode = getCurrencyCode(state);
  const symbol = getCurrencySymbol(state);

  return {
    currentOrder,
    currentPriceListGroup,
    isB2BUser,
    currencyCode,
    symbol
  };
};
