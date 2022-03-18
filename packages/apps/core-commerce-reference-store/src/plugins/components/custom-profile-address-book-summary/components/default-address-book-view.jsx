/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import AddressInfo from '@oracle-cx-commerce/react-widgets/profile/profile-address-book/components/address-info';
import Badge from '@oracle-cx-commerce/react-components/badge';
import Card from '@oracle-cx-commerce/react-components/card';
import Home from '@oracle-cx-commerce/react-components/icons/home';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_ADDRESS_BOOK_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Displays default saved card (if no default address then first address) View.
 * @param {Object} props the properties object
 */
const DefaultAddressBookView = props => {
  const {actionManage, labelManage, labelDefaultAddress} = props;

  const {defaultAddress, defaultShippingAddressId} = props;

  return (
    <div className="ProfileAddressBookSummary__DefaultAddressContent">
      <Card>
        <div className="ProfileAddressBookSummary__HomeIcon">
          <Home />
        </div>
        <div className="ProfileAddressBookSummary__DefaultAddress">
          <AddressInfo address={defaultAddress} />
          {defaultShippingAddressId ? <Badge badgeText={labelDefaultAddress} ariaLabel={labelDefaultAddress} /> : ''}
        </div>
        <div className="ProfileAddressBookSummary__RightContent">
          <Link href={"address-book-custom"} aria-label={labelManage}>
            {actionManage}
          </Link>
        </div>
      </Card>
    </div>
  );
};

DefaultAddressBookView.propTypes = {
  /** The default address object picked from redux state */
  defaultAddress: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }),

  /**
   * Default shipping address id for current profile
   * Pulled from redux state(ProfileRepository->profiles[currentProfileId].shippingAddress)
   */
  defaultShippingAddressId: PropTypes.string.isRequired
};

DefaultAddressBookView.defaultProps = {
  defaultAddress: undefined
};

export default DefaultAddressBookView;
