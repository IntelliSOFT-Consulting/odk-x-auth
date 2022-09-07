import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  
} from "carbon-components-react";
import { Notification, Search, Carbon, Fade } from "@carbon/icons-react";

const action = (someAction) => {};
const LoginHeader = ({ children }) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="Carbon">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="ODK-X Admin"></HeaderName>

          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action("search click")}
            >
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action("notification click")}
            >
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action("app-switcher click")}
              tooltipAlignment="end"
            >
              <Carbon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        <WebPageContent content={children} />
      </>
    )}
  />
);
const WebPageContent = ({ content }) => {
  // alert(content)
  return (
    <div className="bx--grid PageContent">
      <div className="bx--row">
        <div className="bx--col">
          <div className="outside bx--aspect-ratio bx--aspect-ratio--1x1">
            <div className="inside">{content}</div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default LoginHeader;
