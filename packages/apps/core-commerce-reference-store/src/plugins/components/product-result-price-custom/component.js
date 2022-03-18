/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {t} from '@oracle-cx-commerce/utils/generic';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';

const OPTIONS = {style: 'currency'};

/**
 * Displays the product price for use in search results
 *
 * @param props
 */
const customProductResultPrice = props => {
  const {
    listPriceOnlyAfterText,
    listPriceOnlyBeforeText,
    listPriceOnSaleAfterText,
    listPriceOnSaleBeforeText,
    salePriceAfterText,
    salePriceBeforeText
  } = props;
  const {record = {}, route = ''} = useContext(ProductContext);

  const minPrice = record.attributes['sku.minActivePrice'] && record.attributes['sku.minActivePrice'][0];
  const maxPrice = record.attributes['sku.maxActivePrice'] && record.attributes['sku.maxActivePrice'][0];

  const recordData = record.records && record.records[0] ? record.records[0] : record;
  const {attributes} = recordData;

  const listPrice = attributes['sku.listPrice'] && attributes['sku.listPrice'][0];
  const salePrice = attributes['sku.salePrice'] && attributes['sku.salePrice'][0];

  // Format the price in appropriate currency
  const formatPrice = useNumberFormatter(OPTIONS);

  const priceRange = minPrice !== maxPrice && `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  const isOnSale = salePrice && salePrice !== listPrice;

  if (priceRange) {
    return (
      <Styled id="ProductResultPrice" css={css}>
        <Link href={route} className="ProductResultPrice">
          <span className="ProductResultPrice__ProductPrice">
            {t(listPriceOnlyBeforeText)} {priceRange} {t(listPriceOnlyAfterText)}
          </span>
        </Link>
      </Styled>
    );
  }

  if (listPrice) {
    return (
      <Styled id="ProductResultPrice" css={css}>
        <Link href={route} className="ProductResultPrice">
          {isOnSale ? (
            <span className={'ProductResultPrice__OriginalPrice'}>
              {t(listPriceOnSaleBeforeText)} {formatPrice(listPrice)} {t(listPriceOnSaleAfterText)}
            </span>
          ) : (
            <span className={'ProductResultPrice__ProductPrice'}>
              {t(listPriceOnlyBeforeText)} {formatPrice(listPrice)} {t(listPriceOnlyAfterText)}
            </span>
          )}
          {isOnSale && (
            <span className="ProductResultPrice__ProductPrice">
              {t(salePriceBeforeText)} {formatPrice(salePrice)} {t(salePriceAfterText)}
            </span>
          )}
        </Link>
      </Styled>
    );
  }

  return <div />;
};

customProductResultPrice.propTypes = {
  /**
   * A resource string to display after the product list price
   */
  listPriceOnlyAfterText: PropTypes.string.isRequired,
  /**
   * A resource string to display before the product list price
   */
  listPriceOnlyBeforeText: PropTypes.string.isRequired,
  /**
   * A resource string to display after the product list price if the product is on sale
   */
  listPriceOnSaleAfterText: PropTypes.string.isRequired,
  /**
   * A resource string to display before the product list price if the product is on sale
   */
  listPriceOnSaleBeforeText: PropTypes.string.isRequired,
  /**
   * A resource string to display after the product sale price
   */
  salePriceAfterText: PropTypes.string.isRequired,
  /**
   * A resource string to display before the product sale price
   */
  salePriceBeforeText: PropTypes.string.isRequired
};

export default customProductResultPrice;
