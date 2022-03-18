/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import CreditCardIcon from '@oracle-cx-commerce/react-components/icons/credit-card';
import css from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/general-payment-details/styles.css';

export const GeneralPaymentDetails = props => {
  const {className = '', children = ''} = props;

  return (
    <Styled id="GeneralPaymentDetails" css={css}>
      <div className={`GeneralPaymentDetails ${className}`}>
        <CreditCardIcon className="GeneralPaymentDetails__CardIcon" />
        <div className="GeneralPaymentDetails__Details">{children}</div>
      </div>
    </Styled>
  );
};
