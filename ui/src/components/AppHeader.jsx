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
import { Notification, Search, Carbon, Fade } from "@carbon/icons-react";

const action = (someAction) => {};
const AppHeader = ({ children }) => (
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

          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
            <SideNavLink href="https://www.carbondesignsystem.com/">
              Dashboard
            </SideNavLink>
            <SideNavItems>
              <HeaderSideNavItems hasDivider={true}>
                <HeaderMenuItem href="#">Users</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
              <SideNavMenu title="Users">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Dashboard
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu title="Groups">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                title="Account Information"
                isActive={true}
              ></SideNavMenu>
            </SideNavItems>
          </SideNav>
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
      <div class="bx--row">
        <div class="bx--col">
          <div class="outside bx--aspect-ratio bx--aspect-ratio--1x1">
            <div class="inside">{content}</div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default AppHeader;
