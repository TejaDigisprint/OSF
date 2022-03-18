/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {PAYMENT_STATE_INITIAL} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {useContext} from 'react';

import Card from '@oracle-cx-commerce/react-components/card';
import {GeneralPaymentDetails} from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/general-payment-details';
import {OrderContext} from '@oracle-cx-commerce/react-ui/contexts';
import {PaymentDetails} from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/payment-details';
import {PendingPaymentInformation} from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/pending-payment-information';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/profile/payment-information/selectors';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

/**
 * Following component iterates on payment groups and renders each payment group.
 *
 * @param props - list of payment groups
 */

const PaymentInformationCustom = props => {
  const {textPayAfterApproval, isPayAfterApprovalSelected} = props;

  //For Order Details page, billing Address will not be available inside payment groups.
  //Billing Address has to be explicitly set in the order context for order details page
  const {paymentGroups = {}, billingAddress = {}} = useContext(OrderContext);

  //Method to check if payment Group is Expired or not
  const isPaymentValid = paymentId => {
    let isValid = false;
    const paymentGroup = paymentGroups[paymentId];

    if (paymentGroup && paymentGroup.paymentState !== PAYMENT_STATE_INITIAL) {
      //For Order Details, payment state will not be INITIAL.
      //Payment expired check need not be checked in this case.
      isValid = true;
    } else if (
      paymentGroup &&
      !paymentGroup.paymentExpired &&
      (paymentGroup.amount !== 0 || (paymentGroup.amount === 0 && Object.keys(paymentGroups).length === 1)) &&
      !paymentGroup.default_initial
    ) {
      //Check payment group is expired and amount is not equal to zero
      //Check payment group amount is zero and there is only one payment group
      //This will be executed for current order(i.e, Review)
      isValid = true;
    }

    return isValid;
  };

  // If Payment Groups is empty, doesn't render anything
  if (isEmptyObject(paymentGroups) && !isPayAfterApprovalSelected) {
    return null;
  }
  const isOnlyDefaultPaymentGroup =
    Object.values(paymentGroups).length === 1 && Object.values(paymentGroups)[0].default_initial === 'true';

  return (
    <Styled id="PaymentInformation" css={css}>
      <div className="PaymentInformation">
        <div className="PaymentInformation__HeadingContainer">
          <h2>{props.headingPaymentMethod}</h2>
        </div>
        {!isOnlyDefaultPaymentGroup && (
          <Card className="PaymentInformation__Card">
            {!isPayAfterApprovalSelected ? (
              <div className="PaymentInformation__PaymentGroups">
                {(Object.keys(paymentGroups) || []).map(paymentId => (
                  <React.Fragment key={`PaymentGroup-${paymentId}`}>
                    {isPaymentValid(paymentId) && (
                      <div className="PaymentInformation__PaymentGroupItem">
                        <PaymentDetails payment={paymentGroups[paymentId]} billingAddress={billingAddress} {...props} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <GeneralPaymentDetails>{textPayAfterApproval}</GeneralPaymentDetails>
            )}
          </Card>
        )}
        <PendingPaymentInformation {...props} />
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(PaymentInformationCustom);
