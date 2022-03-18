/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import DropDownMedia from '@oracle-cx-commerce/react-widgets/category/collection-navigation-desktop/components/drop-down-media';
import Link from '@oracle-cx-commerce/react-components/link';
import MenuItems from '@oracle-cx-commerce/react-widgets/category/collection-navigation-desktop/components/menu-items';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useExpandedCategoriesData} from '@oracle-cx-commerce/react-widgets/category/collection-navigation-desktop/selectors';

/**
 * Drop down menu component that displays sub menu
 */
const DropDownMenu = ({categoryMedia, categories = []}) => {
  const expandedCategories = useExpandedCategoriesData(categories);
  const nonLeafCategories = [];
  const leafCategories = [];

  expandedCategories.forEach(category => {
    const {childCategories} = category;
    if (childCategories && childCategories.length > 0) {
      nonLeafCategories.push(category);
    } else {
      leafCategories.push(category);
    }
  });

  return (
    <Styled id="CollectionNavigationDesktop__DropDownMenu" css={css}>
      <div className="CollectionNavigationDesktop__DropDownMenu">
        <div className="CollectionNavigationDesktop__DropDownLinks">
          {nonLeafCategories.map(({id, displayName, route, childCategories}) => (
            <div key={id} className="CollectionNavigationDesktop__NonLeafCategories">
              <Link href={route}>{displayName}</Link>
              <MenuItems categories={childCategories} />
            </div>
          ))}
          {leafCategories.length > 0 && (
            <div className="CollectionNavigationDesktop__LeafCategories">
              <MenuItems categories={leafCategories} />
            </div>
          )}
        </div>
        {categoryMedia && <DropDownMedia categoryMedia={categoryMedia} />}
      </div>
    </Styled>
  );
};

export default DropDownMenu;
