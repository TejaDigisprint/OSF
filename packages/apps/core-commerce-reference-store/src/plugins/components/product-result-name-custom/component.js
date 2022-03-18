/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';

/**
 * Displays the product name for use in search results
 */
const customProductResultName = () => {
  const {record = {}, route = ''} = useContext(ProductContext);

  const name = record.attributes['product.displayName'] && record.attributes['product.displayName'][0];

  return (
    <Styled id="ProductResultName" css={css}>
      <Link href={route} className="ProductResultName">
        <div>{name}</div>
      </Link>
    </Styled>
  );
};

export default customProductResultName;
