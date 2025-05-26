export const primativeValueContainerStyle: Partial<CSSStyleDeclaration> = {
  display: "grid",
  height: "auto",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto",
  rowGap: "2px",
  padding: "8px 0px",
  backgroundColor: "#f1f5f9",
  borderRadius: "4px",
  color: "#3f3f46",
};

export const primativeValueItemStyle: Partial<CSSStyleDeclaration> = {
  paddingInline: "8px",
};

export const keyPairValueStyle: Partial<CSSStyleDeclaration> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  fontSize: "12px",
  fontWeight: "500",
};

export const keyValueStyle: Partial<CSSStyleDeclaration> = {
  color: "#db2777",
};

export const footerStyle: Partial<CSSStyleDeclaration> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const primativeValueContainerCSSText = `
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 4px;

  padding: 8px 0px;

  background-color: #f1f5f9;
  border-radius: 4px;
  color: #3f3f46;
`;
const primativeValueItemCSSText = `
padding-inline: 8px;
`;

const keyPairValueCSSText = `
 display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    font-size: 14px;
    font-weight: 500;
`;

const keyValue = `
  color: #db2777;
`;

const footerCSSText = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { primativeValueContainerCSSText, primativeValueItemCSSText, keyPairValueCSSText, keyValue, footerCSSText };
