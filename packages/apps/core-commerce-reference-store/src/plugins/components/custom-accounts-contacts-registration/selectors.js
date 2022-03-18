/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getShippingCountries} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const shippingCountries = getShippingCountries(state);

  return {
    shippingCountries
  };
};
