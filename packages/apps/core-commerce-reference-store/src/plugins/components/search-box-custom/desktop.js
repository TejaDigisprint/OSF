/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import SearchIcon from '@oracle-cx-commerce/react-components/icons/search';
import Styled from '@oracle-cx-commerce/react-components/styled';
import SearchBoxCommon from './components/search-box-common';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './desktop.css';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/product-listing/search-box/selectors';

/**
 * Component that renders the search button on the right of the SearchBox.
 */
const SearchButton = props => {
  const {isDisabled} = props;

  return (
    <span className="SearchBoxDesktop__SearchIcon">
      <button type="submit" disabled={isDisabled}>
        <SearchIcon />
      </button>
    </span>
  );
};

/**
 * Component displays search box for desktop with typeahead.
 *
 * @param props
 */
const customSearchBoxDesktop = props => {
  const {
    records,
    searchAdjustments,
    locale,
    numberOfSuggestions = 5,
    persistSearchTerm = true,
    closeLinkAltText,
    actionClear,
    textEnterSearch
  } = props;

  const searchToggle = useRef(null);
  const searchInput = useRef(null);

  // If persistSearchTerm flag is set, use the original search to populate the search input box
  const originalSearch = searchAdjustments && searchAdjustments.originalTerms && searchAdjustments.originalTerms[0];
  const initialInputValue = persistSearchTerm ? originalSearch || '' : '';

  return (
    <Styled id="SearchBoxDesktop" css={css}>
      <div className="SearchBoxDesktop">
        <SearchBoxCommon
          records={records}
          searchToggle={searchToggle}
          searchInput={searchInput}
          locale={locale}
          numberOfSuggestions={numberOfSuggestions}
          initialInputValue={initialInputValue}
          closeLinkAltText={closeLinkAltText}
          actionClear={actionClear}
          textEnterSearch={textEnterSearch}
          isMobile={false}
          SearchIcon={SearchButton}
        />
      </div>
    </Styled>
  );
};

customSearchBoxDesktop.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchAdjustments: PropTypes.shape({originalTerms: PropTypes.arrayOf(PropTypes.string)}),
  locale: PropTypes.string.isRequired,
  numberOfSuggestions: PropTypes.string.isRequired,
  persistSearchTerm: PropTypes.bool.isRequired,
  closeLinkAltText: PropTypes.string.isRequired,
  actionClear: PropTypes.string.isRequired,
  textEnterSearch: PropTypes.string.isRequired
};

customSearchBoxDesktop.defaultProps = {
  searchAdjustments: undefined
};

/**
 * Use an @oracle-cx-commerce/react-ui.connect component to arrange for the component
 * to be rendered when its state changes.
 */
export default connect(getComponentData)(customSearchBoxDesktop);
