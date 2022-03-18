/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext, useEffect, useState} from 'react';
import DefaultSavedCardView from '@oracle-cx-commerce/react-widgets/profile/profile-saved-card-summary/components/default-saved-card-view';
import NoSavedCardView from '@oracle-cx-commerce/react-widgets/profile/profile-saved-card-summary/components/no-saved-card-view';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getPageData} from '@oracle-cx-commerce/react-widgets/profile/profile-saved-card-summary/selectors';
import {useCardTypesFetcher} from '@oracle-cx-commerce/fetchers/payments/hooks';
import PropTypes from 'prop-types';

//constants
const ERROR = 'error';

/**
 * Component to display default saved card or first saved card if default card is not present.
 * If no saved card available then displays expected message.
 * It includes default saved card and no saved card sub components.
 * @param {Object} props the props object
 */
const CustomProfileSavedCardSummary = props => {
  const {headingSavedCreditCards, isUserLoggedIn} = props;
  const {defaultCard} = props;
  const store = useContext(StoreContext);
  const {action} = store;
  const [actionCompletedSuccessfully, setActionCompletedSuccessfully] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);

  // Fetches the list of card types
  useCardTypesFetcher(store);

  //triggers action to list saved cards for the profile
  useEffect(() => {
    if (isUserLoggedIn && !actionCompletedSuccessfully && !errorOccured) {
      action('listProfileSavedCards').then(response => {
        if (response.ok) setActionCompletedSuccessfully(true);
        else {
          const {error} = response;
          action('notify', {level: ERROR, message: error.message});
          setErrorOccured(!errorOccured);
        }
      });
    }
  }, [action, actionCompletedSuccessfully, errorOccured, isUserLoggedIn]);

  return (
    <Styled id="ProfileSavedCardSummary" css={css}>
      {isUserLoggedIn && actionCompletedSuccessfully && !errorOccured && (
        <div className={`ProfileSavedCardSummary ${(isUserLoggedIn && actionCompletedSuccessfully && !errorOccured) && 'ProfileSavedCardSummary_div'}`}>
          <h2>{headingSavedCreditCards}</h2>
          {defaultCard ? <DefaultSavedCardView {...props} /> : <NoSavedCardView {...props} />}
        </div>
      )}
    </Styled>
  );
};

CustomProfileSavedCardSummary.propTypes = {
  /**
   * The unique id for the component
   */
  id: PropTypes.string.isRequired,

  /**
   * Flag to indicate if user is logged in or not
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * Type of credit/debit card
   */
  cardType: PropTypes.shape({
    /**
     * Image defaults for card type
     */
    img: PropTypes.shape({
      /**
       * Image url for card type
       */
      url: PropTypes.string.isRequired
    }).isRequired,

    /**
     * IIN value for card
     */
    iin: PropTypes.string.isRequired,

    /**
     * Name of card type
     */
    name: PropTypes.string.isRequired,

    /**
     * Repository id for card type
     */
    repositoryId: PropTypes.string.isRequired
  }),

  /**
   * The default credit/debit card object (first credit/debit card in case default saved card not present)
   * from redux state(ProfileRepository->savedCards>-profileId->savedCardsMap->'usercc10002')
   */
  defaultCard: PropTypes.shape({
    /**
     * Card type
     */
    cardType: PropTypes.string.isRequired,
    /**
     * Card number
     */
    cardNumber: PropTypes.string.isRequired,
    /**
     * Expiry month of card
     */
    expiryMonth: PropTypes.string.isRequired,
    /**
     * Expiry year of card
     */
    expiryYear: PropTypes.string.isRequired,
    /**
     * Name of card
     */
    nameOnCard: PropTypes.string.isRequired,
    /**
     * Flag to indicate whether card is default card
     */
    isDefault: PropTypes.bool.isRequired
  })
};

/**
 * Default values for not required properties
 */
 CustomProfileSavedCardSummary.defaultProps = {
  cardType: null,
  defaultCard: undefined
};

export default connect(getPageData)(CustomProfileSavedCardSummary);
