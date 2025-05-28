import style from "./style.module.css";

interface PrimativeValueProps {
  keyName: string;
  value: string | undefined; // the item-data
  valueType: string | undefined; // primative values string | number etc...
  variations: string[];
}

export default function PrimativeValue({ ...props }: PrimativeValueProps) {
  return (
    <div className={style.primativeValueContainer}>
      <div className={style.keyPairValue}>
        <p className={style.keyValue}>{props.keyName}</p>
        <p>{props.value}</p>
      </div>

      <div className={style.footer}>
        <div className="tagVariationsContainer">
          {props.variations &&
            props.variations.map((value, index) => {
              return <span key={index} className="tag tagline sm" data-datavalue={`${value}`} />;
            })}
        </div>

        <span className="tag tagline lg" data-datavalue={`${props.valueType}`} />
      </div>
    </div>
  );
}
