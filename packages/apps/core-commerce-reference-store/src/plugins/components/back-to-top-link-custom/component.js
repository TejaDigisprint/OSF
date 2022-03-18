/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import ActionIcon from '@oracle-cx-commerce/react-components/action-icon';
import React, {useEffect, useState, useCallback} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import UpIcon from '@oracle-cx-commerce/react-components/icons/up';
import css from './styles.css';
import {t, objToClassName} from '@oracle-cx-commerce/utils/generic';




/**
 * A button to go to the top of the page
 *
 * @param props
 */
const BackToTopLink = props => {
  const {backToTopAltText} = props;

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(window.screenTop >= window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleClick = useCallback(() => window.scrollTo({top: 0, behavior: 'smooth'}), []);

  return (
    <Styled id="BackToTopLinkCustom" css={css}>
      <div className={objToClassName({BackToTopLink: true, 'BackToTopLink--hidden': isHidden})}>
        <ActionIcon>
          <button type="button" onClick={handleClick}>
          <i className='bi bi-caret-up-fill reactUpIcon'></i>
          </button>
        </ActionIcon>
      </div>
    </Styled>
  );
};


export default BackToTopLink;
