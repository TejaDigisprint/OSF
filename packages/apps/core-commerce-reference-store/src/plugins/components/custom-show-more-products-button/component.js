/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { ProductListingContext } from '@oracle-cx-commerce/react-widgets/contexts';
import { PaginationContext, StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import StandardPagination from '@oracle-cx-commerce/react-components/pagination/standard';
import BasicPagination from '@oracle-cx-commerce/react-components/pagination/basic';
import TextPagination from '@oracle-cx-commerce/react-components/pagination/text';
import DropdownPagination from '@oracle-cx-commerce/react-components/pagination/dropdown';
import PageIndicator from '@oracle-cx-commerce/react-components/pagination/page-indicator';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import { t } from '@oracle-cx-commerce/utils/generic';

/**
 * A button to show the next set of results
 * @param props
 */
const ShowMoreProductsButtoncustom = props => {
  const {
    actionShowMoreProducts,
    textRetrievingProducts,
    paginationMode = 'button',
    pagesToShowBesideCurrentPage = 1,
    labelPageOfPages,
    labelPageOfPagesDropdown,
    labelPaginationDropDown,
    labelPreviousPage,
    labelNextPage,
    labelFirstPage,
    labelLastPage
  } = props;

  const { currentOffset, limit, totalRecords, pageId, pageParam, onPageChange } = useContext(PaginationContext);
  const { action } = useContext(StoreContext);
 
  // Product Listing results data
  const {
    searchResults: { results: { lastRecNum, recsPerPage, totalNumRecs } = {} },
    searchServicePath,
    mobile
  } = useContext(ProductListingContext);

  

  // A flag to keep track of whether products are currently being loaded
  const [loadingProducts, setLoadingProducts] = useState(false);

  let pagination = null;

  if (paginationMode === 'standard') {
    pagination = (
      <StandardPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        pagesToShowBesideCurrentPage={pagesToShowBesideCurrentPage}
        pageId={pageId}
        pageParam={pageParam}
        onPageChange={onPageChange}
      />
    );
  } else if (paginationMode === 'basic') {
    pagination = (
      <BasicPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        pagesToShowBesideCurrentPage={pagesToShowBesideCurrentPage}
        pageId={pageId}
        pageParam={pageParam}
        onPageChange={onPageChange}
        labelPreviousPage={labelPreviousPage}
        labelNextPage={labelNextPage}
        labelFirstPage={labelFirstPage}
        labelLastPage={labelLastPage}
      />
    );
  } else if (paginationMode === 'text') {
    pagination = (
      <TextPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        pageId={pageId}
        pageParam={pageParam}
        onPageChange={onPageChange}
        labelPreviousPage={labelPreviousPage}
        labelNextPage={labelNextPage}
        labelPageOfPages={labelPageOfPages}
      />
    );
  } else if (paginationMode === 'dropdown') {
    pagination = (
      <DropdownPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        labelPageOfPagesDropdown={labelPageOfPagesDropdown}
        labelPaginationDropDown={labelPaginationDropDown}
      />
    );
  }

  // Load the next batch of products
  const loadNextProducts = (e) => {
    let element = e.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // do something at end of scroll
      setLoadingProducts(true);
      action('search', {
        getNextPage: true,
        searchServicePath
      }).then(() => {
        setLoadingProducts(false);
      }); 
    }
  };
 
  // Only show More Products button if there are more products to load.
  if (paginationMode === 'button' && lastRecNum < totalNumRecs) {
    pagination = (
      <div style={{padding:'50px',fontWeight:"bold"}} onMouseEnter={loadNextProducts}>
        {loadingProducts && <h2 style={{letterSpacing:"1px"}}>Loading Products.....</h2>}
        <div style={{padding:'100px'}}></div>
         {/* <button
          type="button"
          className={`ShowMoreProductsButton__Button secondary ${mobile ? 'ShowMoreProductsButton__Button--Mobile' : 'ShowMoreProductsButton__Button--Desktop'
            }`}
          disabled={loadingProducts}
          onScroll={loadNextProducts}
        >
          {loadingProducts
            ? t(textRetrievingProducts)
            : t(actionShowMoreProducts, { RECSPERPAGE: recsPerPage.toString() })}
        </button>  */}
      </div>
    );
  }

  // Return pagination. Include hidden link for SEO.
  if (pagination) {
    return (
      <Styled id="ShowMoreProductsButton" css={css}>
        {pagination}
        {(paginationMode === 'dropdown' || paginationMode === 'button') && (
          <>
            {lastRecNum < totalNumRecs && (
              <PageIndicator
                pageNumber={Math.ceil((lastRecNum + 1) / recsPerPage)}
                limit={recsPerPage}
                pageId={pageId}
                pageParam={pageParam}
                label={t(labelNextPage)}
                className={'ShowMoreProductsButton__HiddenLink'}
              />
            )}
          </>
        )}
        {/* <div style={{ padding: '200px' }}></div> */}
      </Styled>
    );
  }

  return <div style={{ display: 'none' }} />;
};

ShowMoreProductsButtoncustom.propTypes = {
  /**
   * The resource string to display on the button for loading more product results
   */
  actionShowMoreProducts: PropTypes.string.isRequired,
  /**
   * The resource string to indicate more products are being loaded
   */
  textRetrievingProducts: PropTypes.string.isRequired
};

export default ShowMoreProductsButtoncustom;
