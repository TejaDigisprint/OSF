/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Failure handler
 */
const onNotOk = (action, {error: {message = ''} = {}} = {}) => {
  action('notify', {level: 'error', message});
};

/**
 * Invoke the necessary actions to fetch data for the Product Details.
 *
 * @param {function}  action function to invoke store actions
 * @param {string}  productId the id of the product whose data needs to be fetched
 * @param {function}  onOk function to be called on successful data fetching
 */

export const getData = (action, productId, onOk = noop) => {
  // First fetch the product details
  action('getProduct', {productId})
    .then(getProductResponse => {
      if (getProductResponse.ok) {
        const products = [];
        Object.keys(getProductResponse.delta.catalogRepository.skus).forEach(skuId => {
          products.push(`${productId}:${skuId}`);
        });

        // Then fetch the product price
        action('getProductsPrices', {
          productIds: [productId]
        }).then(getProductsPricesResponse => {
          if (getProductsPricesResponse.ok) {
            // Then fetch the stock status
            action('getStockStatus', {
              products
            }).then(getStockStatusResponse => {
              if (getStockStatusResponse.ok) {
                onOk({getProductResponse, getProductsPricesResponse, getStockStatusResponse});
              } else {
                onNotOk(action, {getStockStatusResponse});
              }
            });
          } else {
            onNotOk(action, {getProductsPricesResponse});
          }
        });
      } else {
        onNotOk(action, {getProductResponse});
      }
    })
    .catch(error => {
      onNotOk(action, {error});
    });
};
