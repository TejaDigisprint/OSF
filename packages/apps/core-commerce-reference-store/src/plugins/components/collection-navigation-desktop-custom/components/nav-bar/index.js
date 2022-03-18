/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import DropDownMenu from '@oracle-cx-commerce/react-widgets/category/collection-navigation-desktop/components/drop-down-menu';
import Link from '@oracle-cx-commerce/react-components/link';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Nav Bar component that displays root category links
 */
const NavBar = ({categories = [], categoryMediaProperty = ''}) => {
  return (
    <Styled id="CollectionNavigationDesktop__NavBar" css={css}>
      <div className="CollectionNavigationDesktop__NavBar">
        {categories.map(({route, displayName, id, childCategories, [categoryMediaProperty]: categoryMedia = null}) => (
          <div key={id} className="CollectionNavigationDesktop__NavItem">
            <div className="CollectionNavigationDesktop__NavLink">
              <Link href={route}>{displayName}</Link>
            </div>
            {childCategories && childCategories.length > 0 && (
              <DropDownMenu categoryMedia={categoryMedia} categories={childCategories} />
            )}
          </div>
        ))}
        <div className="CollectionNavigationDesktop__Backdrop" data-testid="modalBackdrop"></div>
      </div>
    </Styled>
  );
};
export default React.memo(NavBar);
