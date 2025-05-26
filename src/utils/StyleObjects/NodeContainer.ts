export const nodeContainerStyle: Partial<CSSStyleDeclaration> = {
  boxSizing: "border-box",
  position: "relative",
  pointerEvents: "none",
  padding: "8px",

  height: "fit-content",
  width: "fit-content",

  border: "1px solid #e2e8f0",
  borderRadius: "8px",

  zIndex: "-1",
};

export const NodeContainerCSSText = `
position: fixed;
  padding: var(--spacing-sm);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  height: fit-content;
`;
