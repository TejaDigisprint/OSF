/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './desktop.css';

/**
 * Following Header Desktop Container component will hold the widgets related to Header.
 *
 * @param props
 */

const customHeaderContainerDesktop = props => {
  const {regions = []} = props;
  
  return (
    <Styled id="HeaderContainerDesktop" css={css}>
      {/* render each child region */}
      <section id="headerslidingcontainer" className="HeaderContainerDesktop__Section">
        {regions.map(regionId => (
          <Region key={regionId} regionId={regionId} />
        ))}
      </section>   
    </Styled>
  );
};

export default customHeaderContainerDesktop;
