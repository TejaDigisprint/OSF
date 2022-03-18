/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';
import {t} from '@oracle-cx-commerce/utils/generic';
import {CartItemContext, ProductSelectionContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/order-item/styles.css';
import {
  CartItemPromotion,
  CartItemSurcharge,
  CartItemSiteInformation
} from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/cart-line-item-components';
import {OrderItemImage} from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/order-item/order-item-image';
import {BackOrderPreOrderDates} from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/order-item/backorder-preorder-dates';
import {
  CommerceItemFreeGiftIconMessage,
  CommerceItemName,
  CommerceItemPrice,
  CommerceItemTotalPrice,
  CommerceItemVariants,
  CommerceItemQty
} from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/commerce-item-components';
import CPQItemConfigurationDetails from '@oracle-cx-commerce/react-widgets/cart/extended-cart-item-details/components/cpq-item-configuration-details';
import {getSite, getCurrentSiteId, getPage} from '@oracle-cx-commerce/commerce-utils/selector';
import {buildPdpUrl} from '@oracle-cx-commerce/react-components/utils/cart';
import { PAGE_CHECKOUT_PAYMENT_AND_REVIEW_ORDER_LINK } from '@oracle-cx-commerce/commerce-utils/constants';

export const OrderItem = props => {
  const {shippingGroupCommerceItem = {}, commerceItem = {}, shippingGroupId, showItemPrice, priceListGroup} = props;

  const {siteId} = commerceItem;
  const {getState} = useContext(StoreContext);
  const cartItemSite = getSite(getState(), {siteId});
  const currentSiteId = getCurrentSiteId(getState());
  const page = getPage(getState()).pageType;
  const disableItem = page === PAGE_CHECKOUT_PAYMENT_AND_REVIEW_ORDER_LINK;

  let pdpUrl = '';
  if (commerceItem.route) {
    pdpUrl = buildPdpUrl({commerceItem, cartItemSite, currentSiteId});
  }

  const orderItemDetails = {
    shippingGroupCommerceItem,
    commerceItem,
    shippingGroupId,
    showItemPrice,
    pdpUrl
  };

  const productSelectionContext = useContext(ProductSelectionContext);
  let productSelection, setProductSelection;
  if (productSelectionContext) {
    ({productSelection, setProductSelection} = productSelectionContext);
  }

  const handleItemSelection = event => {
    const selection = productSelection.filter(item => item.commerceItem.id !== props.commerceItem.id);

    if (event.target.checked) {
      selection.push({
        commerceItem: props.commerceItem
      });
    }

    setProductSelection(selection);
  };

  return (
    <Styled id="CartItem" css={css}>
      <CartItemContext.Provider key={shippingGroupCommerceItem.commerceId + shippingGroupId} value={orderItemDetails}>
        <div className={`OrderItem ${disableItem ? 'OrderItem__Disable' : ''}`}>
          <div className="OrderItem__ItemDetails">
            {props.enableProductSelection && (
              <Checkbox
                id={`OrderItem__Select${commerceItem.id}`}
                name={`OrderItem__Select${commerceItem.id}`}
                checked={productSelection.find(item => item.commerceItem.id === props.commerceItem.id) !== undefined}
                className="OrderItemDetails__ItemSelection"
                aria-label={t(props.actionSelectItem, {item: commerceItem.displayName})}
                onChange={handleItemSelection}
              />
            )}
            <OrderItemImage />
            <div className="OrderItem__ItemBasicDetails">
              <CommerceItemName />
              <CommerceItemVariants />
              <div className="OrderItem__MobileVisible">
                {props.showItemPrice && (
                  <CommerceItemPrice messageAtTheRate={props.messageAtTheRate} priceListGroup={priceListGroup} />
                )}
                <CommerceItemTotalPrice textFree={props.textFree} priceListGroup={priceListGroup} />
              </div>
              <BackOrderPreOrderDates messageAvailableDate={props.messageAvailableDate} />
              <CartItemPromotion />
              <CommerceItemFreeGiftIconMessage textFreeGift={props.textFreeGift} />
              <CartItemSurcharge shippingSurchargeText={props.shippingSurchargeText} />
              {props.displayCartItemSiteInfo && <CartItemSiteInformation textSiteIcon={props.textSiteIcon} />}
            </div>
            <div className="OrderItem__MobileVisible">
              <div className="OrderItemQuantity__Label">{props.textQuantity}</div>
              <CommerceItemQty />
            </div>
            <div className="OrderItem__DesktopVisibleContainer">
              <CommerceItemPrice messageAtTheRate={props.messageAtTheRate} priceListGroup={priceListGroup} />
              <div className="OrderItem__QuantityTotalContainer">
                <CommerceItemQty />
                <CommerceItemTotalPrice textFree={props.textFree} priceListGroup={priceListGroup} />
              </div>
            </div>
          </div>
          {commerceItem.configuratorId && (
            <CPQItemConfigurationDetails commerceItemKey={commerceItem} priceListGroup={priceListGroup} {...props} />
          )}
        </div>
      </CartItemContext.Provider>
    </Styled>
  );
};
