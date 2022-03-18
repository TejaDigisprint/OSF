/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';

import CategoryMenu from '../components/category-menu';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import RefinementMenu from '../components/refinement-menu';

// A component for listing search refinement menus.
const Navigation = props => {
  const {categoryCrumb} = props;
  const {
    searchResults: {facets: {navigation = []} = {}},
    mobile
  } = useContext(ProductListingContext);

  return (
    <>
      {!navigation.find(item => item.dimensionName === 'product.category') && categoryCrumb && (
        <>
          {mobile || <hr className="Navigation__Divider" />}
          <CategoryMenu categoryCrumb={categoryCrumb} {...props} />
        </>
      )}
      {navigation.map((refinementMenuData, i) => {
        return (
          <div key={refinementMenuData.dimensionName}>
            {refinementMenuData.dimensionName === 'product.category' ? (
              <>
                {mobile || <hr className="Navigation__Divider" />}
                <CategoryMenu categoryRefinement={refinementMenuData} {...props} />
              </>
            ) : (
              <>
                {mobile || <hr className="Navigation__Divider" />}
                <RefinementMenu refinementMenuData={refinementMenuData} index={i} {...props} />
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Navigation;
