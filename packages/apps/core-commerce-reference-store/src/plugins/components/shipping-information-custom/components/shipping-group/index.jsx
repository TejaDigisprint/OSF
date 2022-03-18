/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';
import {OrderContext} from '@oracle-cx-commerce/react-ui/contexts';
import Card from '@oracle-cx-commerce/react-components/card';
import OrderItemDetails from '../order-item-details';
import {ShippingAddressDetails} from '../shipping-address-details';
import {t} from '@oracle-cx-commerce/utils/generic';
import {hasCartItemsFromMultipleSites} from '@oracle-cx-commerce/commerce-utils/selector';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';


/**
 * Following component renders shipping group details
 * Following Wrapper component holds the sub components of shipping group
 * @param props
 */

export const ShippingGroup = props => {
  const {shippingGroupId, headingHomeDelivery, headingInStorePickUp, shippingDeliveryIndex = ''} = props;
  const order = useContext(OrderContext);
  const {shippingGroups = {}, commerceItems = {}} = order;
  const displayCartItemSiteInfo = useSelector(hasCartItemsFromMultipleSites, {commerceItems});
  const PICKUP_INSTORE_SHIPPINGGROUP = 'inStorePickupShippingGroup';

  return (
    <React.Fragment>
      {((shippingGroups[shippingGroupId] || {}).items || []).length > 0 && (
        <Card  key={`ShippingGroup-${shippingGroupId}`}>
          <h3 className="ShippingGroup__Heading">
            {shippingGroups[shippingGroupId].type === PICKUP_INSTORE_SHIPPINGGROUP
              ? t(headingInStorePickUp, {shippinggroupindex: shippingDeliveryIndex})
              : t(headingHomeDelivery, {shippinggroupindex: shippingDeliveryIndex})}
          </h3>
          <OrderItemDetails
            shippingGroup={shippingGroups[shippingGroupId]}
            commerceItems={commerceItems}
            shippingGroupId={shippingGroupId}
            priceListGroup={props.priceListGroup}
            displayCartItemSiteInfo={displayCartItemSiteInfo}
            {...props}
          />
          <ShippingAddressDetails
            shippingGroup={shippingGroups[shippingGroupId]}
            shippingGroupId={shippingGroupId}
            {...props}
          />
        </Card>
      )}
    </React.Fragment>
  );
};
