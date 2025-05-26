import { ReactNode } from "react";
import style from "./style.module.css";
interface BreakOutsListProps {
  children: ReactNode;
}

export default function BreakOutsList({ children }: BreakOutsListProps) {
  return <ul className={style.breakOutList}>{children}</ul>;
}
