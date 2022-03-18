/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {
  OrderContext,
  StoreContext,
  ContainerContext,
  ProductSelectionContext
} from '@oracle-cx-commerce/react-ui/contexts';
import {priceOrderTotal} from '@oracle-cx-commerce/react-components/utils/cart';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';
import ReviewOrderPlaceholder from './components/review-order-placeholder';
import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
import {getComponentData} from './selectors';
import { ORDER_STATE_QUOTED } from '@oracle-cx-commerce/commerce-utils/constants';

/**
 * CheckoutReviewOrderContainer holds widgets related to review order page.
 * Provides the current order context.
 * @param {*} props
 */
const CheckoutReviewOrderContainerCustom = props => {
  //props
  const {
    headingReviewOrder,
    regions = [],
    isGetCartInProgress,
    isPlaceOrderInProgress,
    commerceItems = {},
    orderState,
    ...currentOrder
  } = props;
  //state
  const [guestEmailDetails, setGuestEmailDetails] = useState({});
  const [isPlaceOrderInitiated, setPlaceOrderInitiated] = useState(false);
  const [productSelection, setProductSelection] = useState([]);
  const {action} = useContext(StoreContext);
  const count = useRef(0);

  /**
   * Method to invoke price order only once
   * Method to invoke stock status when commerce items changes
   */
  useEffect(() => {
    if (isGetCartInProgress !== 1 && !isEmptyObject(commerceItems)) {
      if (count.current === 0) {
        count.current++;
        // Reprice should be executed one time only.
        if(orderState !== ORDER_STATE_QUOTED){
          priceOrderTotal(action);
        }
      }
    }
  }, [action, commerceItems, isGetCartInProgress]);

  return (
    <Styled id="CheckoutReviewOrderContainer" css={css}>
      <div className="CheckoutReviewOrderContainer">
        <h2 className="CheckoutReviewOrderContainer__Heading">{headingReviewOrder}</h2>
        <PageLoader show={isGetCartInProgress === 1 || (isPlaceOrderInProgress && isGetCartInProgress === 0)}>
          <ReviewOrderPlaceholder />
        </PageLoader>
        {isGetCartInProgress !== 1 && !isPlaceOrderInProgress && (
          <OrderContext.Provider value={{commerceItems, ...currentOrder}}>
            <ContainerContext.Provider
              value={{guestEmailDetails, setGuestEmailDetails, isPlaceOrderInitiated, setPlaceOrderInitiated}}
            >
              <ProductSelectionContext.Provider value={{productSelection, setProductSelection}}>
                <section className="CheckoutReviewOrderContainer__Section">
                  {regions.map(regionId => (
                    <Region key={regionId} regionId={regionId} />
                  ))}
                </section>
              </ProductSelectionContext.Provider>
            </ContainerContext.Provider>
          </OrderContext.Provider>
        )}
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(CheckoutReviewOrderContainerCustom);
