import { Node, NodeProps } from "reaflow";

import PrimativeValue from "../NodeContainer/PrimativeValue/primativeValue";
import BreakOutsList from "../NodeContainer/BreakOuts/BreakOutList/BreakOutsList";
import BreakOutItem from "../NodeContainer/BreakOuts/BreakOutItem/BreakOutItem";
import { Fragment } from "react";
import NCHeader from "../NodeContainer/header/NCHeader";
import PrimativeValueList from "../NodeContainer/PrimativeValueList/PrimativeValueList";
import style from "@/components/NodeContainer/style.module.css";
import { ParsedNode } from "@/types/node.types";

export function BaseNode(props: NodeProps) {
  const data = props.properties?.data as ParsedNode;

  return (
    <Node
      {...props}
      style={{
        opacity: 0,
      }}
      width={props.width}
      height={props.height}
    >
      <foreignObject width={props.width + 20} height={props.height}>
        <div
          className={style.nodeContainer}
          style={{
            width: `${props.width}px`,
            height: "100%",

            backgroundColor: "white",
          }}
        >
          <NCHeader type={data.type as "array" | "object"} label={data.label} />
          <PrimativeValueList>
            {data.data?.map((item, index) => (
              <PrimativeValue
                key={index}
                keyName={item.key}
                value={item.value}
                valueType={item.valueType}
                variations={data.variations[item.key]}
              />
            ))}
          </PrimativeValueList>
          <BreakOutsList>
            {data.breakouts?.map((item, index) => (
              <Fragment key={index}>
                <BreakOutItem item={item} />
              </Fragment>
            ))}
          </BreakOutsList>
        </div>
      </foreignObject>
    </Node>
  );
}
