/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useState, useRef} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Form from '@oracle-cx-commerce/react-components/form';
import Alert from '@oracle-cx-commerce/react-components/alert';
import EmailIcon from '@oracle-cx-commerce/react-components/icons/email';
import css from './styles.css';
import {usePageData} from './selectors';

/**
 * Product Notification Widget: displays a form if the product is out of stock
 * to notify the shopper via email when it's back in stock
 */
const CustomProductNotifyMe = props => {
  // resources
  const {textProductNotifyMe, labelEmail, labelNotifyMe, alertProductNotifyMeSuccess} = props;

  // state
  const {stockStatus, productId, skuId, authenticated, profile, siteId, locale, action} = usePageData();

  const [alertStatus, setAlertStatus] = useState('');

  const alertRef = useRef(null);
  const onOk = useCallback(() => {
    setAlertStatus('success');
    alertRef.current.focus();
  }, []);

  const onNotOk = useCallback(
    ({error}) => {
      action('notify', {level: 'error', message: error.message});
    },
    [action]
  );

  return (
    <div className="ProductNotifyMe">
      {stockStatus === 'OUT_OF_STOCK' && (
        <Styled id="ProductNotifyMe" css={css}>
          {alertStatus ? (
            <div id="ProductNotifyMe__Alert" ref={alertRef}>
              <Alert type={alertStatus} message={alertStatus === 'success' && alertProductNotifyMeSuccess} />
            </div>
          ) : (
            <Form action="addProductNotification" onOk={onOk} onNotOk={onNotOk} noValidate>
              <p>{textProductNotifyMe}</p>
              <label htmlFor={'email'} className="ProductNotifyMe__EmailLabel">
                {labelEmail}
              </label>
              <div className="ProductNotifyMe__Input">
                <EmailIcon className="ProductNotifyMe__EmailIcon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={authenticated ? profile.email : ''}
                  required
                />
                <span className="validationMessage"></span>
              </div>
              <input name="productId" type="hidden" defaultValue={productId} />
              <input name="skuId" type="hidden" defaultValue={skuId} />
              <input name="locale" type="hidden" defaultValue={locale} />
              <input name="siteId" type="hidden" defaultValue={siteId} />
              <button type="submit" className="secondary ProductNotifyMe__Button">
                {labelNotifyMe}
              </button>
            </Form>
          )}
        </Styled>
      )}
    </div>
  );
};

export default CustomProductNotifyMe;
