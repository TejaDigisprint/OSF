/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useContext, useState, useCallback } from 'react';

import Link from '@oracle-cx-commerce/react-components/link';
import { ProductContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import QuickViewButton from './components/quick-view-button';
import ProductImage from './components/product-image';

/**
 * Displays a product image for use in search results with quick view enabled
 */
const customProductResultImageQuickView = props => {
  const { record = { attributes: {} }, route = '', selection = {} } = useContext(ProductContext);

  const [isHidden, setIsHidden] = useState(true);

  // Get image url. If one has been set by selecting a color swatch, display that image
  const imageUrl =
    selection['imageUrl'] ||
    (record.attributes['sku.listingFullImageURL'] && record.attributes['sku.listingFullImageURL'][0]) ||
    (record.attributes['product.primaryFullImageURL'] && record.attributes['product.primaryFullImageURL'][0]) ||
    '';

  const altText =
    (record.attributes['product.primaryImageAltText'] && record.attributes['product.primaryImageAltText'][0]) || '';

  const handleMouseOver = useCallback(() => setIsHidden(false), []);
  const handleMouseOut = useCallback(() => setIsHidden(true), []);

  return (
    <Styled id="ProductResultImageQuickView" css={css}>
      <div
        className="ProductResultImageQuickView"
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseOut={handleMouseOut}
        onBlur={handleMouseOut}
      >
        <Link href={route}>
          <div className="ProductImage">
            <img src={imageUrl} alt={altText} className='ProductImage__img' />
          </div>
        </Link>
        <QuickViewButton
          isHidden={isHidden}
          handleMouseOut={handleMouseOut}
          imageUrl={imageUrl}
          altText={altText}
          {...props}
        ></QuickViewButton>
      </div>
    </Styled>
  );
};

export default customProductResultImageQuickView;
