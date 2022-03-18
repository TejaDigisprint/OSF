/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import AddressCard from '@oracle-cx-commerce/react-components/icons/address-card';
import Card from '@oracle-cx-commerce/react-components/card';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_ADD_PROFILE_ADDRESS_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import React from 'react';

/**
 * Displays no address book view.
 * @param {Object} props the properties object
 */
const NoAddressBookView = props => {
  const {actionAddAnAddress, textAddressBookHelper1, textAddressBookHelper2} = props;

  return (
    <div className="ProfileAddressBookSummary__NoAddressContent">
      <Card type="primary">
        <div>{textAddressBookHelper1}</div>
        <div>{textAddressBookHelper2}</div>
        <div className="ProfileAddressBookSummary__AddAnAddressLinkContainer">
          <span aria-label={`${textAddressBookHelper1} ${textAddressBookHelper2} ${actionAddAnAddress}`}>
            <Link href={PAGE_ADD_PROFILE_ADDRESS_LINK}>
              <AddressCard />
              <span>{actionAddAnAddress}</span>
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default NoAddressBookView;
