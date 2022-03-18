/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {formatCardNumber} from '@oracle-cx-commerce/react-components/utils/payment';
import {t} from '@oracle-cx-commerce/utils/generic';
import {getCardTypes} from '@oracle-cx-commerce/commerce-utils/selector';
import {PaymentBillingAddressDetails} from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/billing-address';
import css from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/credit-card/styles.css';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {useCardTypesFetcher} from '@oracle-cx-commerce/fetchers/payments/hooks';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';

/**
 * Following component renders Credit Card Information.
 *
 * @param props - Credit Card Details
 */
export const CreditCardPaymentDetails = props => {
  const store = useContext(StoreContext);
  // Fetches the list of card types
  useCardTypesFetcher(store);

  const {displayBillToName = false, textExpiryDate, textBillingAddress} = props;
  const cardTypes = useSelector(getCardTypes) || {};
  const cardDetails = props.payment || {};

  /** For Order Details(get order) billing Address needs to be explicitly passed
   *  For current order, billing Address will be available in payment method object
   */
  const billingAddress = cardDetails.billingAddress || props.billingAddress || {};

  const {cardType = '', nameOnCard = '', cardNumber, expiryMonth = '', expiryYear = ''} = cardDetails;

  const cardIconURL = cardType && cardTypes[cardType] ? (cardTypes[cardType].img || {}).url : '';
  const cardIconName = cardType && cardTypes[cardType] ? cardTypes[cardType].name : '';

  // Don't Render anything if card number is not available
  if (!cardNumber) {
    return null;
  }

  return (
    <Styled id="CreditCardPaymentDetails" css={css}>
      <div className="CreditCardPaymentDetails">
        {cardIconURL && (
          <div className="CreditCardPaymentDetails__CardIconDetails">
            <img className="CreditCardPaymentDetails__CardIcon" src={cardIconURL} alt={cardIconName} />
          </div>
        )}
        <div className="CreditCardPaymentDetails__CardDetails">
          {nameOnCard && <span className="CreditCardPaymentDetails__CardText">{nameOnCard}</span>}
          <span className="CreditCardPaymentDetails__CardText">{formatCardNumber(cardNumber, cardType)}</span>
          {expiryMonth && expiryYear && (
            <span className="CreditCardPaymentDetails__CardText">
              {t(textExpiryDate, {MONTH: expiryMonth, YEAR: expiryYear})}
            </span>
          )}
          <PaymentBillingAddressDetails
            billingAddress={billingAddress}
            displayBillToName={displayBillToName}
            textBillingAddress={textBillingAddress}
          />
        </div>
      </div>
    </Styled>
  );
};
