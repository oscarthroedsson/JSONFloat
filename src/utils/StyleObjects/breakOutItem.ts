export const breakOutContainerStyle: Partial<CSSStyleDeclaration> = {
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

export const breakOutItemStyle: Partial<CSSStyleDeclaration> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#0f172a", // var(--color-text)
  padding: "0px 8px", // var(--spacing-sm)
  fontSize: "16px", // var(--text-size-md)
  fontWeight: "500",
  marginBottom: "8px",
};

export const breakOutItemStartStyle: Partial<CSSStyleDeclaration> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  gap: "4px", // var(--spacing-xs)
};

export const breakOutItemStartIconStyle: Partial<CSSStyleDeclaration> = {
  width: "14px",
};

export const breakOutItemEndStyle: Partial<CSSStyleDeclaration> = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};
