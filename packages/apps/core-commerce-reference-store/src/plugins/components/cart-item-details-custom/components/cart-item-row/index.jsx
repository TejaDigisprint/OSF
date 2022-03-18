/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {CartItemContext, ProductSelectionContext} from '@oracle-cx-commerce/react-ui/contexts';
import {
  CartItemPromotion,
  CartItemQuantityDisplayAndUpdate,
  CartItemRemoveLink,
  CartItemStockStatus,
  CartItemSurcharge,
  CartItemUpdateError,
  CartItemSiteInformation
} from '../cart-line-item-components/index';
import {
  CommerceItemFreeGiftIconMessage,
  CommerceItemImage,
  CommerceItemName,
  CommerceItemPrice,
  CommerceItemQty,
  CommerceItemTotalPrice,
  CommerceItemVariants,
  CommerceItemSkuProperties
} from '../../../commerce-item-components-custom/index';
import React, {useState} from 'react';

import AddToPurchaseList from '@oracle-cx-commerce/react-widgets/profile/add-to-purchase-list/component';
import GWPItemChangeLink from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-item-change-link';
import MoveProductToWishList from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/move-product-to-wishlist';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useCartItemState} from '@oracle-cx-commerce/react-components/utils/cart/hooks';
import {ORDER_STATE_QUOTED} from '@oracle-cx-commerce/commerce-utils/constants';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';

/**
 * It display each cart item in shopping cart based on the current viewport.
 *
 * @param {*} props
 */
const CartItemRow = props => {
  const {
    shippingGroupCommerceItem = {},
    commerceItem = {},
    shippingGroupId,
    showItemPrice,
    currentOrder: {shippingGroups, state},
    setInvalidItems,
    setInvalidItemsOnQuantityChange,
    messageInsufficientStock,
    messageInsufficientStockAtStore,
    pdpUrlNotRequired,
    messagePartialPreOrder,
    messagePartialBackOrder,
    messageItemNoLongerAvailable
  } = props;
  const [triggerRemoveItem, setTriggerRemoveItem] = useState(false);
  const store = React.useContext(StoreContext)

  /**
   * Cart Item status from the custom hook - useCartItemState
   */
  const {cartItemDetails, isItemInValid} = useCartItemState({
    commerceItem,
    shippingGroupCommerceItem,
    shippingGroups,
    shippingGroupId,
    showItemPrice,
    pdpUrlNotRequired,
    setInvalidItems,
    setInvalidItemsOnQuantityChange,
    messageInsufficientStock,
    triggerRemoveItem,
    messageInsufficientStockAtStore
  });

  // Product selection context data
  const productSelection = {
    commerceItem,
    shippingGroups,
    shippingGroupId,
    setTriggerRemoveItem
  };

  const saveForLater = async() =>{
    const commerceId = commerceItem && commerceItem.id || ""
    const cartProduct = await store.endpoint("getCartItem",{commerceItemId:commerceId})
    let commerceOrders = cartProduct && cartProduct.delta && cartProduct.delta.orderRepository && cartProduct.delta.orderRepository.orders || {}
    let commerceItemsObject = Object.keys(commerceOrders).length ? Object.values(commerceOrders)[0] : {}
    let commerceItems = commerceItemsObject.commerceItems || {}
    Object.keys(commerceItems).map(item=>{
      if(item == commerceId){
        store.action("saveforlaterupdated",commerceItems[item])
      }
    })
    const deletedCommerce =await store.action("deleteItemFromCart",{commerceItemId:commerceId})
    //console.log("Deleted Commerce",deletedCommerce)
  }

  return (
    <Styled id="CartItemRow" css={css}>
      <CartItemContext.Provider value={cartItemDetails}>
        <ProductSelectionContext.Provider value={{productSelection}}>
          <div className={`CartItemRow ${isItemInValid || state === ORDER_STATE_QUOTED ? 'CartItem__Disable' : ''}`}>
            <div>
              <div className="CartItemDetails__ItemDetails">
                <CommerceItemImage />
                <div className="CartItemDetails__ItemBasicDetails">
                  <CommerceItemName />
                  <CommerceItemVariants {...props}/>
                  <CommerceItemSkuProperties {...props} skuProperties={props.commerceItem && props.commerceItem.skuProperties || []}/>
                  <div className="CartItemDetails__MobileVisible">
                    {props.showItemPrice && <CommerceItemPrice messageAtTheRate={props.messageAtTheRate} />}
                  </div>
                  {commerceItem.giftWithPurchaseCommerceItemMarkers &&
                    commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 && <GWPItemChangeLink {...props} />}
                  <CartItemStockStatus {...props} />
                  <CartItemPromotion />
                  <CommerceItemFreeGiftIconMessage textFreeGift={props.textFreeGift} />
                  <CartItemSurcharge shippingSurchargeText={props.shippingSurchargeText} />
                  {props.displayCartItemSiteInfo && <CartItemSiteInformation textSiteIcon={props.textSiteIcon} />}
                </div>
                <div className="CartItemDetails__DesktopVisible">
                  <CommerceItemPrice messageAtTheRate={props.messageAtTheRate} />
                </div>
                <div className="CartItemDetails__QuantityTotalContainer">
                  <div className="CartItemDetails__Quantity">
                    {commerceItem.giftWithPurchaseCommerceItemMarkers &&
                    commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 ? (
                      <CommerceItemQty />
                    ) : (
                      <CartItemQuantityDisplayAndUpdate {...props} />
                    )}
                  </div>
                  <div className="CartItemDetails__Total">
                    <CommerceItemTotalPrice textFree={props.textFree} />
                  </div>
                </div>
              </div>
              <CartItemUpdateError
                invalidItemsOnQuantityChange={props.invalidItemsOnQuantityChange}
                currentOrder={props.currentOrder}
                messageInsufficientStock={messageInsufficientStock}
                messageInsufficientStockAtStore={messageInsufficientStockAtStore}
                messagePartialPreOrder={messagePartialPreOrder}
                messagePartialBackOrder={messagePartialBackOrder}
                messageItemNoLongerAvailable={messageItemNoLongerAvailable}
              />
              <div className="CartItemDetails__BOPIS"></div>
              <div className="CartItemDetails__ActionLinks">
                <div className="CartItemDetails__ActionLinksLeftCol">
                  {props.showAddToPurchaseList && <AddToPurchaseList {...props} />}
                  {props.showMoveToWishList && <MoveProductToWishList {...props} />}
                </div>
                {state !== ORDER_STATE_QUOTED && <button onClick={saveForLater} className='btn btn-primary mx-2 btn_color'>Save For Later</button>}
                {state !== ORDER_STATE_QUOTED && <CartItemRemoveLink {...props} />}
              </div>
            </div>
          </div>
        </ProductSelectionContext.Provider>
      </CartItemContext.Provider>
    </Styled>
  );
};

export default React.memo(CartItemRow);
