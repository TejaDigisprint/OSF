/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';

import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-placeholder/styles.css';

/**
 * Renders placeholder boxes for Product details Page
 */
const CartPlaceholder = () => {
  return (
    <Styled id="CartPlaceholder" css={css}>
      <div className="CartPlaceholder">
        <div className="CartPlaceholder__CartItemsHolder">
          <div className="CartPlaceholder__CartItem">
            <div className="CartPlaceholder__CartItemImage"></div>
            <div className="CartPlaceholder__CartItemName"></div>
          </div>
          <div className="CartPlaceholder__CartItem">
            <div className="CartPlaceholder__CartItemImage"></div>
            <div className="CartPlaceholder__CartItemName"></div>
          </div>
        </div>
        <div className="CartPlaceholder__OrederSummary"></div>
        <div className="CartPlaceholder__Promotions"></div>
      </div>
    </Styled>
  );
};

export default CartPlaceholder;
