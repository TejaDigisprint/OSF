/**
 * Metadata for the wishListsaga action.
 */
export const wishListsaga = {
  name: 'wishListsaga',
  // Action's description
  description: 'Description for wishListsaga',
  author: 'OrCon',
  // This action uses a Saga to invoke an endpoint.
  endpoints: ['wishListsaga'],
  // The path to Json schema representing the request Json structure and the example of payload.
  input: '@oracle-cx-commerce/core-commerce-reference-store/src/plugins/actions/wish-listsaga/schema/input.json',
  packageId: '@oracle-cx-commerce/core-commerce-reference-store'
};
