/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { isEmptyObject, noop, t } from '@oracle-cx-commerce/utils/generic';

import Alert from '@oracle-cx-commerce/react-components/alert';
import { CartContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-validations/styles.css';
import { getOutOfStockProductNames } from '@oracle-cx-commerce/react-components/utils/cart';
import { useNumberFormatter } from '@oracle-cx-commerce/react-components/utils/hooks';
import { ORDER_STATE_PENDING_PAYMENT, ORDER_STATE_QUOTED } from '@oracle-cx-commerce/commerce-utils/constants';

/**
 * CartValidation component displays shopping cart commerce items price changes, promotion update and other commerce item validation update information.
 * @param {*} props
 */

const CartValidation = props => {
  // state variable to hold alert messages related to cart
  const [cartValidationAlertMessages, setCartValidationAlertMessages] = useState({});
  const {
    alertNoLongerForSale,
    alertOutOfStock,
    alertPriceIncreased,
    messagePriceChange,
    alertPriceDecreased,
    alertCartHeading,
    alertNoLongerForSaleQuote,
    alertOrderHeading,
    alertOutOfStockQuote
  } = props;
  // resources
  const formatCurrency = useNumberFormatter({ style: 'currency' });
  const { currentOrder = {}, giftWithPurchaseMessages = [], skuInventory = {} } = props;
  const { setCartStatus = noop } = useContext(CartContext);

  // Validates commerce items which are no longer in sale and sets alert message accordingly
  const checkInActiveItem = useCallback(() => {
    if (currentOrder) {
      const invalidProductNames = [];
      const {state, commerceItems, quoteInfo} = currentOrder;
      if (commerceItems && Object.keys(commerceItems).length > 0) {
        for (const commerceId in commerceItems) {
          const commerceItem = commerceItems[commerceId];
          if (state === ORDER_STATE_QUOTED || (state === ORDER_STATE_PENDING_PAYMENT && quoteInfo && !isEmptyObject(quoteInfo))) {
            if (commerceItem.active === false || commerceItem.isItemValid === false) {
              invalidProductNames.push(commerceItem.displayName);
            }
          } else {
            if (!commerceItem.isItemValid) {
              invalidProductNames.push(commerceItem.displayName);
            }
          }
        }
      }
      if (invalidProductNames.length > 0) {
        setCartStatus(prevState => {
          return { ...prevState, hasInactiveItems: true };
        });
        const message = (
          <>
            <div className="CartValidation__AlertMessageBody">
              {currentOrder.state === ORDER_STATE_QUOTED ? alertNoLongerForSaleQuote : alertNoLongerForSale}
              </div>
            {invalidProductNames.map(productName => (
              <div key={`${productName}-inActive`} className="CartValidation__AlertProductName">
                {productName}
              </div>
            ))}
          </>
        );
        setCartValidationAlertMessages(prevState => {
          return { ...prevState, noLongerAvailableInSale: { message } };
        });
        scrollTo({ top: 0, left: 0 });
      } else {
        setCartStatus(prevState => {
          return { ...prevState, hasInactiveItems: false };
        });
        setCartValidationAlertMessages(prevState => {
          const { noLongerAvailableInSale, ...data } = prevState;

          return data;
        });
      }
    }
  }, [alertNoLongerForSale, currentOrder, setCartStatus]);

  // Validate commerce item for gwp validation and reset the sets message accordingly
  const checkGWPValidation = useCallback(() => {
    if (giftWithPurchaseMessages && giftWithPurchaseMessages.length > 0) {
      const messages = [];
      for (let i = 0; i < giftWithPurchaseMessages.length; i++) {
        const gwpMessage = giftWithPurchaseMessages[i];
        if (
          gwpMessage.params &&
          gwpMessage.params.length &&
          gwpMessage.params.length === 2 &&
          gwpMessage.params[1] &&
          gwpMessage.summary
        ) {
          messages.push(gwpMessage);
        }
      }
      if (messages.length > 0) {
        setCartValidationAlertMessages(prevState => {
          return {
            ...prevState,
            gwp: {
              message: (
                <>
                  {messages.map(gwpMessage => (
                    <div key={gwpMessage.params[0]} className="CartValidation__AlertGWPMessage">
                      {gwpMessage.summary}
                    </div>
                  ))}
                </>
              )
            }
          };
        });
        scrollTo({ top: 0, left: 0 });
      }
    } else {
      setCartValidationAlertMessages(prevState => {
        const { gwp, ...data } = prevState;

        return data;
      });
    }
  }, [giftWithPurchaseMessages]);

  // Check price change of commerce item and sets the alert message accordingly
  const checkPriceChange = useCallback(() => {
    if(currentOrder.state === ORDER_STATE_QUOTED){
      return;
    }
    const priceChangeMessages = [];
    if (currentOrder && currentOrder.commerceItems && Object.keys(currentOrder.commerceItems).length > 0) {
      for (const commerceId in currentOrder.commerceItems) {
        const commerceItem = currentOrder.commerceItems[commerceId];
        if (Object.prototype.hasOwnProperty.call(commerceItem, 'priceChange')) {
          const oldPrice = commerceItem.unitPrice + commerceItem.priceChange;
          let message;
          if (commerceItem.priceChange > 0) {
            message = t(alertPriceIncreased, {
              productName: commerceItem.displayName,
              oldPrice: formatCurrency(oldPrice),
              newPrice: formatCurrency(commerceItem.unitPrice)
            });
          } else if (commerceItem.priceChange < 0) {
            message = t(alertPriceDecreased, {
              productName: commerceItem.displayName,
              oldPrice: formatCurrency(oldPrice),
              newPrice: formatCurrency(commerceItem.unitPrice)
            });
          }
          priceChangeMessages.push({ id: commerceItem.id, message });
        }
      }
    }
    if (priceChangeMessages.length > 0) {
      const message = (
        <>
          {/* <div className="CartValidation__AlertMessageBody">
            <span className="CartValidation__AlertItemCount">
              {t(messageItems, {NUMBER: priceChangeMessages.length})}
            </span>
            {messagePriceChange}
          </div> */}
          <div
            className="CartValidation__PriceChangeItemCount"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: t(messagePriceChange, { numberOfItems: priceChangeMessages.length }) }}
          ></div>
          {priceChangeMessages.map(({ id, message }) => (
            <div
              className="CartValidation__PriceChangeMessage"
              key={id}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: message }}
            ></div>
          ))}
        </>
      );
      setCartValidationAlertMessages(prevState => {
        return { ...prevState, priceDrop: { message } };
      });
      scrollTo({ top: 0, left: 0 });
    } else {
      setCartValidationAlertMessages(prevState => {
        const { priceDrop, ...data } = prevState;

        return data;
      });
    }
    // eslint-disable-next-line spellcheck/spell-checker
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder, alertPriceIncreased, messagePriceChange]);

  // Check out of stock validation for commerce item and sets alert message accordingly
  const checkOutOfStockValidation = useCallback(() => {
    const productNames = getOutOfStockProductNames({ currentOrder, skuInventory });
    if (productNames.length > 0) {
      setCartStatus(prevState => {
        return { ...prevState, hasOutOfStockItems: true };
      });
      const message = (
        <>
          <div className="CartValidation__AlertMessageBody">
            {currentOrder.state === ORDER_STATE_QUOTED ? alertOutOfStockQuote : alertOutOfStock}
            </div>
          {productNames.map(productName => (
            <div key={productName} className="CartValidation__AlertProductName">
              {productName}
            </div>
          ))}
        </>
      );
      setCartValidationAlertMessages(prevState => {
        return { ...prevState, outOfStock: { message } };
      });
      scrollTo({ top: 0, left: 0 });
    } else {
      setCartStatus(prevState => {
        return { ...prevState, hasOutOfStockItems: false };
      });
      setCartValidationAlertMessages(prevState => {
        const { outOfStock, ...data } = prevState;

        return data;
      });
    }
  }, [currentOrder, skuInventory, setCartStatus, alertOutOfStock]);

  // Calls checkInActiveItem and checkPriceChange once currentOrder get data
  useEffect(() => {
    if (!isEmptyObject(currentOrder)) {
      checkInActiveItem();
      checkPriceChange();
    }
  }, [checkInActiveItem, checkPriceChange, currentOrder]);

  // Calls checkGWPValidation once currentOrder and giftWithPurchaseMessages get data
  useEffect(() => {
    if (!isEmptyObject(giftWithPurchaseMessages) && !isEmptyObject(currentOrder)) {
      checkGWPValidation();
    }
  }, [checkGWPValidation, currentOrder, giftWithPurchaseMessages]);

  // Calls checkOutOfStockValidation once currentOrder and skuInventory get data
  useEffect(() => {
    if (!isEmptyObject(skuInventory) && !isEmptyObject(currentOrder)) {
      checkOutOfStockValidation(); //hasOutOfStockItems
    }
  }, [checkOutOfStockValidation, currentOrder, skuInventory]);

  // Empty Messages when commerce Items are empty and messages are present
  useEffect(() => {
    if (isEmptyObject(currentOrder) && Object.keys(cartValidationAlertMessages || {}).length > 0) {
      setCartValidationAlertMessages({});
    }
  }, [currentOrder, cartValidationAlertMessages]);

  return (
    <Styled id="CartValidation" css={css}>
      <>
        {Object.keys(cartValidationAlertMessages || {}).length > 0 && (
          <div className="CartValidation">
            <Alert type="warning">
              <div className="CartValidation__AlertHeading">
                {currentOrder.state === ORDER_STATE_QUOTED ? alertOrderHeading : alertCartHeading}
                </div>
              {Object.keys(cartValidationAlertMessages || {}).map(key => (
                <div key={key}>{cartValidationAlertMessages[key].message}</div>
              ))}
            </Alert>
          </div>
        )}
      </>
    </Styled>
  );
};

export default CartValidation;
