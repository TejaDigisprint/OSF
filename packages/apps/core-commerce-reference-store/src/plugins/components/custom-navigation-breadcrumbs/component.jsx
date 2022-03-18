/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import React from 'react';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getPage} from '@oracle-cx-commerce/commerce-utils/selector';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * A component for listing navigation breadcrumbs.
 * NavigationBreadcrumbs are applied to all pages except product, collections and search results pages.
 */
const CustomNavigationBreadcrumbs = props => {
  /**
   * viewedPagesNameAndURL has the data from the widget configuration
   */
  const {viewedPagesNameAndURL = '[]', breadcrumbSeparator} = props;
  let currentPageName = props.displayName || '';
  currentPageName = currentPageName.trim();
  const viewedPageLinks = JSON.parse(viewedPagesNameAndURL.replace(/'/g, '"'));

  return (
    <Styled id="NavigationBreadcrumbs" css={css}>
      <div className="NavigationBreadcrumbs">
        {viewedPageLinks.map((item, index, items) => {
          return (
            <span key={item['0']}>
              <Link href={item['1']} className="NavigationBreadcrumbs__BreadcrumbItem">
                {props[item['0']] ? props[item['0']] : item['0']}
              </Link>
              {/*  Don't show breadcrumbSeparator if there is no data in  currentPageName */}
              {!(items.length - 1 === index && currentPageName === '') && (
                <span className="NavigationBreadcrumbs__Seperator">{breadcrumbSeparator}</span>
              )}
            </span>
          );
        })}
        <span className="NavigationBreadcrumbs__BreadcrumbItem--disable">{currentPageName}</span>
      </div>
    </Styled>
  );
};

export default connect(getPage)(CustomNavigationBreadcrumbs);
