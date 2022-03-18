/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext, useMemo} from 'react';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/product-listing/search-box/components/typeahead-results-panel/styles.css';
import TypeaheadResultItem from '@oracle-cx-commerce/react-widgets/product-listing/search-box/components/typeahead-result-item';

/**
 * Component that displays details about the typeahead search results
 * (i.e., a pop up with the results, if there are any).
 */
const TypeaheadResultsPanel = props => {
  const {records, inputValue, onSelectTypeahead} = props;

  const {store} = useContext(StoreContext);

  return (
    <Styled id="TypeaheadResults" css={css}>
      <div className="TypeaheadResults" style={{display: inputValue && records.length > 0 ? 'inline-block' : 'none'}}>
        {useMemo(
          () =>
            records.map(record => (
              <TypeaheadResultItem
                key={
                  (record.attributes['record.id'] && record.attributes['record.id'][0]) ||
                  (record.attributes['keyword.terms'] && record.attributes['keyword.terms'][0])
                }
                record={record}
                store={store}
                inputValue={inputValue}
                onSelectTypeahead={onSelectTypeahead}
              />
            )),
          [records, store, inputValue, onSelectTypeahead]
        )}
      </div>
    </Styled>
  );
};

export default TypeaheadResultsPanel;
