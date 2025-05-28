import style from "./style.module.css";

interface PrimativeValueProps {
  keyName: string;
  value: string | undefined;
  valueType: string | undefined;
  variations: string[];
}

export default function PrimativeValue({ ...props }: PrimativeValueProps) {
  return (
    <div className={style.primativeValueContainer}>
      <div className={style.keyPairValue}>
        <p className={style.keyValue}>{props.keyName}</p>
        <p>{props.valueType}</p>
      </div>

      <div className={style.footer}>
        <div className="tagVariationsContainer">
          {props.variations &&
            props.variations.map((value, index) => {
              return <span key={index} className="tag tagline sm" data-datavalue={`${value}`} />;
            })}
        </div>

        <span className="tag tagline lg" data-datavalue={`${props.value}`} />
      </div>
    </div>
  );
}
