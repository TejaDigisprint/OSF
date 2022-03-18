/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Renders region ids defined in container and automatically controls
 * mobile and desktop view based on view port.
 *
 * @param {*} props
 */
const CustomAccountResponsiveContainer = props => {
  const {regions = [], className = ''} = props;

  return (
    <Styled id="ResponsiveContainer" css={css}>
      {/* render each child region */}
      <section className={`ResponsiveContainer__Section justifyCenter ${className}`.trim()}>
        {regions.map((regionId, index) => (
          /*
            Using region ids as keys causes unnecessary DOM reconciliation.
              
            https://reactjs.org/docs/reconciliation.html#keys
          */
          <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
        ))}
      </section>
    </Styled>
  );
};

export default CustomAccountResponsiveContainer;
