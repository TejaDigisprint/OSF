/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useRef} from 'react';
import ActionIcon from '@oracle-cx-commerce/react-components/action-icon';
import CloseButton from '@oracle-cx-commerce/react-widgets/product-listing/search-box/components/close-button';
import PropTypes from 'prop-types';
import SearchBoxCommon from '@oracle-cx-commerce/react-widgets/product-listing/search-box/components/search-box-common';
import SearchIcon from '@oracle-cx-commerce/react-components/icons/search';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from '@oracle-cx-commerce/react-widgets/product-listing/search-box/mobile.css';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/product-listing/search-box/selectors';

/**
 * Component displays search popover containing a search box with typeahead, and a close popover button for mobile devices.
 *
 * @param props
 */
const SearchBoxMobile = props => {
  const {
    records,
    searchAdjustments,
    locale,
    numberOfSuggestions = 5,
    persistSearchTerm = true,
    closeLinkAltText,
    searchIconAltText,
    actionClear,
    textEnterSearch
  } = props;

  const searchToggle = useRef(null);
  const searchInput = useRef(null);

  // If persistSearchTerm flag is set, use the original search to populate the search input box
  const originalSearch = searchAdjustments && searchAdjustments.originalTerms && searchAdjustments.originalTerms[0];
  const initialInputValue = persistSearchTerm ? originalSearch || '' : '';

  // Shows or hides the Search box window
  const toggleWindow = () => {
    searchToggle.current.checked = !searchToggle.current.checked;

    // If showing window, apply focus at the end of the current text input
    if (searchToggle.current.checked) {
      searchInput.current.focus();
      searchInput.current.selectionStart = searchInput.current.selectionEnd = searchInput.current.value.length;
    }
  };

  return (
    <Styled id="SearchBoxMobile" css={css}>
      <div className="SearchBoxMobile">
        <ActionIcon>
          <div
            role="button"
            onClick={toggleWindow}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                toggleWindow();
              }
            }}
            tabIndex="0"
            aria-label={searchIconAltText}
          >
            <SearchIcon />
          </div>
        </ActionIcon>
        <input
          className="SearchBoxMobile__Toggle"
          id="SearchBoxMobile__Toggle"
          ref={searchToggle}
          type="checkbox"
          style={{display: 'none'}}
        />
        <div
          className="SearchBoxMobile__Backdrop"
          role="button"
          onClick={toggleWindow}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              toggleWindow();
            }
          }}
          tabIndex="-1"
          aria-label={closeLinkAltText}
        />
        <aside className="SearchBoxMobile__Modal">
          <SearchBoxCommon
            records={records}
            searchToggle={searchToggle}
            searchInput={searchInput}
            locale={locale}
            numberOfSuggestions={numberOfSuggestions}
            initialInputValue={initialInputValue}
            actionClear={actionClear}
            textEnterSearch={textEnterSearch}
            isMobile={true}
            SearchIcon={
              <span className="SearchBoxMobile__SearchIcon">
                <SearchIcon />
              </span>
            }
            CloseButton={<CloseButton closeLinkAltText={closeLinkAltText} toggleWindow={toggleWindow} />}
          />
        </aside>
      </div>
    </Styled>
  );
};

SearchBoxMobile.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchAdjustments: PropTypes.shape({originalTerms: PropTypes.arrayOf(PropTypes.string)}),
  locale: PropTypes.string.isRequired,
  numberOfSuggestions: PropTypes.string.isRequired,
  persistSearchTerm: PropTypes.bool.isRequired,
  closeLinkAltText: PropTypes.string.isRequired,
  searchIconAltText: PropTypes.string.isRequired,
  actionClear: PropTypes.string.isRequired,
  textEnterSearch: PropTypes.string.isRequired
};

SearchBoxMobile.defaultProps = {
  searchAdjustments: undefined
};

/**
 * Use an @oracle-cx-commerce/react-ui.connect component to arrange for the component
 * to be rendered when its state changes.
 */
export default connect(getComponentData)(SearchBoxMobile);
