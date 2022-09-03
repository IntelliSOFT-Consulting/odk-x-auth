import React from 'react';
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
  SideNavLink
} from 'carbon-components-react';
import {
    Notification,Search,Carbon,Fade
  } from '@carbon/icons-react';

  const action =(someAction)=>{

  }
  const AppHeader = () => (
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
        <HeaderName href="#" prefix="ODK-X">
        </HeaderName>
        <HeaderNavigation aria-label="Admin">
          <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
          <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
          <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
          <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
            <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
            <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
            <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Search"
            onClick={action('search click')}>
            <Search size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Notifications"
            onClick={action('notification click')}>
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="App Switcher"
            onClick={action('app-switcher click')}
            tooltipAlignment="end">
            <Carbon size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
          <SideNavItems>
            <HeaderSideNavItems hasDivider={true}>
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
              <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderSideNavItems>
            <SideNavMenu renderIcon={Fade} title="Category title">
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
            <SideNavMenu renderIcon={Fade} title="Category title">
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
              renderIcon={Fade}
              title="Category title"
              isActive={true}>
              <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                Link
              </SideNavMenuItem>
              <SideNavMenuItem
                aria-current="page"
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                Link
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavLink
              renderIcon={Fade}
              href="https://www.carbondesignsystem.com/">
              Link
            </SideNavLink>
            <SideNavLink
              renderIcon={Fade}
             href="https://www.carbondesignsystem.com/">
             Link
           </SideNavLink>
         </SideNavItems>
       </SideNav>
     </Header>
     
   </>
 )}
/>
  );
  
  export default AppHeader;