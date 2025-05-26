import { ReactNode } from "react";
import style from "./style.module.css";
interface PrimativeValueList {
  children: ReactNode;
}
export default function PrimativeValueList({ ...props }: PrimativeValueList) {
  return <ul className={style.primativeValueList}>{props.children}</ul>;
}
