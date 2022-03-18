/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext, useEffect} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useComponentData} from '@oracle-cx-commerce/react-widgets/product/product-price/selectors';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {t} from '@oracle-cx-commerce/utils/generic';

const OPTIONS = {style: 'currency'};

/**
 * Widget to display the price of a selected product/sku
 */
const CustomProductPrice = props => {
  // resources
  const {
    textPriceRange,
    alertPriceUnavailable,
    textSalePriceNow,
    textSalePriceWas,
    textQuantity,
    textPrice,
    textQuantityAndAbove
  } = props;

  // selectors
  const {
    pricesLoaded = false,
    skuId,
    productId,
    skuListPrice,
    skuSalePrice,
    priceMin,
    priceMax,
    priceRange,
    productListPrice,
    productSalePrice,
    skuListVolumePrice = [],
    skuSaleVolumePrice = [],
    skuListVolumeBulkPrice = [],
    skuSaleVolumeBulkPrice = []
  } = useComponentData();

  const formatCurrency = useNumberFormatter(OPTIONS);
  const {action} = useContext(StoreContext);

  useEffect(() => {
    if (productId) {
      action('getProductsPrices', {productIds: [productId]});
    }
    if (skuId) {
      action('getSkusPrices', {skuIds: [skuId]});
    }
  }, [action, productId, skuId]);

  // helpers
  /**
   * Formats price and displays alternate text if null price
   * @param  {Number} price Price
   * @param  {String} altPriceMsg Alternate text when price is unavailable
   * @return {String} formattedPrice Formatted price based on locale
   */
  const formatPrice = ({price, altPriceMsg}) => {
    return typeof price === 'number' ? formatCurrency(price) : altPriceMsg;
  };

  /**
   * Formats price and displays alternate text if null price
   * @param  {Number} price Price
   * @return {String} formattedPrice formattedPrice Formatted price based on locale
   */
  const formatPriceWithAltMsg = price => {
    return formatPrice({price, altPriceMsg: alertPriceUnavailable});
  };

  /**
   * List price
   */
  const listPrice = () => {
    return skuId ? skuListPrice : productListPrice;
  };

  /**
   * Sale price
   */
  const salePrice = () => {
    return skuId ? skuSalePrice : productSalePrice;
  };

  /**
   * Price range
   */
  const PriceRange = () => {
    return (
      <span>
        {t(textPriceRange, {minPrice: formatPriceWithAltMsg(priceMin), maxPrice: formatPriceWithAltMsg(priceMax)})}
      </span>
    );
  };

  const ListPrice = () => {
    return <span>{formatPriceWithAltMsg(listPrice())}</span>;
  };

  const SalePrice = () => {
    return (
      <div className="ProductPrice__SaleWrapper CustomProductPrice">
        <span className="ProductPrice__Price--Was">
          {t(textSalePriceWas, {price: formatPriceWithAltMsg(listPrice())})}
        </span>
        <span className="ProductPrice__Price--Sale">
          {t(textSalePriceNow, {price: formatPriceWithAltMsg(salePrice())})}
        </span>
      </div>
    );
  };

  const VolumePrice = ({volumePriceList}) => {
    return (
      <div className="ProductPrice__ListVolumePriceWrapper">
        <ul>
          <li className="ProductPrice__ListVolumePriceWrapper--heading">
            <span className="ProductPrice__ListVolumePriceWrapper--quantity">{textQuantity}</span>
            <span className="ProductPrice__ListVolumePriceWrapper--price">{textPrice}</span>
          </li>
          {volumePriceList.map(item => (
            <li className="ProductPrice__ListVolumePriceWrapper--item" key={item.levelMinimum}>
              {item.levelMaximum ? (
                <span className="ProductPrice__ListVolumePriceWrapper--quantity">
                  {t(textPriceRange, {minPrice: item.levelMinimum, maxPrice: item.levelMaximum})}
                </span>
              ) : (
                <span className="ProductPrice__ListVolumePriceWrapper--quantity">
                  {t(textQuantityAndAbove, {MINQUANTITY: item.levelMinimum})}
                </span>
              )}
              <span className="ProductPrice__ListVolumePriceWrapper--price">{formatPriceWithAltMsg(item.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderPrice = () => {
    if (pricesLoaded) {
      if (skuSaleVolumePrice && skuSaleVolumePrice.length) {
        return <VolumePrice volumePriceList={skuSaleVolumePrice} />;
      }
      if (skuSaleVolumeBulkPrice && skuSaleVolumeBulkPrice.length) {
        return <VolumePrice volumePriceList={skuSaleVolumeBulkPrice} />;
      }
      if (typeof salePrice() === 'number') {
        return <SalePrice />;
      }
      if (skuListVolumePrice && skuListVolumePrice.length > 0) {
        return <VolumePrice volumePriceList={skuListVolumePrice} />;
      }
      if (skuListVolumeBulkPrice && skuListVolumeBulkPrice.length > 0) {
        return <VolumePrice volumePriceList={skuListVolumeBulkPrice} />;
      }
      if (!skuId && priceRange) {
        return <PriceRange />;
      }

      return <ListPrice />;
    }

    return <span className="ProductPrice__Price--empty"> </span>;
  };

  return (
    <Styled id="ProductPrice" css={css}>
      <div className="ProductPrice">{renderPrice()}</div>
    </Styled>
  );
};

export default CustomProductPrice;
