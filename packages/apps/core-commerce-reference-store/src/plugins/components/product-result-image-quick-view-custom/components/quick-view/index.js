/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState, useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import {ProductContext, ContainerContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import ProductImage from '../product-image';
import ProductName from '@oracle-cx-commerce/react-widgets/product/product-name/component';
import ProductPrice from '@oracle-cx-commerce/react-widgets/product/product-price/component';
import ProductInventoryStatus from '@oracle-cx-commerce/react-widgets/product/product-inventory-status/component';
import ProductVariantOptions from '@oracle-cx-commerce/react-widgets/product/product-variant-options/component';
import Modal from '../../../modal-custom/';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import AddToCartButton from '@oracle-cx-commerce/react-widgets/product/product-add-to-cart-button/components/add-to-cart-button';
import {isEmptyObject, noop} from '@oracle-cx-commerce/utils/generic';
import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
import QuickViewPlaceholder from '../quick-view-placeholder';

/**
 * Displays the quick view poop up
 *
 * @param {function} props.closeQuickView function that handles closing the pop up
 * @param {boolean} props.showQuickView whether the Quick View pop up is displayed or not
 * @param {string} props.imageUrl the url of the product image in the plp
 * @param {string} props.altText the altText associated with the product image in the plp
 * @param {object} props.product the product details to be displayed in quick view
 */
const QuickView = props => {
  const {closeQuickView, showQuickView, imageUrl, altText, product} = props;

  const {variantOptionsSeed, variantToSkuLookup = {}, childSKUs = []} = product;

  const skuNotInProducts = (childSKUs, skuId) => {
    const sku = childSKUs.find(chidSKU => chidSKU === skuId);

    return sku === undefined ? true : false;
  };

  const initialState = {
    skuId: null,
    variantOptions: {},
    qty: 1
  };

  const [selections, setSelections] = useState(initialState);

  // For products with no variant options, update the skuId to retrieve stock status
  if (
    isEmptyObject(selections) ||
    (isEmptyObject(variantOptionsSeed) && selections.skuId !== variantToSkuLookup['']) ||
    (!isEmptyObject(variantOptionsSeed) && selections.skuId && skuNotInProducts(childSKUs, selections.skuId))
  ) {
    setSelections({...selections, skuId: variantToSkuLookup['']});
  }

  // contexts
  const {action} = useContext(StoreContext);

  /**
   * Handler for closing the Quick View modal
   */
  const onClose = useCallback(() => {
    // Reset to default state of product detail selections
    setSelections(initialState);
    // close quick view modal
    closeQuickView();
  }, [setSelections, initialState, closeQuickView]);

  /**
   * Handler for AddToCartButton
   * Dispatches action when add to cart is clicked
   * Closes quick view on success
   * @param  {Object} Object
   */
  const onAddToCart = useCallback(
    ({payload, onNotOk = noop, onComplete = noop}) => {
      action('addItemsToCart', {
        items: [{...payload}]
      })
        .then(response => {
          if (response.ok === true) {
            // onOk, close quick view
            onClose();
          } else {
            onNotOk(response);
          }
        })
        .catch(error => {
          onNotOk({error});
        })
        .finally(onComplete);
    },
    [action, onClose]
  );

  return (
    <Styled id="QuickView" css={css}>
      <Modal show={showQuickView} onClose={onClose}>
        <div className="QuickView">
          <PageLoader show={isEmptyObject(product)}>
            <QuickViewPlaceholder />
          </PageLoader>
          <ProductContext.Provider value={product}>
            <ContainerContext.Provider value={{selections, setSelections}}>
              <ProductImage imageUrl={imageUrl} altText={altText} />
              <div className="QuickView__ProductDetails">
                <ProductName />
                <ProductPrice {...props} />
                <ProductVariantOptions {...props} />
                <ProductInventoryStatus {...props} />
                <AddToCartButton onAddToCart={onAddToCart} {...props} />
              </div>
            </ContainerContext.Provider>
          </ProductContext.Provider>
        </div>
      </Modal>
    </Styled>
  );
};

QuickView.propTypes = {
  closeQuickView: PropTypes.func.isRequired,
  showQuickView: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  product: PropTypes.shape({
    variantOptionsSeed: PropTypes.shape({}),
    variantToSkuLookup: PropTypes.shape({})
  }).isRequired
};

export default React.memo(QuickView);
