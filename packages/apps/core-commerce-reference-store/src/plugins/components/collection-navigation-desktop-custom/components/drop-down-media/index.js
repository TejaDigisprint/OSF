/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/* eslint-disable react/no-danger */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Media component to display promotional content or category images in the sub menu
 */
const DropDownMedia = ({categoryMedia = ''}) => {
  function getCategoryMedia() {
    return {__html: categoryMedia};
  }

  return (
    <Styled id="CollectionNavigationDesktop__DropDownMedia" css={css}>
      <div className="CollectionNavigationDesktop__DropDownMedia" dangerouslySetInnerHTML={getCategoryMedia()}></div>
    </Styled>
  );
};

export default React.memo(DropDownMedia);
