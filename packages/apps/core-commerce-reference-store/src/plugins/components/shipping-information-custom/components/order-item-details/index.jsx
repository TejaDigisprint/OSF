/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {OrderItem} from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/order-item';
import css from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/order-item-details/styles.css';
import CartItemsTableHeader from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/cart-items-table-header';

/**
 * Following component iterates on each shipping group order items and
 * renders order item details component
 *
 * @param props
 */

const OrderItemDetails = props => {
  const {
    shippingGroup = {},
    shippingGroupId,
    commerceItems = {},
    textItemDetails,
    textItemPrice,
    textQuantity,
    textTotal
  } = props;

  return (
    <Styled id="OrderItemDetails" css={css}>
      {!isEmptyObject(commerceItems) && (
        <div className="OrderItemDetails">
          <CartItemsTableHeader {...{textItemDetails, textItemPrice, textQuantity, textTotal}} />
          {(shippingGroup.items || []).map(item => (
            <OrderItem
              key={`${shippingGroupId}-${item.commerceId}`}
              shippingGroupCommerceItem={item}
              shippingGroupId={shippingGroupId}
              commerceItem={commerceItems[item.commerceId]}
              {...props}
              priceListGroup={props.priceListGroup}
            />
          ))}
        </div>
      )}
    </Styled>
  );
};

export default OrderItemDetails;
