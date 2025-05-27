import { HTMLAttributes, ReactElement } from "react";
import style from "./style.module.css";
interface SidePanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
}

export default function SidePanel({ ...props }: SidePanelProps) {
  return (
    <div className={`${props.className} ${style.sidePanel}`}>
      <header className={style.head}>hej</header>
      <div className={style.body}>{props.children}</div>
      <footer className={style.foot}>
        <p>footer</p>
      </footer>
    </div>
  );
}
