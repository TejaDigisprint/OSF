/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Img from '@oracle-cx-commerce/react-components/img';
import React from 'react';

const GWPImage = props => {
  const {giftProduct = {}} = props;

  return <Img src={giftProduct.primaryThumbImageURL} title={giftProduct.displayName} size="xsmall" />;
};

export default React.memo(GWPImage);
