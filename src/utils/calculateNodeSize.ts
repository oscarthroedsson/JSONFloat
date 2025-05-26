import { NODE_CONFIG } from "@/constant/NodeConfig";
import {
  breakOutContainerStyle,
  breakOutItemEndStyle,
  breakOutItemStartStyle,
  breakOutItemStyle,
} from "./StyleObjects/breakOutItem";
import { NCHeader, NCHeaderLabel, NCHeaderLabelIcon, NCHeaderSubText } from "./StyleObjects/header";
import { NodeContainerCSSText } from "./StyleObjects/NodeContainer";
import { keyPairValueStyle, primativeValueContainerStyle } from "./StyleObjects/primativeValue";

/**
 * @description Takes in the whole object as string and build a div as it would look like on the UI -> which get the real height and width
 * @param text is a string who is formatted and look like the object
 * @returns
 */

export function calculateNodeSizeFromText(
  node: {
    type: "object" | "array";
    label: string;
    values: string[];
    breakOuts: { keyname: string; type: "object" | "array" }[];
  }
  //   type: "object" | "array" | "primative" → icorporate when we got the basic down
): { width: number; height: number } {
  const items = node.values.length + node.breakOuts.length;
  const height = items * NODE_CONFIG.heightItem + NODE_CONFIG.heightHeader;

  return {
    width: 400,
    height: height + 8,
  };
}

export function buildObjectNode({
  type,
  values,
  breakOuts,
}: {
  type: "object" | "array";
  label: string;
  values: string[];
  breakOuts: { keyname: string; type: "object" | "array" }[];
}) {
  // Base Node
  const NODE = document.createElement("div");
  NODE.style.cssText = NodeContainerCSSText;

  // 🏗️ Build Header ------------------------------------------------------
  const header = document.createElement("div");
  Object.assign(header.style, NCHeader);

  const labelContainer = document.createElement("div");
  Object.assign(labelContainer.style, NCHeaderLabel);

  const icon = document.createElement("span");
  Object.assign(icon.style, NCHeaderLabelIcon);
  icon.innerText = "🧩"; // Just to get size

  const labelText = document.createElement("p");
  labelText.innerText = "Label"; // You can replace this with `label` if needed

  labelContainer.appendChild(icon);
  labelContainer.appendChild(labelText);

  const typeText = document.createElement("p");
  Object.assign(typeText.style, NCHeaderSubText);
  typeText.innerText = type;

  header.appendChild(labelContainer);
  header.appendChild(typeText);
  NODE.appendChild(header);

  // 🏗️ Build Values ------------------------------------------------------
  const valueContainer = document.createElement("div");
  Object.assign(valueContainer.style, primativeValueContainerStyle);

  values.forEach((v) => {
    const valueRow = document.createElement("div");
    Object.assign(valueRow.style, keyPairValueStyle);
    valueRow.innerText = v;
    valueContainer.appendChild(valueRow);
  });
  NODE.appendChild(valueContainer);

  // 🏗️ Build BreakOuts ------------------------------------------------------
  const breakOutContainer = document.createElement("div");
  Object.assign(breakOutContainer.style, breakOutContainerStyle);

  breakOuts.forEach((b) => {
    const row = document.createElement("div");
    Object.assign(row.style, breakOutItemStyle);

    const left = document.createElement("div");
    Object.assign(left.style, breakOutItemStartStyle);
    left.innerText = b.keyname;

    const right = document.createElement("div");
    Object.assign(right.style, breakOutItemEndStyle);
    right.innerText = `(${b.type})`;

    row.appendChild(left);
    row.appendChild(right);
    breakOutContainer.appendChild(row);
  });

  NODE.appendChild(breakOutContainer);

  return NODE;
}
