import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Region from '@oracle-cx-commerce/react-components/region';

/*
 * Uncomment the following line to get the parameter substitution
 * function, e.g. t(someParameterizedResourceString, "someValue").
 */
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const customfooter = props => {
  let regions = props.regions || []
  return (
    <Styled id="customfooter" css={css}>
      {regions.map((regionId, index) => {
                return <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
              })}
    </Styled>
  );
};

export default customfooter;
