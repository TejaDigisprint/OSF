/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext, useState, useCallback, Suspense} from 'react';
import PropTypes from 'prop-types';

import {ProductContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {getData} from '@oracle-cx-commerce/react-widgets/product-listing/product-result-image-quick-view/components/quick-view-button/utils';
import css from './styles.css';
import {objToClassName, noop} from '@oracle-cx-commerce/utils/generic';

// Lazy load Quick View
const QuickView = React.lazy(() =>
  import('../quick-view')
);

/**
 * Displays the quick view button on product images in the plp
 *
 * @param {boolean} props.isHidden whether the Quick View Button is displayed or not
 * @param {boolean} props.handleMouseOut hides the Quick View Button
 * @param {string} props.imageUrl the url of the product image in the plp
 * @param {string} props.altText the altText associated with the product image in the plp
 */
const QuickViewButton = props => {
  const {record = {}} = useContext(ProductContext);
  const {action} = useContext(StoreContext);
  const {textQuickView = '', imageUrl, altText, isHidden, handleMouseOut = noop} = props;

  const [showQuickView, setShowQuickView] = useState(false);
  const [product, setProduct] = useState({});

  /**
   * Handler to open quick view pop up and fetch pdp data
   */
  const handleQuickView = useCallback(
    event => {
      event.preventDefault();

      if (record.attributes['product.repositoryId']) {
        getData(action, record.attributes['product.repositoryId'], response => {
          const {products} = response.getProductResponse.delta.catalogRepository;
          setProduct(products[Object.keys(products)[0]]);
        });
      }

      // Open quick view modal
      setShowQuickView(true);
    },
    [record.attributes, setShowQuickView, setProduct, action]
  );

  /**
   * Handler to close quick view pop up
   */
  const closeQuickView = useCallback(() => {
    // Hide quick view button
    handleMouseOut();
    setShowQuickView(false);
  }, [handleMouseOut, setShowQuickView]);

  return (
    <Styled id="QuickViewButton" css={css}>
      <div className="QuickViewButton__Wrapper">
        <button
          type="submit"
          onClick={handleQuickView}
          className={objToClassName({
            QuickViewButton: true,
            'QuickViewButton--hidden': showQuickView || isHidden
          })}
        >
          {textQuickView}
        </button>

        {typeof window !== 'undefined' && (
          <Suspense fallback={null}>
            <QuickView
              closeQuickView={closeQuickView}
              showQuickView={showQuickView}
              product={product}
              imageUrl={imageUrl}
              altText={altText}
              {...props}
            />
          </Suspense>
        )}
      </div>
    </Styled>
  );
};

QuickViewButton.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  textQuickView: PropTypes.string,
  handleMouseOut: PropTypes.func
};

QuickViewButton.defaultProps = {
  textQuickView: '',
  handleMouseOut: noop
};

export default QuickViewButton;
