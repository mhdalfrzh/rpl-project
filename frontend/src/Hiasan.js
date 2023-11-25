import React from "react";

const HiasanLogin = () => {
  return (
    <>
      <div className="buletMLogin"></div>
      <div className="buletKLogin"></div>
    </>
  );
};
const HiasanReg = () => {
  return (
    <>
      <div className="buletMReg"></div>
      <div className="buletKReg"></div>
    </>
  );
};

const HiasanHome2 = () => {
  return (
    <div className="hiasanHome2">
      <div className="hiasanLeft">
        <div className="lingkaranBig ling1">
          <div className="lingkaranSmol ling2"></div>
        </div>
        <div className="lingkaranLuar ling3"></div>
      </div>
      <div className="hiasanRight">
        <div className="lingkaranLuar ling3"></div>
        <div className="lingkaranBig ling1">
          <div className="lingkaranSmol ling2"></div>
        </div>
      </div>
    </div>
  );
};

export { HiasanLogin, HiasanReg, HiasanHome2 };
