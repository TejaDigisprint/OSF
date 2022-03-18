// /**
//  * Metadata for the wishListReducer action.
//  */
export const wishListReducer = {
  name: 'wishListReducer',
  // Action's description
  description: 'Description for wishListReducer',
  author: 'OrCon',
  // This action uses a Saga to invoke an endpoint.
  endpoints: [],
  // The path to Json schema representing the request Json structure and the example of payload.
  input: '@oracle-cx-commerce/core-commerce-reference-store/src/plugins/actions/wish-list-reducer/schema/input.json',
  packageId: '@oracle-cx-commerce/core-commerce-reference-store',
  // The path to Json schema representing the redux states changes due to this reducer.
  // We expect the Json schema to contain the state definition and an example.
  output: './schema/output.json'
};
