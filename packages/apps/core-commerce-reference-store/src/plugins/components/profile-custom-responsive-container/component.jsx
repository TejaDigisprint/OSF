/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState} from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Renders region ids defined in container and automatically controls
 * mobile and desktop view based on view port.
 *
 * @param {*} props
 */
const ProfileCustomResponsiveContainer = props => {
  const { regions = []} = props;
  const tabLabels = ['Account Details', 'Address Book', 'Email & Marketing Preferences', 'Saved Credit Cards']
  return (
    <Styled id="ResponsiveContainer" css={css}>
      {/* render each child region */}
      <div className="tabs">
        <Tabs>
          {tabLabels.map((label, index) => {
            return (
              <Tab label={label}>
                <div>
                  <section className="ResponsiveContainer__Section">
                    <Region key={index} regionId={regions[index]} />
                  </section>
                </div>
              </Tab>
            )
          })}
        </Tabs>
      </div>
    </Styled >
  );
};

const Tabs = props => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label)

  const changeTab = (tab) => {
    setActiveTab(tab)
  }
  let content;
  let buttons = [];

  return (
    <div>
      {React.Children.map(props.children, child => {
        buttons.push(child.props.label)
        if (child.props.label === activeTab) content = child.props.children
      })}
      <TabButtons activeTab={activeTab} buttons={buttons} changeTab={changeTab} />
      <div className="tab-content">{content}</div>
    </div>
  );
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map(button => {
        return <button className={button === activeTab ? 'buttonCss active' : 'buttonCss'} onClick={() => changeTab(button)}>{button}</button>
      })}
    </div>
  )
}

const Tab = props => {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default ProfileCustomResponsiveContainer;
