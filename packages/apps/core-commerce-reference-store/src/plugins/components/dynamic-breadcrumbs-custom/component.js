/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {t} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';
import {getPageData} from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-breadcrumbs/selectors';

/**
 * A component for listing navigation breadcrumbs.
 * DynamicBreadcrumbs are applied to product, collections and search results pages.
 *
 * @param props
 */
const customDynamicBreadcrumbs = props => {
  const {categories, breadcrumbSeparator, correctedToAltText, textHome} = props;

  const {
    searchResults: {breadcrumbs, results: {totalNumRecs = 0} = {}}
  } = useContext(ProductListingContext);

  // The symbol used to visually separate breadcrumbs
  const divider = <span> {t(breadcrumbSeparator)} </span>;

  // If on search page render search breadcrumbs
  if (breadcrumbs && breadcrumbs.searchCrumbs && breadcrumbs.searchCrumbs.length > 0) {
    // Don't show breadcrumbs if no search results
    if (totalNumRecs === 0) {
      return <Styled id="DynamicBreadcrumbs" css={css} />;
    }

    return (
      <Styled id="DynamicBreadcrumbs" css={css}>
        <div className="DynamicBreadcrumbs">
          <Link className="DynamicBreadcrumbs__BreadcrumbLink" href=".">
            {t(textHome)}
          </Link>
          {divider}
          {breadcrumbs.searchCrumbs.map(crumbData => (
            <span
              key={crumbData.correctedTerms || crumbData.terms}
              aria-label={
                crumbData.correctedTerms && `${crumbData.terms} ${t(correctedToAltText)} ${crumbData.correctedTerms}`
              }
            >
              <span
                className={
                  crumbData.correctedTerms
                    ? 'DynamicBreadcrumbs__CorrectedLabel'
                    : 'DynamicBreadcrumbs__BreadcrumbLabel'
                }
              >
                &quot;{crumbData.terms}&quot;
              </span>
              {crumbData.correctedTerms && <span>&quot;{crumbData.correctedTerms}&quot;</span>}
            </span>
          ))}
        </div>
      </Styled>
    );
  }

  // If on a category page render category breadcrumbs
  const categoryCrumb =
    breadcrumbs &&
    breadcrumbs.refinementCrumbs &&
    breadcrumbs.refinementCrumbs.find(crumb => crumb.dimensionName === 'product.category');

  if (categoryCrumb && categories) {
    return (
      <Styled id="DynamicBreadcrumbs" css={css}>
        <div className="DynamicBreadcrumbs">
          <Link className="DynamicBreadcrumbs__BreadcrumbLink" href=".">
            {t(textHome)}
          </Link>
          {categoryCrumb.ancestors.map(ancestor => (
            <span key={ancestor.label}>
              {divider}
              <Link
                className="DynamicBreadcrumbs__BreadcrumbLink"
                href={categories[ancestor.properties['dimval.prop.category.repositoryId']].route}
              >
                {ancestor.label}
              </Link>
            </span>
          ))}
          {divider}
          <span className="DynamicBreadcrumbs__BreadcrumbLabel">{categoryCrumb.label}</span>
        </div>
      </Styled>
    );
  }

  return <div />;
};

customDynamicBreadcrumbs.propTypes = {
  /**
   * The list of product categories in the catalog
   */
  categories: PropTypes.shape({}).isRequired,
  /**
   * The string used to separate breadcrumbs labels
   */
  breadcrumbSeparator: PropTypes.string.isRequired,
  /**
   * The resource string used for voice-over to read aloud a misspelled search term
   */
  correctedToAltText: PropTypes.string.isRequired,
  /**
   * The resource string for the Home link
   */
  textHome: PropTypes.string.isRequired
};

export default connect(getPageData)(customDynamicBreadcrumbs);
