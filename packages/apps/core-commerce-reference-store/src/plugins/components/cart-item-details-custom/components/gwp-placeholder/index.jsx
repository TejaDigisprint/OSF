/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  FreeGiftIconMessage,
  FreeMessage,
  FreeProductMessage
} from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-free-labels';
import React, {Suspense, useCallback, useContext, useState} from 'react';

import GiftIcon from '@oracle-cx-commerce/react-components/icons/gift';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-placeholder/styles.css';
import {getGWPProductWithVariants} from '@oracle-cx-commerce/react-components/utils/cart';
import {getProduct} from '@oracle-cx-commerce/commerce-utils/selector';

const GWPSkuSelectionModal = React.lazy(() =>
  import('@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-item-selection-modal')
);
/**
 * This component is a placeholder to choose SKU of multi variant GWP product.
 *
 * @param {*} props
 */
const GWPPlaceholder = props => {
  // resources
  const {textFreeProduct, textSelectGift, textFreeGift, textFree, textGiftItem} = props;

  // current order
  const {currentOrder = {}} = props;

  // state variables
  const [showGWPModal, setShowGWPModal] = useState(false);
  const [selectedGiftItem, setSelectedGiftItem] = useState({});
  const [giftProduct, setGiftProduct] = useState({});
  const {action, getState} = useContext(StoreContext);

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

  const handleGWPSelect = giftItem => {
    setSelectedGiftItem(giftItem);
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
    <Styled id="GWPPlaceholder" css={css}>
      <div className="GWPPlaceholder">
        {(currentOrder.giftWithPurchaseInfo || []).map(
          item =>
            item.giftWithPurchaseQuantityAvailableForSelection > 0 && (
              <React.Fragment key={`${item.promotionId}`}>
                <div className="GWPPlaceholder__ItemDetails">
                  <div className="GWPPlaceholder__GiftIconContainer">
                    <GiftIcon className="GWPPlaceholder__GiftIcon" title={textGiftItem} />
                  </div>

                  <div className="GWPPlaceholder__ItemBasicDetails">
                    <FreeProductMessage textFreeProduct={textFreeProduct} />
                    <div
                      className="GWPPlaceholder__LinkItem"
                      role="button"
                      data-testid="GiftItemSelectionLink"
                      aria-label={textSelectGift}
                      tabIndex={showGWPModal ? 0 : -1}
                      onClick={() => handleGWPSelect(item)}
                      onKeyUp={event => {
                        if (event.key === 'Enter') handleGWPSelect(item);
                      }}
                    >
                      <div className="GWPPlaceholder__LinkItemDisplayName">
                        <span className="GWPPlaceholder__SelectGiftItem">{textSelectGift}</span>
                      </div>
                    </div>
                    <FreeGiftIconMessage textFreeGift={textFreeGift} />
                  </div>
                  <FreeMessage textFree={textFree} />
                </div>
              </React.Fragment>
            )
        )}
        {typeof window !== 'undefined' && (
          <Suspense fallback={null}>
            <GWPSkuSelectionModal
              giftProduct={giftProduct}
              selectedGiftItem={selectedGiftItem}
              setSelectedGiftItem={setSelectedGiftItem}
              setGiftProduct={setGiftProduct}
              showGWPModal={showGWPModal}
              hideGWPModal={hideGWPModal}
              setShowGWPModal={setShowGWPModal}
              {...props}
            />
          </Suspense>
        )}
      </div>
    </Styled>
  );
};

export default React.memo(GWPPlaceholder);
