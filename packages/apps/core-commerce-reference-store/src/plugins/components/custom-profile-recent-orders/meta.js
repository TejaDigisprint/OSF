/*
 ** Copyright (c) 2019 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/profile/profile-recent-orders/config';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'headingRecentOrder',
  'messageNoOrderAssociated',
  'textAddtionSymbol',
  'labelStatus',
  'labelOrderDate',
  'labelTotalCost',
  'labelOrderNumber',
  'actionViewAllOrders',
  'messageAgentRecjected',
  'messageApproved',
  'messageBeingAmended',
  'messageFailed',
  'messageNoPendingAction',
  'messageRemoved',
  'messagePendingRemove',
  'messageProcessing',
  'messageSubmitted',
  'messageSuspended',
  'messageRejectedQuote',
  'messagePendingQuote',
  'messageQueued',
  'messagePendingPayment',
  'messageRejected',
  'messageQuoteRequestFailed',
  'messageFailedApproval',
  'messageQuoted',
  'messageApprovedTemplate',
  'messagePendingMerchantAction',
  'messagePendingCustomerReturn',
  'messagePendingCustomerAction',
  'messagePendingApproval',
  'messagePendingAgentApproval',
  'messageIncomplete'
];

export const CustomProfileRecentOrders = {
  packageId: '@oracle-cx-commerce/react-widgets',
  config: mergeDefaultConfig(config),
  resources: buildResources(resourceBundle, widgetResourceKeys)
};
