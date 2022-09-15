import React, { useEffect } from "react";
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
} from "carbon-components-react";
import {
  Search,
  Power,
  DocumentImport,
  DocumentExport,
} from "@carbon/icons-react";
import contentStyles from "carbon-components/scss/components/ui-shell/_content.scss";
import SystemAlert from "./SystemAlert";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../pages/Footer";
import { eraseCookie, setCookie } from "../api/cookie";
import { Breadcrumb, BreadcrumbItem } from "@carbon/react";

const action = (someAction) => {
  switch (someAction) {
    case "signout":
      console.log("Will show signout modal");
      const danger = true;
      const modalHeading = "Are you Sure to Sign Out?";
      const modalLabel = "";
      const primaryButtonText = "No";
      const secondaryButtonText = "Yes";
      const content =
        "This action will sign you out. Select Yes if you are sure.";
      let options = {
        danger,
        modalHeading,
        modalLabel,
        secondaryButtonText,
        primaryButtonText,
        content,
      };
      <SystemAlert options={options} />;
      // return options;
      break;
    default:
      console.log("No action");
  }
};
const signOutModalOptions = () => {
  const danger = true;
  const modalHeading = "Are you Sure to Sign Out?";
  const modalLabel = "";
  const primaryButtonText = "Yes, Sign me out.";
  const secondaryButtonText = "No";
  const content = "This action will sign you out. Select Yes if you are sure.";
  const someFun = () => {
    alert("I am pied piper...");
  };
  return {
    danger,
    modalHeading,
    modalLabel,
    secondaryButtonText,
    primaryButtonText,
    content,
    someFun,
  };
};
const AppHeader = ({ children, pageHeading, customClassName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("/");
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, []);

  const navigate = useNavigate();
  const defaultModaloptions = signOutModalOptions();

  const onRequestClose = () => {
    setIsOpen(false);
  };
  const onRequestSubmit = () => {
    setIsOpen(false);
    eraseCookie("token");
    navigate("/");
  };

  return (
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
                onClick={() => {
                  action("search click");
                }}
              >
                <Search size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Import Data"
                onClick={() => {
                  action("notification click");
                }}
              >
                <DocumentImport size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Export Data"
                onClick={() => {
                  action("notification click");
                }}
              >
                <DocumentExport size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Log Out"
                onClick={() => {
                  console.log(isOpen);
                  setIsOpen(!isOpen);
                }}
                tooltipAlignment="end"
              >
                <Power size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
              <SideNavLink href="/dashboard" isActive={pageHeading.includes("Dashboard")}>Dashboard</SideNavLink>
              <SideNavItems>
                <SideNavMenu title="Users" isActive={pageHeading.includes("Users")}>
                  <SideNavMenuItem href="/users">Users List</SideNavMenuItem>
                  <SideNavMenuItem href="/new-user">
                    Create New User
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu title="Groups">
                  <SideNavMenuItem href="/groups" isActive={pageHeading.includes("Groups")}>Groups</SideNavMenuItem>
                  <SideNavMenuItem href="/new-group">
                    Create New Group
                  </SideNavMenuItem>
                  <SideNavMenuItem href="/assign-user-to-group">
                    Assign User to Group
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu title="Account Information" isActive={pageHeading.includes("Account Information")}>
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

          <StoryContent
            content={children}
            pageHeading={pageHeading}
            customClassName={customClassName}
            path={path}
          />
          {isOpen === true && (
            <SystemAlert
              options={{
                ...defaultModaloptions,
                onRequestClose,
                onRequestSubmit,
              }}
            />
          )}
        </>
      )}
    />
  );
};

const StoryContent = ({ content, pageHeading, customClassName, path }) => {
  return (
    <>
      <style type="text/css">{contentStyles.cssText}</style>
      <main className="bx--content bx-ce-demo-devenv--ui-shell-content">
        <div className="bx--grid">
          <div className="bx--row">
            <div class="cds--col-lg-4"></div>
            <div class="cds--col-lg-12">
              <Breadcrumb>
                <BreadcrumbItem isCurrentPage href={path}>{`${path.replace("/","").toProperCase()}`}</BreadcrumbItem>
              </Breadcrumb>
              <h2>{pageHeading}</h2>
              <div style={{ "margin-top": "7%" }}>{content}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
export default AppHeader;
