/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import Link from '@oracle-cx-commerce/react-components/link';

/**
 *  Displays list of Menu items
 */
const MenuItems = ({categories = []}) => {
  return (
    <div className="CollectionNavigationDesktop__MenuItems">
      <ul>
        {categories.map(({id, displayName, route}) => (
          <li key={id}>
            <Link href={route}>{displayName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MenuItems);
