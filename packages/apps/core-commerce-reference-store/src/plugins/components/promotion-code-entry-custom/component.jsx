/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useContext, useEffect, useState, useRef} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Minus from '@oracle-cx-commerce/react-components/icons/minus';
import Plus from '@oracle-cx-commerce/react-components/icons/plus';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/cart/promotion-code-entry/selectors';
import WarningIcon from '@oracle-cx-commerce/react-components/icons/warning';

/**
 * PromotionCodeEntry widget displays input field to enter and apply Promotion.
 * It handles promotion validation message.
 * @param {*} props
 */
const PromotionCodeEntryCustom = props => {
  //resources and configuration
  const {
    messageDuplicateCoupon,
    textApplyPromoCode,
    lablePromoCode,
    actionApply,
    messageEmptyCoupon,
    showApplyPromoInput = false
  } = props;
  const appliedCoupons = props.coupons || [];

  // component state variables
  const [showPromoForm, setShowPromoForm] = useState(showApplyPromoInput === 'true');
  const [couponErrorMessage, setCouponErrorMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isApplyCodeClicked, setIsApplyCodeClicked] = useState(false);
  const promoCodeInputElement = useRef(null);

  //context
  const {action} = useContext(StoreContext);

  const couponAlreadyApplied = () => {
    let alreadyApplied = false;
    if (appliedCoupons && appliedCoupons.length > 0) {
      const couponCount = appliedCoupons.length;
      for (let i = 0; i < couponCount; i++) {
        if (appliedCoupons[i] === promoCode) {
          alreadyApplied = true;
          break;
        }
      }
    }

    return alreadyApplied;
  };

  const applyPromotion = () => {
    setPromoCode(promoCode.trim());
    if (promoCode && promoCode !== '') {
      if (couponErrorMessage !== '') {
        setCouponErrorMessage('');
      }
      // check if the coupon has already been applied.
      if (couponAlreadyApplied()) {
        setCouponErrorMessage(messageDuplicateCoupon);
      } else {
        const payload = {
          coupons: [promoCode]
        };
        setIsApplyCodeClicked(true);
        action('applyCouponsToCart', payload).then(response => {
          setIsApplyCodeClicked(false);
          if (response.ok) {
            promoCodeInputElement.current.value = '';
          } else if (response.error && response.error.errors && response.error.errors.length > 0) {
            const errorMessage = response.error.errors.reduce(
              (errorMessage, error) => `${errorMessage} ${error.message}`,
              ''
            );
            promoCodeInputElement.current.focus();
            setCouponErrorMessage(errorMessage);
          }
        });
      }
    } else {
      setCouponErrorMessage(messageEmptyCoupon);
    }
  };

  useEffect(() => {
    if (showPromoForm && promoCodeInputElement && promoCodeInputElement.current) promoCodeInputElement.current.focus();
  }, [showPromoForm]);

  return (
    <Styled id="PromotionCodeEntry" css={css}>
      {props.displayPromoCodeEntry && (
        <div className="PromotionCodeEntry">
          <span
            role="button"
            tabIndex="0"
            className="PromotionCodeEntry__LabelContainer"
            onClick={() => setShowPromoForm(!showPromoForm)}
            onKeyUp={event => {
              if (event.key === 'Enter') setShowPromoForm(!showPromoForm);
            }}
            aria-label={textApplyPromoCode}
          >
            <span className="PromotionCodeEntry__Icon promoIcon">{showPromoForm ? <Minus /> : <Plus />}</span>
            <span className="PromotionCodeEntry__Label promoCodeApplyText">{textApplyPromoCode}</span>
          </span>
          {showPromoForm && (
            <div className="PromotionCodeEntry__Container">
              <label className="PromotionCodeEntry__Container__Lable" htmlFor="PromotionCodeEntry__Input">
                {lablePromoCode}
              </label>
              <div className="PromotionCodeEntry__InputContainer">
                <input
                  name="promoCode"
                  onChange={event => {
                    setPromoCode(event.target.value);
                  }}
                  id="PromotionCodeEntry__Input"
                  data-testid="PromotionCodeEntry__Input"
                  onKeyUp={event => {
                    if (event.key === 'Enter') applyPromotion();
                  }}
                  ref={promoCodeInputElement}
                ></input>
                <span></span>
                <button onClick={applyPromotion} type="button" className="secondary" disabled={isApplyCodeClicked}>
                  {actionApply}
                </button>
              </div>
              {couponErrorMessage !== '' && (
                <div className="PromotionCodeEntry__ErrorMessage">
                  <WarningIcon></WarningIcon>
                  <span className='errorMessagePromotion'>{couponErrorMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Styled>
  );
};

export default connect(getComponentData)(PromotionCodeEntryCustom);
