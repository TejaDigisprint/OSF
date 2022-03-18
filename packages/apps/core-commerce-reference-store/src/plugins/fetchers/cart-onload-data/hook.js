import {useEffect} from 'react';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {cartOnloadData} from '..';

/**
 * This hook will invoke the cartOnloadData if the currency
 * list is not already available in the application state.
 */
export default store =>
  useEffect(() => {
    // Detects if the site was populated in the state during server-side rendering
    if (store && isEmptyObject(store['orderRepository'])) {
        cartOnloadData(store);
    }
  }, [store]);
