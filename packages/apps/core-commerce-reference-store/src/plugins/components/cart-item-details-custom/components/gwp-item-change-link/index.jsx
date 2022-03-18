/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {CartItemContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {Suspense, useCallback, useContext, useState} from 'react';

import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-item-change-link/styles.css';
import {getGWPProductWithVariants} from '@oracle-cx-commerce/react-components/utils/cart';
import {getProduct} from '@oracle-cx-commerce/commerce-utils/selector';

const GWPItemSelectionModal = React.lazy(() =>
  import('@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-item-selection-modal')
);

const GWPItemChangeLink = props => {
  // resource
  const {textChange} = props;
  // context
  const {action, getState} = useContext(StoreContext);
  const {commerceItem = {}} = useContext(CartItemContext);

  // current order
  const {currentOrder = {}} = props;

  // state variables
  const [showGWPModal, setShowGWPModal] = useState(false);
  const [selectedGiftItem, setSelectedGiftItem] = useState({});
  const [selectedCommerceItem, setSelectedCommerceItem] = useState({});
  const [giftProduct, setGiftProduct] = useState({});

  /**
   * Success callback method after getting GWP product details with variants.
   */
  const onSuccessCallback = useCallback(
    giftItem => {
      const productId = giftItem.giftWithPurchaseDetail;
      const giftProduct = getProduct(getState(), {productId});
      setGiftProduct(giftProduct);
      setShowGWPModal(true);
    },
    [getState]
  );

  const handleGWPChange = (giftItem, commerceItem) => {
    setSelectedGiftItem(giftItem);
    setSelectedCommerceItem(commerceItem);
    getGWPProductWithVariants(action, {giftItem}, onSuccessCallback);
  };

  /**
   * Handler to hide the GWP item picker (GWP item selection portal) overlay
   */
  const hideGWPModal = useCallback(() => {
    setShowGWPModal(false);
    setSelectedGiftItem({});
    setGiftProduct({});
  }, [setSelectedGiftItem, setShowGWPModal, setGiftProduct]);

  return (
    <Styled id="GWPItemChangeLink" css={css}>
      {commerceItem.giftWithPurchaseCommerceItemMarkers &&
        commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 &&
        (currentOrder.giftWithPurchaseInfo || []).map(
          giftItem =>
            giftItem.giftWithPurchaseDetail === commerceItem.productId &&
            giftItem.promotionId === commerceItem.giftWithPurchaseCommerceItemMarkers[0].value &&
            commerceItem.variant &&
            commerceItem.variant.length > 0 && (
              <React.Fragment key={`${giftItem.promotionId}`}>
                <div
                  className="GWPItemChangeLink__LinkItem"
                  role="button"
                  data-testid="SelectGiftItemLinkToPortal"
                  aria-label={textChange}
                  tabIndex={showGWPModal ? 0 : -1}
                  onClick={() => {
                    handleGWPChange(giftItem, commerceItem);
                  }}
                  onKeyUp={event => {
                    if (event.key === 'Enter') handleGWPChange(giftItem, commerceItem);
                  }}
                >
                  <div className="GWPItemChangeLink__LinkItemDisplayName">
                    <span className="GWPItemChangeLink__ChangeGiftItem">{textChange}</span>
                  </div>
                </div>
                {typeof window !== 'undefined' && (
                  <Suspense fallback={null}>
                    <GWPItemSelectionModal
                      giftProductId={selectedGiftItem && selectedGiftItem.id}
                      giftProduct={giftProduct}
                      setGiftProduct={setGiftProduct}
                      selectedGiftItem={selectedGiftItem}
                      setSelectedGiftItem={setSelectedGiftItem}
                      selectedCommerceItem={selectedCommerceItem}
                      showGWPModal={showGWPModal}
                      setShowGWPModal={setShowGWPModal}
                      hideGWPModal={hideGWPModal}
                      setSelectedCommerceItem={setSelectedCommerceItem}
                      {...props}
                    />
                  </Suspense>
                )}
              </React.Fragment>
            )
        )}
    </Styled>
  );
};

export default React.memo(GWPItemChangeLink);
