/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getCurrentOrderId, getPage} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const currentPage = getPage(state);
  const orderId = currentPage.contextId ? currentPage.contextId : getCurrentOrderId(state);

  return {
    currentPageType: currentPage.pageType,
    orderId
  };
};
