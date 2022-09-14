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
import { Notification, Search, Carbon } from "@carbon/icons-react";
import Footer from "../pages/Footer";

const action = (someAction) => {};
const LoginHeader = ({ children, pageHeading }) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header  aria-label="Carbon">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="/" prefix="ODK-X Admin"></HeaderName>

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
        <WebPageContent content={children} pageHeading={pageHeading} />
        <Footer className="site-footer" />
      </>
    )}
  />
);
const WebPageContent = ({ content, pageHeading }) => {
  // alert(content)
  return (
    <>
      <div className="bx--grid login-centered LoginFormComponent ">
        <div className="bx--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginHeader;
