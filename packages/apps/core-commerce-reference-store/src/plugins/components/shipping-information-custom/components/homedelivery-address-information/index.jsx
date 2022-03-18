/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/homedelivery-address-information/styles.css';

/**
 * Following component renders Address Details
 *
 * @param props
 */

export const HomeDeliveryAddressInformation = props => {
  const {address = {}, headingAddress} = props;
  const {firstName, lastName, address1, address2, city, state, postalCode, country} = address;

  return (
    <Styled id="HomeDeliveryAddressInformation" css={css}>
      <div className="HomeDeliveryAddressInformation__Address">
        <div className="HomeDeliveryAddressInformation__Heading">{headingAddress}</div>
        <div className="HomeDeliveryAddressInformation__AddressSummary">
          {firstName && (
            <div className="HomeDeliveryAddressInformation__AddressDetails">
              <span className="HomeDeliveryAddressInformation__FirstName">{firstName}</span>
              {lastName && <span className="HomeDeliveryAddressInformation__LastName">{lastName}</span>}
            </div>
          )}
          {address1 && (
            <div className="HomeDeliveryAddressInformation__AddressDetails">
              {address1 && <span>{`${address1},`}</span>}
            </div>
          )}
          {address2 && (
            <div className="HomeDeliveryAddressInformation__AddressDetails">
              {address1 && <span>{`${address2},`}</span>}
            </div>
          )}
          {state && (
            <div className="HomeDeliveryAddressInformation__AddressDetails">
              {city && <span>{city}</span>}
              {state && <span>{state}</span>}
              {postalCode && <span>{postalCode}</span>}
              {country && <span>{country}</span>}
            </div>
          )}
        </div>
      </div>
    </Styled>
  );
};
