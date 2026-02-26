import styles from "./index.less";
import { create } from "zustand";
import { useRandomNumStore } from "../AnimalMatrix";
import { useInputNumStore } from "../Equation";

// 导入素材
import Hardy from "@/assets/hardy.jpg";
import { useEffect, useState } from "react";

interface PopWindowStore {
  isPopWindowOpen: boolean;
  setIsPopWindowOpen: (isPopWindowOpen: boolean) => void;
}

export const usePopWindowStore = create<PopWindowStore>((set) => ({
  isPopWindowOpen: false,
  setIsPopWindowOpen: (isPopWindowOpen: boolean) =>
    set(() => ({ isPopWindowOpen })),
}));
const PopWindow = () => {
  const { randomRows, randomCols, generateRandomNums } = useRandomNumStore(
    (state) => state,
  );
  const { inputValue, setInputValue, clearInputValue } = useInputNumStore(
    (state) => state,
  );
  const [isRight, setIsRight] = useState<boolean | undefined>(undefined);
  const { isPopWindowOpen, setIsPopWindowOpen } = usePopWindowStore();

  const correctResult = randomRows * randomCols;

  console.log(inputValue);

  useEffect(() => {
    if (!inputValue || inputValue.trim() === "") {
      setIsRight(undefined);
      return;
    }

    const inputNum = Number(inputValue);
    if (isNaN(inputNum)) {
      setIsRight(false);
      return;
    }

    setIsRight(inputNum === correctResult);
  }, [inputValue, randomRows, randomCols]);

  const displayInputValue = inputValue?.trim() || "?";

  const handleOK = () => {
    setIsPopWindowOpen(false);
    setIsRight(undefined);
    clearInputValue();
    generateRandomNums(); // 重新生成随机数
  };
  return (
    isPopWindowOpen && (
      <div className={styles.popWrapper}>
        <div className={styles.popWindow}>
          <img src={Hardy} alt="Hardy" className={styles.hardy} />

          <p className={styles.popEquation}>
            {randomRows} X {randomCols} = {displayInputValue}{" "}
            {isRight === true && "✅"}
            {isRight === false && "❌"}
          </p>
          {!isRight && (
            <p className={styles.rightPopEquation}>
              {randomRows} X {randomCols} = {randomRows * randomCols}
            </p>
          )}
          <button onClick={handleOK}>好的</button>
        </div>
      </div>
    )
  );
};

export default PopWindow;
