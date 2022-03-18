import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';

import Link from "@oracle-cx-commerce/react-components/link"

import css from './styles.css';

const customlogo = props => {
  let a = 10;
  return (
    <Styled id="customlogo" css={css}>
      <div className="customlogo">
      <Link href="/home">

<img src="/file/general/logopng.png" alt="" className='customlogo__Image' />



</Link>
      </div>
    </Styled>
  );
};

export default customlogo;
