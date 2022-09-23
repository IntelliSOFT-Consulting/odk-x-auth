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
  Home,
} from "@carbon/icons-react";
import contentStyles from "carbon-components/scss/components/ui-shell/_content.scss";
import SystemAlert from "./SystemAlert";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { eraseCookie } from "../api/cookie";

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
const SelfService = ({ children, pageHeading, customClassName }) => {
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
            
            <HeaderName href="/" prefix="ODK-X Admin - Reset Password"></HeaderName>

            <HeaderGlobalBar>
              
              
              
              <HeaderGlobalAction
                aria-label="Home"
                onClick={() => {
                 navigate("/")
                }}
                tooltipAlignment="end"
              >
                <Home size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            
          </Header>

          <StoryContent
            content={children}
            pageHeading={pageHeading}
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

const StoryContent = ({ content, pageHeading, path }) => {
  return (
    <>
      <style type="text/css">{contentStyles.cssText}</style>
      <main className="bx--content bx-ce-demo-devenv--ui-shell-content">
        <div className="bx--grid">
          <div className="bx--row">
            <div className="cds--col-lg-3 cds--col-md-3"></div>
            <div className="cds--col-lg-11">
            
              <div style={{ "margin-top": "7%" }}>{content}</div>
            </div>
            <div className="cds--col-lg-5"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SelfService;
