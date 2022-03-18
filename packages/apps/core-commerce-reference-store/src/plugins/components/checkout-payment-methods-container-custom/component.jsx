/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useEffect, useContext, useRef, useState} from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getComponentData} from './selectors';
import {PaymentsContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {noop, isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {usePaymentConfigurationsFetcher} from '@oracle-cx-commerce/fetchers/payments/hooks';
import {fetchPaymentConfigurations} from '@oracle-cx-commerce/fetchers/payments';
import {PAYMENT_STATE_INITIAL, ORDER_STATE_PENDING_PAYMENT, ORDER_STATE_QUOTED} from '@oracle-cx-commerce/commerce-utils/constants';
import css from './styles.css';
import PropTypes from 'prop-types';

/*
  Export payment configurations fetcher so that the server can use them to load state during 
  server-side rendering.
 */
export const fetchers = [fetchPaymentConfigurations];

/**
 * A container that holds all the payment related widgets.
 * Holds widgets for credit card, gift card, pay in store or other payment method widgets.
 * @param props
 */
const CheckoutPaymentMethodsContainerCustom = props => {
  // props
  const {regions = [], orderState, paymentGroups, textOrderProcessingTimedOut} = props;
  const store = useContext(StoreContext);

  // Calls usePaymentConfigurations Fetcher hook to load the payment configurations data into the state
  // This will not perform any action if the payment configuration is already part of the state.
  usePaymentConfigurationsFetcher(store);
  const paymentMethodsRef = useRef(null);
  const {isApprovalRequired, setPaymentsAlertMessage = noop} = useContext(PaymentsContext) || {};
  const [inProgress, setInProgress] = useState(false);

  //track the loaded radio button elements count
  const radioElementsCount =
    paymentMethodsRef && paymentMethodsRef.current
      ? paymentMethodsRef.current.querySelectorAll('.CheckoutPaymentsGroup').length
      : 0;

  //useEffect to style bottom border of last dom element which contains CheckoutPaymentsGroup css class
  useEffect(() => {
    if (paymentMethodsRef && paymentMethodsRef.current) {
      const elements = paymentMethodsRef.current.querySelectorAll('.CheckoutPaymentsGroup');
      const lastElement = elements.length > 0 ? elements[elements.length - 1] : null;
      //apply bottom border style to the last element
      lastElement &&
        !lastElement.classList.contains('BottomBorderStyle') &&
        lastElement.classList.add('BottomBorderStyle');
      // remove bottom border style from non last element
      for (let i = 0; i < elements.length - 1; i++) {
        if (elements[i].classList.contains('BottomBorderStyle')) {
          elements[i].classList.remove('BottomBorderStyle');
        }
      }
    }
  }, [isApprovalRequired, paymentMethodsRef, radioElementsCount]);

  // Remove expired payment group from the current order
  useEffect(() => {
    const removeExpiredPaymentGroups = async () => {
      if (paymentGroups && !isEmptyObject(paymentGroups) && !inProgress && orderState !== ORDER_STATE_PENDING_PAYMENT  && orderState !== ORDER_STATE_QUOTED ) {
        const expiredPaymentGroups = Object.values(paymentGroups).filter(
          paymentGroup => paymentGroup.paymentExpired === 'true' && paymentGroup.paymentState === PAYMENT_STATE_INITIAL
        );
        // Calling deleteAppliedPayment action to remove expired payment groups
        if (expiredPaymentGroups.length > 0) {
          setInProgress(true);
          // notify the user to re-enter payment details since payment groups have expired
          setPaymentsAlertMessage({type: 'info', message: textOrderProcessingTimedOut});

          // remove each expired payment group
          for (const paymentGroup of expiredPaymentGroups) {
            const {paymentGroupId} = paymentGroup;
            await store.action('deleteAppliedPayment', {paymentGroupId});
          }
          setInProgress(false);
        }
      }
    };
    removeExpiredPaymentGroups();
  }, [inProgress, textOrderProcessingTimedOut, paymentGroups, setPaymentsAlertMessage, store, orderState]);

  return (
    <Styled id="CheckoutPaymentMethodsContainer" css={css}>
      <section ref={paymentMethodsRef} className="CheckoutPaymentMethodsContainer">
        {regions.map(regionId => (
          <Region key={regionId} regionId={regionId} />
        ))}
      </section>
    </Styled>
  );
};

CheckoutPaymentMethodsContainerCustom.propTypes = {
  /**
   * The state of the order (INCOMPLETE, PENDING_PAYMENT etc)
   */
  orderState: PropTypes.string,
  /**
   * The list of region Id's contained in the container
   */
  regions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Object containing list of payment groups on the order
   */
  paymentGroups: PropTypes.objectOf(
    PropTypes.shape({
      /**
       * Indicates if the payment group has expired
       */
      paymentExpired: PropTypes.string,
      /**
       * The payment group id
       */
      paymentGroupId: PropTypes.string.isRequired,
      /**
       * The state of the payment group(INITIAL, AUTHROIZED etc)
       */
      paymentState: PropTypes.string.isRequired
    })
  )
};

CheckoutPaymentMethodsContainerCustom.defaultProps = {
  orderState: undefined,
  paymentGroups: undefined
};

export default connect(getComponentData)(CheckoutPaymentMethodsContainerCustom);
