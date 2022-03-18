/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';

import AddressView from '@oracle-cx-commerce/react-widgets/profile/profile-address-book/components/address-view';
import Card from '@oracle-cx-commerce/react-components/card';
import MoreAddressActions from '../more-address-actions';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Component to display an account address card.
 * @param {Object} props the properties object
 */
const AddressBookCard = props => {
  const {itemId, defaultShippingAddressId, contactInfos} = props;

  return (
    <Styled id="AddressBookCard" css={css}>
      {contactInfos && contactInfos[itemId] && (
        <div key={`${itemId}`} className="AddressBookCard__ListItem">
          <Card className="AddressBookCard__Card AddressBookCard__Card_div">
            <div className="AddressBookCard__AddressView">
              <AddressView
                {...props}
                showShippingBadge={defaultShippingAddressId === itemId}
                address={contactInfos[itemId]}
                addressInfoClass={'AddressBookCard__Info'}
              />
              <MoreAddressActions {...props} />
            </div>
          </Card>
        </div>
      )}
    </Styled>
  );
};

export default React.memo(AddressBookCard);
