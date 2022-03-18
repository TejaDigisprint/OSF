/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useContext,useState,useEffect} from 'react';

import NavBar from './components/nav-bar';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {fetchMenuCategories} from '@oracle-cx-commerce/react-widgets/category/collection-navigation/fetcher';
import {useMenuCategoriesFetcher} from '@oracle-cx-commerce/react-widgets/category/collection-navigation/hook';
import {useRootCategoriesData} from './selectors';

export const fetchers = [fetchMenuCategories];

/**
 * Closes the drop down Menu, when escape key is pressed
 * @param  {Object} event
 */
const onEscapeKeyDown = event => {
  if (event.key === 'Escape') {
    event.target.blur();
  }
};


/**
 * Prevents sticky drop down menu when link is clicked
 * @param  {Object} event
 */
const onCategoryLinkClick = event => {
  if (event.target.tagName && event.target.tagName.toLocaleLowerCase() === 'a') {
    event.target.blur();
  }
};

/**
 * Collection Navigation Widget for desktop. Displays main menu in the nav bar and sub menu
 * in a drop down menu
 */
const customCollectionNavigationDesktop = props => {
  const [showNav,setShowNav]= useState(true)

  const hideNavigation = () =>{

    let headerpostition = document.getElementById('headerslidingcontainer') || null

    if(headerpostition){

      let headerHeight = headerpostition.getBoundingClientRect().height;

    if (window.scrollY>headerHeight){

      setShowNav(false)

    }

    else{

      setShowNav(true)

    }

  }
  }

  useEffect(()=>{

    window.addEventListener('scroll',hideNavigation)

    return ()=>{

      window.removeEventListener('scroll',hideNavigation)

    }

  },[]);

  
  // contexts
  const store = useContext(StoreContext);
  // hooks
  useMenuCategoriesFetcher(store, props);
  const rootCategories = useRootCategoriesData();

  return (
    <Styled id="CollectionNavigationDesktop" css={css}>
      <div
       className={`CollectionNavigationDesktop ${!showNav && 'hide'}`}
        role="menubar"
        tabIndex="-1"
        onKeyDown={onEscapeKeyDown}
        onClick={onCategoryLinkClick}
      >
        <NavBar categories={rootCategories} {...props} />
      </div>
    </Styled>
  );
};

export default customCollectionNavigationDesktop;
