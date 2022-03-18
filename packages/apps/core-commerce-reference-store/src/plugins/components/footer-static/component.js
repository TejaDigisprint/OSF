/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Link from '@oracle-cx-commerce/react-components/link';
import React,{useState} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
// import Slider from 'react-slick'

/**
 * Following Widget LinksList will render the links according to the widget component settings.
 *
 * @param props
 */

const LinksListStatic = props => {
  const {displayAndURL = '[]', linkBehavior = '_self', navigationOrientation = 'vertical'} = props;
  const [show,setShow] = useState('')

  const showMethod = (heading) =>{
    setShow(heading)
  }

  const hideMethod = () =>{
    setShow('')
  }
  const staticLinks = JSON.parse(displayAndURL.replace(/'/g, '"'));
  let appLinks = props.appLinks && props.appLinks.length && JSON.parse(props.appLinks.replace(/'/g, '"')) || []
  
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
      <div className='static_links_flex'>
      {staticLinks.map((staticlink,index)=>{
      return(<nav key={index} className="LinksList linkslistnav p-2">
        <div className='dropdown_links_list'>
        <h3  className='links_heading static_link_heading'>{staticlink.heading}</h3>
        {show == staticlink.heading?<i className='bi bi-chevron-up dropdown-list-class' onClick={hideMethod}></i>:<i className='bi bi-chevron-down dropdown-list-class' onClick={()=>{showMethod(staticlink.heading)}}></i>}
        </div>
        <ul className={`${navigationOrientation === 'horizontal' ? 'LinksList__HorizontalDisplay' : ''} links-list-ul ${show == staticlink.heading? '':'show-on-small-screen'}`}>
          {staticlink && staticlink.links && staticlink.links.map((item,i) => {
            return (<li key={i}>
              <CreateLink href={item['0']}>{props[item['1']] || item['1']}</CreateLink>
            </li>)
          })}
        </ul>
      </nav>)
      })}
      <nav className="LinksList linkslistnav">
        <div className='bg-white mb-2 p-2 lastLinkedlistcustom'>
        <div className='dropdown_links_list'>
        </div>
        <h3  className='links_heading static_link_heading'>Subscribe</h3>
        <ul className={`${navigationOrientation === 'horizontal' ? 'LinksList__HorizontalDisplay' : ''} links-list-ul`}>
        <>
        {appLinks.map((item,i)=>{
         return(<React.Fragment key={i}>
         {item && item['0'] && item['0'].includes('Newsletter')?
        <li key={i}>
          <div className='input-group mb-3'>
          <input type="text" className="form-control form-control-default" placeholder="Email Address" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className='btn btn-primary form-control-default joinBtn' type="button" id="button-addon2">Join</button>
        </div>
        </li>
      :
      <li key={item['0']}>
      <CreateLink href={item['1']}>{props[item['0']] || item['0']}</CreateLink>
    </li>
      }
        </React.Fragment>
        ) 
          })}
          </>
          </ul>
        <p className="links_site">
          <a href="/facebook" className='svg-icon link_color'><i className="bi bi-facebook"></i></a>
          <a href="/instagram" className='svg-icon link_color'><i className="bi bi-instagram"></i></a>
          <a href="/twitter" className='svg-icon link_color'><i className="bi bi-twitter"></i></a>
          <a href="/youtube" className='svg-icon link_color'><i className="bi bi-youtube"></i></a>
        </p>
        </div>
      </nav>
      </div>
    </Styled>
  );
};
export default LinksListStatic;
