import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';

/*
 * Uncomment the following line to get the parameter substitution
 * function, e.g. t(someParameterizedResourceString, "someValue").
 */
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const newdemo = props => {
  return (
    // <Styled id="newdemo" css={css}>
     <hr style={{height:'2px',backgroundColor:'#d6d6d6'}}/>
    // </Styled>
  );
};

export default newdemo;
