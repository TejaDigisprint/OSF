import {all, put, select} from 'redux-saga/effects';
import {endpointSaga, takeEvery} from '@oracle-cx-commerce/store/utils';

/**
 * Saga that updates the application state. The code runs saga when the reducer flag is not supplied.
 * There are three options to consider:
 * 1. Create a custom action by default
 *    example: yarn occ create-action —-action-name getCurrency
 * 2. Create a custom action which invokes an endpoint with the same name as the action-name
 *    example: yarn occ create-action —-action-name getCurrency —-endpoint
 * 3. Create a custom action which invokes an endpoint with a different name as the action-name
 *    example: yarn occ create-action —-action-name testCurrency —-endpoint getCurrency
 */


function* wishListsagaSaga(action) {
  // Place to implement what the action will do
  // console.log(action.payload);
  console.warn('Action: wishListsaga have been invoked. No further action.');
   yield put({type:'wishListReducer',payload:action.payload});
}

function* wishListsagaRemove(action){
  yield put({type:"wishListReducerRmove",payload:action.payload})
}
/**
 * The wishListsaga action.
 *
 * This exports a generator function named "saga", whose presence signals OSF to pass
 * the generator function to Redux-Saga's middleware. Run API the first time the action
 * is dispatched via the store API.
 *
 * The generator function results in an asynchronous endpoint invocation
 * when the action is dispatched.
 */

export default {
  *saga() {
    yield all ([
      takeEvery('wishListsaga', wishListsagaSaga),
      takeEvery("wishListremove", wishListsagaRemove)
    ])
  }
};
