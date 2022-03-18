/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-order-summary/components/payment-details/styles.css';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {formatCardNumber} from '@oracle-cx-commerce/react-components/utils/payment';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {
  PAYMENT_TYPE_GIFTCARD,
  PAYMENT_METHOD_TOKENIZED_CREDIT_CARD,
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_TYPE_PAY_IN_STORE,
  PAYMENT_METHOD_INVOICE_REQUEST
} from '@oracle-cx-commerce/commerce-utils/constants';

/**
 * Following component renders different payment methods based on payment method type.
 *
 * @param props - Payment method type
 */
const PaymentDetails = props => {
  const {payment = {}, textOrderSummaryGiftCard, orderPriceListGroup, labelPayInStore, labelInvoice} = props;
  const {amount, cardType = '', cardNumber, maskedCardNumber, paymentMethod} = payment;
  // fix: getting the priceListGroup as props, as the order data is not getting updated with the correct PLG on 'priceCart' call
  const minusSign = '-';
  const formatCurrency = useNumberFormatter({style: 'currency'}, orderPriceListGroup);

  /**
   * Shipping Value
   */
  const renderCreditCard = () => (
    <div className="PaymentDetails__Row">
      <div className="PaymentDetails__ColLabel">
        <span className="PaymentDetails__Label">
          {cardType && <span className="PaymentDetails__CardType">{cardType}</span>}
          <span className="PaymentDetails__CardNumber">{formatCardNumber(cardNumber, cardType)}</span>
        </span>
      </div>
      <div className="PaymentDetails__ColValue">
        <span className="PaymentDetails__Value">
          {minusSign}
          {formatCurrency(parseFloat(amount))}
        </span>
      </div>
    </div>
  );

  const renderPayInStore = () => (
    <div className="PaymentDetails__Row">
      <div className="PaymentDetails__ColLabel">
        <span className="PaymentDetails__Label">
          <span>{labelPayInStore}</span>
        </span>
      </div>
      <div className="PaymentDetails__ColValue">
        <span className="PaymentDetails__Value">
          {minusSign}
          {formatCurrency(parseFloat(amount))}
        </span>
      </div>
    </div>
  );

  const renderGiftCard = () => (
    <div className="PaymentDetails__Row">
      <div className="PaymentDetails__ColLabel">
        <span className="PaymentDetails__Label">
          <span>{textOrderSummaryGiftCard}</span>
          <span className="PaymentDetails__CardNumber">{maskedCardNumber.replace(/x/g, '*')}</span>
        </span>
      </div>
      <div className="PaymentDetails__ColValue">
        <span className="PaymentDetails__Value">
          {minusSign}
          {formatCurrency(parseFloat(amount))}
        </span>
      </div>
    </div>
  );

  const renderInvoice = () => (
    <div className="PaymentDetails__Row">
      <div className="PaymentDetails__ColLabel">
        <span className="PaymentDetails__Label">
          <span>{labelInvoice}</span>
        </span>
      </div>
      <div className="PaymentDetails__ColValue">
        <span className="PaymentDetails__Value">
          {minusSign}
          {formatCurrency(parseFloat(amount))}
        </span>
      </div>
    </div>
  );

  const getPaymentMethod = () => {
    return (
      <Styled id="PaymentDetails" css={css}>
        {(paymentMethod === PAYMENT_METHOD_CREDIT_CARD || paymentMethod === PAYMENT_METHOD_TOKENIZED_CREDIT_CARD) &&
          renderCreditCard()}
        {paymentMethod === PAYMENT_TYPE_GIFTCARD && renderGiftCard()}
        {paymentMethod === PAYMENT_TYPE_PAY_IN_STORE && renderPayInStore()}
        {paymentMethod === PAYMENT_METHOD_INVOICE_REQUEST && renderInvoice()}
      </Styled>
    );
  };

  return <>{getPaymentMethod()}</>;
};

export default PaymentDetails;
