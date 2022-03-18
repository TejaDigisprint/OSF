/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
/* eslint-disable react/no-danger */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Following Widget component renders the HTML content that is configured.
 *
 * @param props
 */

const PromotionalBannercustom = props => {
  return (
    <Styled id="WebContent" css={css}>
      <div>
      <div className="WebContent__Html">
      <div style={{backgroundColor:"#000000",marginTop:"-14px",marginBottom:"-14px"}}>
        <h4 style={{color:"#FFFFFF", textAlign:"center"}}>
          <marquee>USE PROMOCODE GOGO SPEND $50 AND GET $10 OFF</marquee>
          </h4>
        </div>
      </div>
      </div>
    </Styled>
  );
};

export default PromotionalBannercustom;
