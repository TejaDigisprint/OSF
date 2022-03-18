/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/* eslint-disable react/no-danger */
import Collapsible from '@oracle-cx-commerce/react-components/collapsible';
import React, {useContext} from 'react';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
/**
 * Product Long Description. A single Collapsible containing the description for a product
 */
export default function CustomProductLongDescription(props) {
  // context
  const {longDescription = ''} = useContext(ProductContext);

  // resources
  const {actionDescriptionViewProductInfo} = props;

  // configuration option
  const {descriptionExpanded = false} = props;

  return (
    <Styled id="ProductLongDescription" css={css}>
      <div className="ProductLongDescription">
        {/* <Collapsible expanded={descriptionExpanded} title={actionDescriptionViewProductInfo} {...props}> */}
          <h2>
            {actionDescriptionViewProductInfo}
          </h2>
          <div className="ProductLongDescription__Html" dangerouslySetInnerHTML={{__html: longDescription}}></div>
        {/* </Collapsible> */}
      </div>
    </Styled>
  );
}
