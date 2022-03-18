/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
/**
 * Displays a product's title using the displayName property from the product.
 */
const CustomProductName = () => {
  // context
  const {displayName = ''} = useContext(ProductContext);

  return (
    <Styled id="ProductName" css={css}>
      <h1 className="ProductName">{displayName}</h1>
    </Styled>
  );
};
export default CustomProductName;
