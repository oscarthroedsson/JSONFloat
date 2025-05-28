import { JSONFloatIconNames } from "@/constant/brandIcons";
import style from "./style.module.css";
import Icon from "@/components/Icons/Icon";

interface NCHeaderProps {
  type: "object" | "array";
  label: string;
}

export default function NCHeader({ ...props }: NCHeaderProps) {
  console.log("🐲 [NCHeader] props.type: ", props.type);
  return (
    <header className={style.header}>
      <div className={style.label}>
        <Icon name={JSONFloatIconNames[props.type]} />
        <p>{props.label}</p>
      </div>
      <p>{props.type}</p>
    </header>
  );
}
