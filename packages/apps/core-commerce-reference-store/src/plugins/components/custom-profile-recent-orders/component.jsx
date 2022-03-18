/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  buildQuerySQLPram,
  getOrder,
  numberOfRecentOrdersDesktop,
  numberOfRecentOrdersMobile
} from '@oracle-cx-commerce/react-widgets/profile/profile-order-history/utils';

import Card from '@oracle-cx-commerce/react-components/card';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_ORDER_HISTORY_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import ProfileOrder from '@oracle-cx-commerce/react-widgets/profile/profile-order-history/components/profile-order';
import React from 'react';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getProfileOrdersData} from '@oracle-cx-commerce/react-widgets/profile/profile-order-history/selectors';

const {useCallback, useContext, useEffect, useRef, useState} = React;

/**
 * A component for display profile recent order.
 * Navigates to orders history page on click of View all orders
 */
const CustomProfileRecentOrders = props => {
  const [orderIds, setOrderIds] = useState([]);
  const {action} = useContext(StoreContext);
  const [showWidget, setShowWidget] = useState(false);
  const {profileId, isMobileDevice = true, siteId = null, displayThumbnails, isUserLoggedIn} = props;
  const numberOfMostRecentOrders = isMobileDevice ? numberOfRecentOrdersMobile : numberOfRecentOrdersDesktop;

  const count = useRef(0);

  const getOrderCallBack = useCallback(
    recentOrderIds => {
      setShowWidget(true);
      if (recentOrderIds && recentOrderIds.length > 0) setOrderIds([...orderIds, ...recentOrderIds]);
    },
    [orderIds]
  );

  useEffect(() => {
    if (profileId && count.current === 0) {
      count.current++;
      const q = buildQuerySQLPram(profileId);
      getOrder(q, 0, numberOfMostRecentOrders, action, displayThumbnails, getOrderCallBack);
    }
  }, [action, getOrderCallBack, numberOfMostRecentOrders, profileId, displayThumbnails, siteId]);

  return (
    <Styled id="ProfileRecentOrders" css={css}>
      <div className="ProfileRecentOrders alignCenter">
        {isUserLoggedIn && showWidget && (
          <>
            <h2>{props.headingRecentOrder}</h2>
            {(orderIds.length > 0 && (
              <>
                <div className="ProfileRecentOrders__OrdersList">
                  {orderIds.map((orderId, index) => (
                    <Card key={orderId}>
                      {index < numberOfMostRecentOrders && <ProfileOrder orderId={orderId} {...props}></ProfileOrder>}
                    </Card>
                  ))}
                </div>
                <Link href={PAGE_ORDER_HISTORY_LINK} className="ProfileRecentOrders__ViewAllButton">
                  {props.actionViewAllOrders}
                </Link>
              </>
            )) || <div>{props.messageNoOrderAssociated}</div>}
          </>
        )}
      </div>
    </Styled>
  );
};

export default connect(getProfileOrdersData)(CustomProfileRecentOrders);
