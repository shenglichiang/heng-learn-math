import styles from "./index.less";
import { useRandomNumStore } from "../AnimalMatrix";
import { useInputNumStore } from "../Equation";
// 导入素材
import Hardy from "@/assets/hardy.jpg";
import { useEffect, useState } from "react";

const PopWindow = () => {
  const { randomRows, randomCols } = useRandomNumStore((state) => state);
  const { inputValue } = useInputNumStore((state) => state);
  const [isRight, setIsRight] = useState<boolean | null>(null);

  useEffect(() => {
    if (inputValue) {
      if (Number(inputValue) === randomRows * randomCols) {
        setIsRight(true);
      } else {
        setIsRight(false);
      }
    }
  }, [inputValue]);

  return (
    <div className={styles.popWrapper}>
      <div className={styles.popWindow}>
        <img src={Hardy} alt="Hardy" className={styles.hardy} />
        <p className={styles.popEquation}>
          {randomRows} X {randomCols} = {randomRows * randomCols}✅❌
        </p>
      </div>
    </div>
  );
};

export default PopWindow;
