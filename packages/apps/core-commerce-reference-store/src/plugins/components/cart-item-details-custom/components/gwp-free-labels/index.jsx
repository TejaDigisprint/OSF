/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import GiftIcon from '@oracle-cx-commerce/react-components/icons/gift';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-free-labels/styles.css';

/**
 * It displays Free Product Message in GWPPlaceholder
 * @param props
 * @returns {*}
 * @constructor
 */
export const FreeProductMessage = props => {
  const {textFreeProduct} = props;

  return (
    <Styled id="FreeProductMessage" css={css}>
      <div className="FreeProductMessage">{textFreeProduct}</div>
    </Styled>
  );
};

/**
 * display Free Message in Price section
 * @param props
 * @returns {*}
 * @constructor
 */
export const FreeMessage = props => {
  const {textFree} = props;

  return (
    <Styled id="FreeMessage" css={css}>
      <div className="FreeMessageContainer">
        <div className="FreeMessage">{textFree}</div>
      </div>
    </Styled>
  );
};

/**
 * display Free Gift message along with gift icon
 * @param props
 * @returns {*}
 * @constructor
 */
export const FreeGiftMessage = props => {
  const {textFreeGift} = props;

  return (
    <Styled id="FreeGiftMessage" css={css}>
      <div className="FreeGiftMessage">{textFreeGift}</div>
    </Styled>
  );
};

export const FreeGiftIconMessage = props => {
  const {textFreeGift} = props;

  return (
    <Styled id="FreeGiftIconMessage" css={css}>
      <div className="FreeGiftIconMessage">
        <GiftIcon className="FreeGiftIconMessage__GiftIcon" />
        <FreeGiftMessage textFreeGift={textFreeGift} />
      </div>
    </Styled>
  );
};
