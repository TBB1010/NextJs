"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function Facebook() {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      Facebook Le Cong To
      <div>
        <Button
          variant="primary"
          onClick={() => {
            router.push("/");
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
