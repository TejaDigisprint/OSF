/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
/* eslint-disable react/no-danger */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import webContentCss from './styles.css';

/**
 * Following Widget component renders the HTML content that is configured.
 *
 * @param props
 */

const WebContent = props => {
  return (
    <Styled id="WebContent" css={webContentCss}>
      <div className='outer_webContent' style={{backgroundColor:'#f0f2f4'}}>
      <div className="WebContent__Html" style={{textAlign:'center',fontSize:'13px',color:'#040c13',fontFamily:'Human BBY Digital,Human Fallback,Arial,Helvetica,sans-serif'}} dangerouslySetInnerHTML={{__html: props.webContent}}></div>
      </div>
     </Styled>
  );
};

export default WebContent;
