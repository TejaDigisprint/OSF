/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/cart-items-table-header/styles.css';

/**
 * It display cart items table header.
 *
 * @param {*} props
 */
const CartItemsTableHeader = props => {
  const {textItemDetails, textItemPrice, textQuantity, textTotal} = props;

  return (
    <Styled id="CartItemsTableHeader" css={css}>
      <div className="CartItemsTableHeader">
        <div className="CartItemDetails__ItemDetailsHeading">{textItemDetails}</div>
        <div className="CartItemDetails__ItemPriceHeading">{textItemPrice}</div>
        <div className="CartItemDetails__QuantityTotalContainer">
          <div className="CartItemDetails__ItemQunatityHeading">{textQuantity}</div>
          <div className="CartItemDetails__ItemTotalHeading">{textTotal}</div>
        </div>
      </div>
    </Styled>
  );
};

export default CartItemsTableHeader;
