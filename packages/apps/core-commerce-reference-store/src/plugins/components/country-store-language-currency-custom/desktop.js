/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
 import React, { useContext, useState } from 'react';
 import CountryStoreLanguageCurrencyPicker from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/components/country-store-language-currency-picker';
 import DesktopLocaleLinks from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/components/desktop-locale-links';
 import PropTypes from 'prop-types';
 import Styled from '@oracle-cx-commerce/react-components/styled';
 import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
 import css from './desktop.css';
 import { connect } from '@oracle-cx-commerce/react-components/provider';
 import { getSiteData } from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/selectors';
 import { fetchAllSites } from '@oracle-cx-commerce/fetchers/site';
 import { useAllSitesFetcher } from '@oracle-cx-commerce/fetchers/site/hooks';
 import { isEmptyObject } from '@oracle-cx-commerce/utils/generic';
 import { getSiteConfigSettings } from '@oracle-cx-commerce/react-widgets/site/country-store-language-currency/utils';
 import DropDown from '@oracle-cx-commerce/react-components/dropdown';
 // import Modal from "@oracle-cx-commerce/react-components/modal"
 import Modal from '../modal-custom'
 
 
 /*
   export fetchers to load all sites into the state during server-side rendering.
  */
 export const fetchers = [fetchAllSites];
 
 /**
  * Displays the site settings of current site and provides links to select country store/
  * language/currency from the respective selector.
  * @param {*} props - includes labels for site settings and CountryStore/Language/Currency picker
  * and contains current site properties.
  */
 const customCountryStoreLanguageCurrencyDesktop = props => {
   const [show, setShow] = useState(false)
   const store = useContext(StoreContext);
   const [selectedCurrency, setSelectedCurrency] = useState("")
 
   /**
    * invoke fetcher hook to load all sites into state,
    * this will not perform any task if state already has sites
    * This is effective if SSR didn't populate the state with sites data
    */
 
   useAllSitesFetcher(store);
   const { allSites = {} } = props;
 
   /** Site Config Settings */
   const siteConfigSettings = getSiteConfigSettings(props);
 
   /**
    * Component's state used to control the display of Locale Picker Modal
    */
   const [displayLocalePickerModal, setDisplayLocalePickerModal] = useState(true);
  
   // console.log(store);
   
 
   // const selectedCurrency = props.allSites.siteUS.billingCountries[0];
 
   // when client-side rendering happens, check if sites are available in state
   if (!isEmptyObject(allSites)) {
     return (
       <Styled id="CountryStoreLanguageCurrencyDesktop" css={css}>
         <div className="CountryStoreLanguageCurrencyDesktop">
           <p style={{ cursor: "pointer", fontWeight: 'bold', letterSpacing: '1px', }} onClick={() => setShow(true)}>{`Select a Country`} </p>
 
           <DropDown
             style={{ fontWeight: 'bold', letterSpacing: '1px' }}
             onChange={event => {
               
               setSelectedCurrency(event.target.value)
               setShow(false)
             }}>
             {selectedCurrency ? (<img src={`https://flagcdn.com/16x12/${selectedCurrency.toLowerCase()}.png`} alt="" />) : <option style={{ fontWeight: 'bold', letterSpacing: '1px' }} value="">United States</option>}
 
             {props.allSites.siteUS.billingCountries.map(currency => (
               <option style={{ fontWeight: 'bold', letterSpacing: '1px' }} key={currency.repositoryId} value={currency.repositoryId}>
                 {currency.displayName}
               </option>
             ))}
           </DropDown>
           {/* <span>{selectedCurrency && <img src={`https://flagcdn.com/40x30/${selectedCurrency.toLowerCase()}.png`} alt="" />}</span> */}
 
 
           {/* <Modal show={show} onClose={()=>setShow(false)} title="International Shipping">
            
           </Modal> */}
 
 
           {/* {
             selectedCurrency && (
               <div>
                 Selected currency: {selectedCurrency.displayName} (<img src={`https://flagcdn.com/16x12/${selectedCurrency.toLowerCase()}.png`} alt="" />)
               </div>
             )
           } */}
         </div>
       </Styled>
     );
   }
   return "Currnecy Selector";
 };
 
 // customCountryStoreLanguageCurrencyDesktop.propTypes = {
 //   allSites: PropTypes.shape({
 //     [PropTypes.string]: PropTypes.object
 //   }),
 //   additionalLanguages: PropTypes.arrayOf(
 //     PropTypes.shape({
 //       displayName: PropTypes.string.isRequired,
 //       localeId: PropTypes.string.isRequired,
 //       name: PropTypes.string.isRequired
 //     })
 //   ),
 
 //   priceListGroupList: PropTypes.arrayOf(
 //     PropTypes.shape({
 //       active: PropTypes.bool.isRequired,
 //       currency: PropTypes.shape({
 //         currencyCode: PropTypes.string.isRequired,
 //         displayName: PropTypes.string.isRequired,
 //         symbol: PropTypes.string.isRequired
 //       }),
 //       displayName: PropTypes.string.isRequired,
 //       id: PropTypes.string.isRequired,
 //       locale: PropTypes.string.isRequired
 //     }).isRequired
 //   ),
 
 //   currentSite: PropTypes.shape({
 //     id: PropTypes.string.isRequired,
 //     name: PropTypes.string.isRequired,
 //     productionURL: PropTypes.string.isRequired
 //   }).isRequired,
 
 //   priceListGroup: PropTypes.string.isRequired,
 //   locale: PropTypes.string.isRequired
 // };
 
 // customCountryStoreLanguageCurrencyDesktop.defaultProps = {
 //   allSites: {},
 //   additionalLanguages: [],
 //   priceListGroupList: []
 // };
 
 export default connect(getSiteData)(customCountryStoreLanguageCurrencyDesktop);
 