/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  getCartEndpointStatus,
  getGiftWithPurchaseMessages,
  getCurrentOrder,
  getSkuInventoryItems,
  getCurrentOrderId,
  getOrder,
  getPage
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const orderId = getPage(state).contextId;
  const currentOrder = orderId ? getOrder(state, {id: orderId}) : getCurrentOrder(state);
  const skuInventory = getSkuInventoryItems(state);
  const totalGwpMessages = getGiftWithPurchaseMessages(state) || {};
  const giftWithPurchaseMessages = totalGwpMessages[getCurrentOrderId(state)]
    ? totalGwpMessages[getCurrentOrderId(state)].messages
    : [];

  const isGetCartInProgress = getCartEndpointStatus(state);
  const saveforlateritemsCount = state && state.saveForLater &&  state.saveForLater.saveforlater && state.saveForLater.saveforlater.length

  return {
    currentOrder,
    skuInventory,
    giftWithPurchaseMessages,
    isGetCartInProgress,
    saveforlateritemsCount
  };
};
