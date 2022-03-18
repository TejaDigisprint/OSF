/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  getPage,
  getOrder,
  getCurrentOrder,
  getCurrentOrderId,
  getCartEndpointStatus,
  getUUID,
  getGiftWithPurchaseMessages,
  getCurrentOrderScheduleInfo
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const currentOrderId = getCurrentOrderId(state);
  const contextOrderId = getPage(state).contextId;
  const currentOrder = contextOrderId ? getOrder(state, {id: contextOrderId}) : getCurrentOrder(state);

  const orderId = contextOrderId ? contextOrderId : currentOrderId;

  const uuid = getUUID(state) || '';
  const {
    shippingGroups = {},
    commerceItems = {},
    paymentGroups = {},
    billingAddress = {},
    state: orderState = ''
  } = currentOrder;
  const isGetCartInProgress = getCartEndpointStatus(state);
  const totalGwpMessages = getGiftWithPurchaseMessages(state) || {};
  const giftWithPurchaseMessages = totalGwpMessages[getCurrentOrderId(state)]
    ? totalGwpMessages[getCurrentOrderId(state)].messages
    : [];
  const scheduleInfo = getCurrentOrderScheduleInfo(state);

  return {
    shippingGroups,
    commerceItems,
    paymentGroups,
    billingAddress,
    isGetCartInProgress,
    isPlaceOrderInProgress: !orderId && uuid !== '',
    giftWithPurchaseMessages,
    scheduleInfo,
    orderState
  };
};
