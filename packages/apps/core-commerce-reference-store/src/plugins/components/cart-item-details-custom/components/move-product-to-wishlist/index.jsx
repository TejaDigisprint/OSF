/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.
 */

import ProductAddToWishList from '@oracle-cx-commerce/react-widgets/product/product-add-to-wishlist/component';
/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/cart-item-row/styles.css';

/**
 * It display each cart item in shopping cart based on the current viewport.
 *
 * @param {*} props
 */
const MoveProductToWishList = props => {
  return (
    <Styled id="MoveProductToWishList" css={css}>
      <div className="MoveProductToWishList">
        <ProductAddToWishList moveToWishList={true} {...props} />
      </div>
    </Styled>
  );
};

MoveProductToWishList.propTypes = {};
MoveProductToWishList.defaultProps = {};

export default React.memo(MoveProductToWishList);
