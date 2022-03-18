/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {
  isAuthenticated,
  getCardTypes,
  getCurrentProfileId,
  getProfileSavedCardsArray
} from '@oracle-cx-commerce/commerce-utils/selector';
import {compareCards} from '@oracle-cx-commerce/react-components/utils/payment';

/**
 * Returns data required by the component
 * @return {Object} state the application state
 */
export const getPageData = state => {
  const cardTypes = getCardTypes(state);
  const cards = getProfileSavedCardsArray(state).sort(compareCards);

  // return default (or first card if no default card) card and corresponding card type object
  return {
    cardType: cards[0] ? cardTypes[cards[0].cardType] : null,
    defaultCard: cards[0],
    isUserLoggedIn: isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous'
  };
};
