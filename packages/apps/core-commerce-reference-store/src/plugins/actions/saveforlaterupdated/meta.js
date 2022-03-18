/**
 * Metadata for the saveforlaterupdated action.
 */
export const saveforlaterupdated = {
  name: 'saveforlaterupdated',
  // Action's description
  description: 'Description for saveforlaterupdated',
  author: 'Admin',
  // This action uses a Saga to invoke an endpoint.
  endpoints: ['saveforlaterupdated'],
  // The path to Json schema representing the request Json structure and the example of payload.
  input: '@oracle-cx-commerce/core-commerce-reference-store/src/plugins/actions/saveforlaterupdated/schema/input.json',
  packageId: '@oracle-cx-commerce/core-commerce-reference-store'
};
