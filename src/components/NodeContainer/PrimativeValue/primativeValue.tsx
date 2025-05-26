import style from "./style.module.css";

interface PrimativeValueProps {
  keyName: string;
  value: string | undefined;
  dataType: string | undefined;
}

export default function PrimativeValue({ ...props }: PrimativeValueProps) {
  return (
    <div className={style.primativeValueContainer}>
      <div className={style.keyPairValue}>
        <p className={style.keyValue}>{props.keyName}</p>
        <p>{props.dataType}</p>
      </div>

      <div className={style.footer}>
        <div className="tagVariationsContainer">
          {["string", "number", "null"].map((value, index) => {
            return <span key={index} className="tag tagline sm" data-datavalue={`${props.value}`} />;
          })}
        </div>

        <span className="tag tagline lg" data-datavalue={`${props.value}`} />
      </div>
    </div>
  );
}
