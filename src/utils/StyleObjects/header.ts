const NCHeader: Partial<CSSStyleDeclaration> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0px",
};

const NCHeaderLabel: Partial<CSSStyleDeclaration> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  gap: "4px",
  fontWeight: "600",
  color: "#3f3f46",
};

const NCHeaderLabelIcon: Partial<CSSStyleDeclaration> = {
  width: "16px",
};

const NCHeaderSubText: Partial<CSSStyleDeclaration> = {
  fontSize: "10px",
  fontWeight: "200",
};

const NCheaderCSSText = `
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 0px;
  `;

const NCHeaderLabelCSSText = `
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 4px;

    font-weight: 600;
    color: #3f3f46;
`;

const NCHeaderLabelIconCSSText = `
  width: 16px;
`;

const NCHeaderSubTextCSSText = `
font-size: 12px;
font-weight: 200;
`;

export {
  NCHeader,
  NCHeaderLabel,
  NCHeaderLabelIcon,
  NCHeaderSubText,
  NCheaderCSSText,
  NCHeaderLabelCSSText,
  NCHeaderLabelIconCSSText,
  NCHeaderSubTextCSSText,
};
