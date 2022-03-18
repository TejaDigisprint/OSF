/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';

import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Renders placeholder boxes for Quick View
 */
const QuickViewPlaceholder = () => {
  return (
    <Styled id="QuickViewPlaceholder" css={css}>
      <div className="QuickViewPlaceholder">
        <div className="QuickViewPlaceholder__Left">
          <div className="QuickViewPlaceholder__Img"></div>
        </div>
        <div className="QuickViewPlaceholder__Right">
          <div className="QuickViewPlaceholder__Title"></div>
          <div className="QuickViewPlaceholder__Price"></div>
          <div className="QuickViewPlaceholder__Variants"></div>
          <div className="QuickViewPlaceholder__AddToCart"></div>
        </div>
      </div>
    </Styled>
  );
};

export default QuickViewPlaceholder;
