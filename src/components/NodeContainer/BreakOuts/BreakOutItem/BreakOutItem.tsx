import Icon from "@/components/Icons/Icon";
import { JSONFloatIconNames } from "@/constant/brandIcons";
import { BreakOut } from "@/types/node.types";
import style from "./style.module.css";

interface BreakOutItem {
  item: BreakOut;
}

export default function BreakOutItem({ item }: BreakOutItem) {
  if (!item?.type) return null;
  return (
    <div className={style.breakOutItem}>
      <div>
        <Icon name={JSONFloatIconNames[item.type]} />
        <p>{item.key}</p>
      </div>
      <div>
        <p>{item.items}</p>
      </div>
    </div>
  );
}
