import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenu,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink,
  Grid,
  Column,
} from "carbon-components-react";
import { Notification, Search, Carbon,Power,Copy,Folder } from "@carbon/icons-react";
import contentStyles from 'carbon-components/scss/components/ui-shell/_content.scss';

const action = (someAction) => {};
const AppHeader = ({ children, pageHeading, customClassName }) => (
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
          <HeaderName href="/" prefix="ODK-X Admin"></HeaderName>

          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action("search click")}
            >
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Copy"
              onClick={action("notification click")}
            >
              <Folder size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Power"
              onClick={action("power-off click")}
              tooltipAlignment="end"
            >
              <Power size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
            <SideNavLink href="/dashboard">
              Dashboard
            </SideNavLink>
            <SideNavItems>
              <HeaderSideNavItems hasDivider={true}>
                <HeaderMenuItem href="/users">Users</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
              <SideNavMenu title="Users">
                <SideNavMenuItem href="/users">
                  Users List
                </SideNavMenuItem>
                <SideNavMenuItem href="/new-user">
                  Create New User
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu title="Groups">
                <SideNavMenuItem href="/groups">
                  Groups
                </SideNavMenuItem>
                <SideNavMenuItem href="/new-group">
                  Create New Group
                </SideNavMenuItem>
                <SideNavMenuItem href="/assign-user-to-group">
                  Assign User to Group
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                title="Account Information"
                isActive={true}
                
              >
                <SideNavMenuItem href="/account-information">
                  My Account
                </SideNavMenuItem>
                <SideNavMenuItem href="/reset-password">
                  Reset Password
                </SideNavMenuItem>
              </SideNavMenu>
            </SideNavItems>
          </SideNav>
        </Header>

        <StoryContent content={children} pageHeading={pageHeading} customClassName={customClassName} className={customClassName || "LoggedInContent" }/>
      </>
    )}
  />
);
const WebPageContent = ({ content, pageHeading,customClassName }) => {
  // alert(content)
  return (
    <>
      <div className={customClassName || "LoggedInContent"}>
        <div classname="bx--grid">
          <div className="bx--row">
          <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <h1>
              {pageHeading || "ODK-X Admin"}
            </h1>
            </div>
       
              {content}
            </div>
          </div>
        </div>
    </>
  );
};
const StoryContent = ({ content, pageHeading,customClassName }) =>{
  return (
    <>
    <style type="text/css">{contentStyles.cssText}</style>
    <main className="bx--content bx-ce-demo-devenv--ui-shell-content">
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--offset-lg-3 bx--col-lg-13">
          <h2>{pageHeading}</h2>
            {content}
          </div>
        </div>
      </div>
    </main>
    </>
  )

}
export default AppHeader;

