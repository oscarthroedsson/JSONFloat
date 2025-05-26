import Image from "next/image";
import styles from "./page.module.css";

import BreakOutsList from "@/components/NodeContainer/BreakOuts/BreakOutList/BreakOutsList";
import BreakOutItem from "@/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem";
import PrimativeValue from "@/components/NodeContainer/PrimativeValue/primativeValue";

import { BreakOut } from "@/types/node.types";

import NCHeader from "@/components/NodeContainer/header/NCHeader";
import PrimativeValueList from "@/components/NodeContainer/PrimativeValueList/PrimativeValueList";

const i: BreakOut[] = [
  {
    key: "projects",
    type: "array",
    items: 8,
  },
  {
    key: "friends",
    type: "object",
    items: 2,
  },
  {
    key: "VisitToiletToday",
    type: "array",
    items: 8,
  },
  {
    key: "dieInCOD",
    type: "object",
    items: 12,
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

        <div>
          <NCHeader type={"object"} label={"label"} />
          <PrimativeValueList>
            <PrimativeValue key={0} keyName={"keyOne"} value={"string"} dataType={"boolean"} />
          </PrimativeValueList>
          <BreakOutsList>
            <BreakOutItem
              item={{
                key: "key",
                type: "array",
                items: 4,
              }}
            />
            <BreakOutItem
              item={{
                key: "key",
                type: "array",
                items: 4,
              }}
            />
          </BreakOutsList>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
