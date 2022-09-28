import React from "react";
import { A, Box, Email, Item, Image, Span } from "react-html-email";
import pageLogo from "../images/combined.jpg";
import FooterSection from "./FooterSection";
const emailHeadCSS = `
  body {
    background-color: #F5F8FA;
  }
`.trim();

const backgroundStyle = {
  WebkitBoxShadow: "6px 6px 40px 3px rgba(140, 152, 164, 0.2)",
  backgroundColor: "#FFF",
  borderRadius: 7,
  boxShadow: "6px 6px 40px 3px rgba(140, 152, 164, 0.2)",
  margin: "10px",
  width: "100%",
  padding: "0 32px",
};

const containerStyle = {
  backgroundColor: "#F5F8FA",
  width: "100%",
};

const linkStyle = {
  color: "white",
  display: "block",
  paddingBottom: "13px",
  paddingTop: "13px",
  textDecoration: "none",
  width: "100%",
};
// 565555
// "rgb(59, 139, 128)",
const fluidItemStyle = {
  backgroundColor: "#565555",
  borderRadius: 4,
  cursor: "pointer",
  height: 48,
  textAlign: "center",
  textDecoration: "none",
};
const ResetPasswordEmailTemplate = ({
  userName,
  fullName,
  subject,
  confirmationUrl,
}) => {
  return (
    <>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-16 cds--col-md-8 cds--col-sm-4">
            <Box align="center" style={containerStyle}>
              <Email align="center" headCSS={emailHeadCSS} title={subject}>
                <Item style={{ height: 45 }} />
                <Item
                  align="center"
                  style={{ fontSize: 26, fontWeight: "bold" }}
                >
                  ODK-X Auth
                </Item>
                <Item style={{ height: 30 }} />
                <Item align="center">
                  <Box style={backgroundStyle}>
                    <div style={{ margin: "2%" }}>
                      <Item style={{ height: 40 }} />
                      <Item>
                        <Span fontSize={22} fontWeight="bold">
                          Hi, {fullName} &nbsp;
                        </Span>
                      </Item>
                      <Item style={{ height: 25 }} />

                      <Item style={{ height: 25 }} />
                      <Item>
                        Please click on the button below to reset your password for account <b style={{"color": 'green'}}>{userName}</b>.
                        If this was not you, please ignore this email.
                      </Item>
                      <Item>NB: This link will expires in 1 hour</Item>
                      <Item style={{ height: 50 }} />
                      <Item className="button" style={fluidItemStyle}>
                        <A href={confirmationUrl} style={linkStyle}>
                          Reset Password
                        </A>
                      </Item>
                      <Item style={{ height: 35 }} />
                    </div>
                  </Box>
                </Item>
              </Email>
            </Box>
            <Box
              align="right"
              style={{ ...containerStyle, backgroundColor: "white" }}
            >
              <Item align="center">
                <Image
                  height="auto"
                  src={pageLogo}
                  style={{ margin: "0 auto " }}
                  width={300}
                />
              </Item>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

const EmailFooter = () => {
  return <h3>Intellisoft Limited</h3>;
};
export default ResetPasswordEmailTemplate;
