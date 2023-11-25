import { LogoBottom } from "../Logo";

const Footer = ({ margin }) => {
  return (
    <>
      <div className="footer" style={{ marginTop: margin }}>
        <div className="buletKFooter"></div>
        <div className="homeBottom">
          <LogoBottom />
        </div>
      </div>
    </>
  );
};

export default Footer;
