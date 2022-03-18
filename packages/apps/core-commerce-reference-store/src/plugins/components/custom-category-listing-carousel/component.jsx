/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState, useContext, useEffect} from 'react';
import css from './styles.css';
import GenericCarousel from '@oracle-cx-commerce/react-components/generic-carousel';
import ProductItem from './components/product-item';
import PropTypes from 'prop-types';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {isMobile, getCategories} from '@oracle-cx-commerce/commerce-utils/selector';

/**
 * This component is used to render the products of a category as a Carousel.
 * @param {
 * } props
 */
const CustomCategoryListingCarousel = props => {
  const {categoryId, collectionCarouselLabel, itemsPerSlideDesktop, noOfItemsToSlide, displayCollectionName} = props;
  // selectors

  const {displayName} = useSelector(getCategories)[categoryId] || {};

  const mobile = useSelector(isMobile);

  const {action} = useContext(StoreContext);

  const slideIncrementFactor =
    noOfItemsToSlide === '' || noOfItemsToSlide === undefined || noOfItemsToSlide === null
      ? itemsPerSlideDesktop
      : noOfItemsToSlide;

  let headingCarousel = '';
  if (displayCollectionName === 'true') {
    headingCarousel = displayName;
  } else {
    headingCarousel = collectionCarouselLabel;
  }

  const [categoryProductIds, setCategoryProductIds] = useState(null);
  useEffect(() => {
    let payload = {};
    payload = {categoryId};
    payload.includeChildren = true;

    action('listProducts', payload).then(response => {
      if (response.status === 200 && response.delta.catalogRepository.products) {
        const getProductPricesPayload = {};
        const productIds = Object.keys(response.delta.catalogRepository.products);
        setCategoryProductIds(productIds);
        getProductPricesPayload.productIds = productIds;

        action('getProductsPrices', getProductPricesPayload);
      }
    });
  }, [action, categoryId, setCategoryProductIds]);
  const slides = [];

  if (categoryProductIds) {
    Object.values(categoryProductIds).forEach(productId => {
      slides.push(<ProductItem productId={productId} />);
    });
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <Styled id="CategoryListingCarousel" css={css}>
      <div className="CategoryListingCarousel">
        <div className="CollectionCarousel__Heading">{headingCarousel}</div>
        <div className="CollectionCarousel_Content">
          <GenericCarousel
            slides={slides}
            itemsPerSlideDesktop={5}
            mobile={mobile}
            showIndicator={false}
            slideIncrementFactor={slideIncrementFactor}
            isAutoSlide={false}
            itemsPerSlideMobile={2}
          />
        </div>
      </div>
    </Styled>
  );
};



export default CustomCategoryListingCarousel;
