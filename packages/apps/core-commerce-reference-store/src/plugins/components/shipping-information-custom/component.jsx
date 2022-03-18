/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';

import {HardGoodShippingGroupList} from './components/hardgood-shippinggroup-list';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {ContainerContext, OrderContext} from '@oracle-cx-commerce/react-ui/contexts';
import OrderSelectAll from './components/order-select-all';
import {
  PAGE_CHECKOUT_PAYMENT_AND_REVIEW_ORDER_LINK,
  PAGE_CHECKOUT_QUOTE_SHIPPING_LINK,
  PAGE_CHECKOUT_SHIPPING_LINK
} from '@oracle-cx-commerce/commerce-utils/constants';
import {PickUpInStoreShippingGroupList} from './components/pickupinstore-shippinggroup-list';
import {ShippingGroupList} from './components/shippinggroup-list';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/profile/shipping-information/selectors';

/**
 * Following widget renders all the shipping groups present in the order.
 * Sorts the shipping groups to display hard good shipping groups first and
 * Pickup in store shipping groups at the last.
 * @param props
 */
const ShippingInformationCustom = props => {
  const {messageEmptyCart, headingShippingMethod, labelEdit, showEditLink = false} = props;
  const {currentPageType, orderId} = props;
  /*
    Placeholder to modify shipping groups sorting on client side
    after large cart endpoint supports sorting.
  */
  const isSortRequired = props.sortShippingGroups !== undefined ? props.sortShippingGroups : true;
  const {shippingGroups = {}, commerceItems = {}, priceListGroup} = useContext(OrderContext);

  //To get place order initiation status
  const {isPlaceOrderInitiated = false} = useContext(ContainerContext) || {};

  const goToPage = useNavigator();

  /**
   * Click handler for the 'Edit' button
   * If the current page is checkout-quote-payment-and-review, then it navigates to the checkout quote shipping page
   * Else it navigates to the checkout shipping page
   */
  const handleButtonClick = () => {
    if (currentPageType === PAGE_CHECKOUT_PAYMENT_AND_REVIEW_ORDER_LINK) {
      goToPage(`${PAGE_CHECKOUT_QUOTE_SHIPPING_LINK}/${orderId}`);
    } else {
      goToPage(PAGE_CHECKOUT_SHIPPING_LINK);
    }
  };

  return (
    <Styled id="ShippingInformation" css={css}>
      <div className="ShippingInformation">
        <div className="ShippingInformation__HeadingContainer">
          <h2>{headingShippingMethod}</h2>
          {showEditLink && (
            <div
              className={
                !isPlaceOrderInitiated
                  ? 'ShippingInformation__EditPayment'
                  : 'ShippingInformation__EditPayment--disable'
              }
            >
              <button type="button" onClick={handleButtonClick}>
                {labelEdit}
              </button>
            </div>
          )}
        </div>
        {isEmptyObject(commerceItems) ? (
          <div className="ShippingInformation__ErrorMessage">{messageEmptyCart}</div>
        ) : (
          <>
            {props.enableProductSelection && <OrderSelectAll commerceItems={commerceItems} {...props} />}
            {isSortRequired ? (
              <>
                <HardGoodShippingGroupList shippingGroups={shippingGroups} {...props} priceListGroup={priceListGroup} />
                <PickUpInStoreShippingGroupList
                  shippingGroups={shippingGroups}
                  {...props}
                  priceListGroup={priceListGroup}
                />
              </>
            ) : (
              //No Sorting. Default Shipping Groups list order
              <ShippingGroupList shippingGroups={shippingGroups} {...props} />
            )}
          </>
        )}
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(ShippingInformationCustom);
