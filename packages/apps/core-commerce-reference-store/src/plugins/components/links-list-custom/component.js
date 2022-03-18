/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Following Widget LinksList will render the links according to the widget component settings.
 *
 * @param props
 */

const LinksListcustom = props => {
  const {displayAndURL = '[]', linkBehavior = '_self', navigationOrientation = 'horizontal'} = props;
  // const links = JSON.parse(displayAndURL.replace(/'/g, '"'));
  const links = [
    {
      '0':'/workinginprogress',
      '1':'Privacy Notice'
    },
    {
      '0':'/workinginprogress',
      '1':'CA Privacy Rights'
    },
    {
      '0':'/workinginprogress',
      '1':'Legal Notice'
    },
    {
      '0':'/workinginprogress',
      '1':'Customer Bill Of Rights'
    },{
      '0':'/workinginprogress',
      '1':'Site Map'
    }
    
  ]

  const CreateLink = props => {
    const {href, children} = props;
    let linkProps;

    if (href) {
      linkProps = {...linkProps, href, title: children};
    }

    if (linkBehavior === '_self') {
      return <Link className={"link_color"} {...linkProps}>{children}</Link>;
    }
    linkProps = {...linkProps, target: linkBehavior};

    return <a {...linkProps}>{children}</a>;
  };

  return (
    <Styled id="LinksList" css={css}>
      <div style={{backgroundColor:'#f0f2f4',padding:'5px'}}>
      <nav className='LinksList_custom' style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'5px'}}>
        <ul className={`${navigationOrientation === 'horizontal' ? 'LinksList__HorizontalDisplay' : ''} links_list_ul_custom`} id="links_list_custom_id">
          {links.map(item => (
            <li key={item['0']}>
              <CreateLink href={item['0']}>{props[item['1']] || item['1']}</CreateLink>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </Styled>
  );
};

export default LinksListcustom;
