import React from "react";
import pageLogo from "../images/combined.jpg"
const FooterSection = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <img src={pageLogo} alt = "Logo" height="30%" width="30%"/>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
