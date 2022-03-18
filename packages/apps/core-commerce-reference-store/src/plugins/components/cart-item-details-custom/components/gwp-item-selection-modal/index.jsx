/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {ContainerContext, ProductContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {isEmptyObject, noop} from '@oracle-cx-commerce/utils/generic';

import GWPImage from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-image';
import Modal from '@oracle-cx-commerce/react-components/modal';
import AddToCartButton from '@oracle-cx-commerce/react-widgets/product/product-add-to-cart-button/components/add-to-cart-button';
import ProductInventoryStatus from '@oracle-cx-commerce/react-widgets/product/product-inventory-status/component';
import ProductName from '@oracle-cx-commerce/react-widgets/product/product-name/component';
import ProductVariantOptions from '@oracle-cx-commerce/react-widgets/product/product-variant-options/component';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-item-selection-modal/styles.css';

/**
 * This component renders a modal for selecting GWP variant options.
 *
 * @param {*} props
 */
const GWPItemSelectionModal = props => {
  // resources
  const {actionSelect, closeLinkAltText, textSelectGiftMessage, actionCancel, showGWPModal} = props;
  const {action} = useContext(StoreContext);
  const {
    giftProduct = {},
    selectedGiftItem = {},
    hideGWPModal,
    setSelectedCommerceItem = noop,
    selectedCommerceItem = {},
    cssOverride = ''
  } = props;
  const isUnmountedRef = useRef(false);

  /** NOTE: Temporary fix for avoiding un-mounting issue. It must be removed after updating re-render fix. */
  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  const {giftProductId = ''} = giftProduct;

  const {variantOptionsSeed, variantToSkuLookup = []} = giftProduct;
  const skuId = isEmptyObject(variantOptionsSeed) ? variantToSkuLookup[''] : null;

  const [selections, setSelections] = useState({
    skuId,
    variantOptions: {},
    qty: 1
  });

  /**
   * Handler for Gift With Purchase.
   * Dispatches action when Select Variant is clicked.
   * Throws validation errors if quantity added is invalid
   * @param  {Object} Object
   */
  const onAddToCart = useCallback(
    ({payload, onNotOk = noop, onComplete = noop}) => {
      // handlers
      /**
       * Success handler for Add To Cart button
       */
      const onOk = () => {
        hideGWPModal();
        setSelectedCommerceItem({});
      };

      if (selectedGiftItem) {
        payload.productId = selectedGiftItem.giftWithPurchaseDetail;
        payload.promotionId = selectedGiftItem.promotionId;
        payload.giftWithPurchaseIdentifier = selectedGiftItem.giftWithPurchaseIdentifier;
        // Default GWP available quantity to add.
        payload.quantity = selectedGiftItem.giftWithPurchaseQuantityAvailableForSelection;

        // This condition is for modifying sku of existing selected GWP commerce item in cart. This should not change previous quantity.
        if (!isEmptyObject(selectedCommerceItem)) {
          payload.quantity = selectedCommerceItem.quantity;
          payload.changeExistingGiftItemId = selectedCommerceItem.id;
        }
        const actionId = !isEmptyObject(selectedCommerceItem)
          ? 'changeGiftWithPurchaseItemInCart'
          : 'addGiftWithPurchaseItemToCart';
        action(actionId, payload)
          .then(response => {
            if (response.ok === true) {
              !isUnmountedRef.current && onOk(response);
            } else {
              onNotOk(response);
            }
          })
          .catch(error => {
            onNotOk({error});
          })
          .finally(() => !isUnmountedRef.current && onComplete());
      }
    },
    [action, hideGWPModal, selectedCommerceItem, selectedGiftItem, setSelectedCommerceItem]
  );

  return (
    <Styled id="GWPItemSelectionModal" css={css}>
      <Modal
        show={showGWPModal}
        onClose={hideGWPModal}
        className={'GWPItemSelectionModal'}
        closeIconTitle={closeLinkAltText}
        closeArialLabel={closeLinkAltText}
        cssOverride={cssOverride}
        title={<span className="GWPItemSelectionModal__HeaderText">{textSelectGiftMessage}</span>}
      >
        <div
          className="GWPItemSelectionModal__LoadGiftItem"
          role="button"
          tabIndex={-1}
          onKeyUp={event => {
            if (event.key === 'Enter') event.stopPropagation();
          }}
          onClick={event => event.stopPropagation()}
        >
          <div className="GWPItemSelectionModal__InputElement">
            {/*
              Adding ProductContext and ContainerContext to use PDP widgets as these widget has dependency of the context.
            */}
            <ProductContext.Provider key={giftProductId} value={giftProduct}>
              <ContainerContext.Provider value={{selections, setSelections}}>
                <div className="GWPItemSelectionModal__Header">
                  <GWPImage giftProduct={giftProduct} giftProductId={giftProductId} />
                  <ProductName />
                </div>
                <ProductVariantOptions />
                <ProductInventoryStatus {...props} />
                <AddToCartButton onAddToCart={onAddToCart} actionAddToCart={actionSelect} {...props} />
              </ContainerContext.Provider>
            </ProductContext.Provider>
            <div className="GWPItemSelectionModal__SubmitButtonDiv">
              <button
                type="submit"
                aria-label={actionCancel}
                tabIndex={showGWPModal ? 0 : -1}
                className="GWPItemSelectionModal__SubmitButton secondary"
                onClick={hideGWPModal}
              >
                {actionCancel}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Styled>
  );
};

export default GWPItemSelectionModal;
