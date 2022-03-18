/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import ActionIcon from '@oracle-cx-commerce/react-components/action-icon';
import CloseIcon from '@oracle-cx-commerce/react-components/icons/close';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/product-listing/search-box/components/close-button/styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

/**
 * Component that closes the search popover.
 */
const CloseButton = props => {
  const {closeLinkAltText, toggleWindow} = props;

  return (
    <Styled id="CloseButton" css={css}>
      <div className="CloseButton">
        <ActionIcon>
          <div
            role="button"
            onClick={toggleWindow}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                toggleWindow();
              }
            }}
            aria-label={t(closeLinkAltText)}
            tabIndex="0"
          >
            <CloseIcon />
          </div>
        </ActionIcon>
      </div>
    </Styled>
  );
};

export default CloseButton;
