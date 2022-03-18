/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useEffect, useState} from 'react';
import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import {uuid as id, isEmptyObject} from '@oracle-cx-commerce/utils/generic';

/***
 * AddressInput to capture address details while performing self registration of an account */
const AddressInput = ({translations, shippingCountries = {}, defaultState = 'US', companyName}) => {
  const [country, setCountry] = useState(defaultState);
  const [regions, setRegions] = useState([]);
  const [state, setState] = useState('');

  const {
    labelCountry,
    labelZipCode,
    labelState,
    labelStreetAddress1,
    labelStreetAddress2,
    labelCityTown,
    labelPhoneNumber,
    textCompanyAddressOptional
  } = translations;

  useEffect(() => {
    if (Object.keys(shippingCountries).length) {
      if (shippingCountries[country]) {
        setRegions(shippingCountries[country].regions);
      }
    }
  }, [shippingCountries, country]);

  const onCountryChange = event => {
    setCountry(event.target.value);
    if (isEmptyObject(shippingCountries[event.target.value])) {
      setRegions([]);
    }
  };
  const onStateChange = event => {
    setState(event.target.value);
  };
  /* returns options array sorted by displayName */
  const getSortedOptions = (items, valueField, sortBy) => {
    return []
      .concat(Object.values(items) || [])
      .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
      .map(item => (
        <option value={item[valueField]} key={item[valueField]} aria-label={item[sortBy]}>
          {item[sortBy]}
        </option>
      ));
  };

  return (
    <>
      <hr />
      <div>
        <p className="AccountAndContactRegistration_BoldText">{textCompanyAddressOptional}</p>
        <div className="AccountAndContactRegistration__Row">
          <Dropdown
            className="AccountAndContactRegistration__Col"
            label={labelCountry}
            id={`${labelCountry}-${id()}`}
            name="organization[secondaryAddresses[0[address[country]]]]"
            onChange={onCountryChange}
            value={country}
            required={true}
            autoComplete="country-name"
            data-testid="Account-countryName"
          >
            <option value="" key="Select Country">
              Select Country
            </option>
            {isEmptyObject(shippingCountries) ? (
              <option value="" key="loading Country">
                Loading...
              </option>
            ) : (
              getSortedOptions(shippingCountries, 'countryCode', 'displayName')
            )}
          </Dropdown>

          <div className="AccountAndContactRegistration__Col AccountAndContactRegistration__ZipAndState">
            <p className="AddressInput__ZipCodeFlexItem">
              <label htmlFor={`${labelZipCode}-${id}`}>{labelZipCode}</label>
              <input
                aria-label={labelZipCode}
                id={`${labelZipCode}-${id}`}
                name="organization[secondaryAddresses[0[address[postalCode]]]]"
                type="text"
                maxLength="10"
                autoComplete="postal-code"
                data-testid="Account-zipCode"
              />
              <span className="validationMessage"></span>
            </p>

            <Dropdown
              className="AddressInput__StateFlexItem"
              label={labelState}
              id={`${labelState}-${id()}`}
              name="organization[secondaryAddresses[0[address[state]]]]"
              onChange={onStateChange}
              value={state}
              autoComplete="address-level1"
              data-testid="Account-state"
            >
              <option value="" key="Select Country">
                Select State
              </option>
              {isEmptyObject(shippingCountries) ? (
                <option value="" key="loading state">
                  Loading...
                </option>
              ) : (
                getSortedOptions(regions, 'abbreviation', 'displayName')
              )}
            </Dropdown>
          </div>
        </div>
        <div className="AccountAndContactRegistration__Row">
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelStreetAddress1}-${id}`}>{labelStreetAddress1}</label>
            <input
              aria-label={labelStreetAddress1}
              id={`${labelStreetAddress1}-${id}`}
              name="organization[secondaryAddresses[0[address[address1]]]]"
              type="text"
              required={false}
              autoCapitalize="words"
              maxLength="254"
              autoComplete="street-address"
              data-testid="Account-streetAddress1"
            />
            <span className="validationMessage"></span>
          </p>
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelStreetAddress2}-${id}`}>{labelStreetAddress2}</label>
            <input
              aria-label={labelStreetAddress2}
              id={`${labelStreetAddress2}-${id}`}
              name="organization[secondaryAddresses[0[address[address2]]]]"
              type="text"
              required={false}
              autoCapitalize="words"
              maxLength="254"
              data-testid="Account-streetAddress2"
            />
            <span className="validationMessage"></span>
          </p>
        </div>
        <div className="AccountAndContactRegistration__Row">
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelCityTown}-${id}`}>{labelCityTown}</label>
            <input
              aria-label={labelCityTown}
              id={`${labelCityTown}-${id}`}
              name="organization[secondaryAddresses[0[address[city]]]]"
              type="text"
              required={false}
              autoCapitalize="words"
              autoComplete="address-level2"
              maxLength="254"
              data-testid="Account-city"
            />
            <span className="validationMessage"></span>
          </p>
          <p className="AccountAndContactRegistration__Col">
            <label htmlFor={`${labelPhoneNumber}-${id}`}>{labelPhoneNumber}</label>
            <input
              aria-label={labelPhoneNumber}
              id={`${labelPhoneNumber}-${id}`}
              name="organization[secondaryAddresses[0[address[phoneNumber]]]]"
              type="tel"
              required={false}
              autoComplete="tel"
              maxLength="15"
              data-testid="Account-phoneNumber"
            />
            <span className="validationMessage"></span>
          </p>
        </div>
        <input type="hidden" name="organization[secondaryAddresses[0[address[companyName]]]]" value={companyName} />
      </div>
      <hr />
    </>
  );
};

export default AddressInput;
