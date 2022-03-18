/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import DefaultAddressBookView from './components/default-address-book-view';
import NoAddressBookView from './components/no-address-book-view';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/profile/profile-address-book-summary/selectors';
import PropTypes from 'prop-types';

/**
 * Widget to display the default address summary at profile page.
 * @param {Object} props the properties object
 */
const CustomProfileAddressBookSummary = props => {
  const {textAddressBook, defaultAddress, isGetCurrentProfileInProgress} = props;

  return (
    <Styled id="ProfileAddressBookSummary" css={css}>
      <div className={`ProfileAddressBookSummary ${(isGetCurrentProfileInProgress === 0) && 'ProfileAddressBookSummary_div'}`}>
        {isGetCurrentProfileInProgress === 0 && (
          <>
            <h2>{textAddressBook}</h2>
            {defaultAddress ? <DefaultAddressBookView {...props} /> : <NoAddressBookView {...props} />}
          </>
        )}
      </div>
    </Styled>
  );
};

CustomProfileAddressBookSummary.propTypes = {
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
   * True if current profile call is in progress
   * evaluated based on endpoint status in redux state
   */
  isGetCurrentProfileInProgress: PropTypes.number.isRequired
};

CustomProfileAddressBookSummary.defaultProps = {
  defaultAddress: undefined
};

export default connect(getComponentData)(CustomProfileAddressBookSummary);
