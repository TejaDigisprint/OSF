/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './mobile.css';

/**
 * Following Header Container component will hold the widgets related to Header.
 *
 * @param props
 */

const customHeaderContainerMobile = props => {
  const {regions = []} = props;

  return (
    <Styled id="HeaderContainerMobile" css={css}>
      {/* render each child region */}
      <section className="HeaderContainerMobile__Section">
        {regions.map(regionId => (
          <Region key={regionId} regionId={regionId} />
        ))}
      </section>
    </Styled>
  );
};

export default customHeaderContainerMobile;
