/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  getSkuInventory,
  getGlobalContext,
  getCurrentProfile,
  isAuthenticated
} from '@oracle-cx-commerce/commerce-utils/selector';
import {ProductContext, StoreContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {useContext} from 'react';

/**
 * Returns data required by the component by invoking selectors
 *
 * @return {Object} Object
 */
export const usePageData = () => {
  const {id: productId = null} = useContext(ProductContext);

  const authenticated = useSelector(isAuthenticated);
  const profile = useSelector(getCurrentProfile);
  const {site: siteId, locale} = useSelector(getGlobalContext);

  // selectors
  const {selections: {skuId = null} = {}} = useContext(ContainerContext);
  const {action} = useContext(StoreContext);
  const {default: {stockStatus} = {}} = useSelector(getSkuInventory, {skuId});

  return {
    stockStatus,
    productId,
    skuId,
    action,
    authenticated,
    profile,
    siteId,
    locale
  };
};
