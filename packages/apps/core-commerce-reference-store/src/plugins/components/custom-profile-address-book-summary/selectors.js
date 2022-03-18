/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  getContactInfos,
  getDefaultShippingAddressId,
  getEndpointStatus,
  getProfileShippingAddresses
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const isGetCurrentProfileInProgress = getEndpointStatus(state).getCurrentProfile
    ? getEndpointStatus(state).getCurrentProfile.inProgress
    : 1;
  const defaultShippingAddressId = getDefaultShippingAddressId(state);
  const shippingAddresses = getProfileShippingAddresses(state);
  const contactInfos = getContactInfos(state);
  let defaultAddress;
  if (contactInfos) {
    if (defaultShippingAddressId) {
      defaultAddress = contactInfos[defaultShippingAddressId];
    } else if (shippingAddresses && shippingAddresses.length > 0) {
      const firstShippingAddress = shippingAddresses[0];
      defaultAddress = contactInfos[firstShippingAddress];
    }
  }

  return {
    isGetCurrentProfileInProgress,
    defaultAddress,
    defaultShippingAddressId
  };
};
