/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import PropTypes from 'prop-types';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

/**
 * Displays a label describing the currently loaded product range and total result range
 *
 * @param props
 */
const customProductListingSummaryInformation = props => {
  const {textProductListingSummary} = props;
 

  const {
    searchResults: {results: {firstRecNum = 0, lastRecNum = 0, totalNumRecs = 0} = {}}
  } = useContext(ProductListingContext);

  if (totalNumRecs > 0) {
    return (
      <Styled id="ProductListingSummaryInformation" css={css}>
        <div className="ProductListingSummaryInformation__Container">
          {t(textProductListingSummary, {firstRecNum, lastRecNum, totalNumRecs})} <span></span>
          {lastRecNum<totalNumRecs && <p>Scroll Down And View More Products</p>}
          {lastRecNum===totalNumRecs && <p>End of Products</p>}
        </div>
      </Styled>
    );
  }

  return <div />;
};

customProductListingSummaryInformation.propTypes = {
  /**
   * The resource string for the product listing summary
   */
  textProductListingSummary: PropTypes.string.isRequired
};

export default customProductListingSummaryInformation;
