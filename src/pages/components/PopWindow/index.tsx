import styles from "./index.less";
import { create } from "zustand";
import { useRandomNumStore } from "../AnimalMatrix";
import { useInputNumStore, useRightCountStore } from "../Equation";

// 导入素材
import Hardy from "@/assets/hardy.jpg";
import { useEffect, useState } from "react";

// pop窗口是否打开状态
interface PopWindowStore {
  isPopWindowOpen: boolean;
  setIsPopWindowOpen: (isPopWindowOpen: boolean) => void;
}

export const usePopWindowStore = create<PopWindowStore>((set) => ({
  isPopWindowOpen: false,
  setIsPopWindowOpen: (isPopWindowOpen: boolean) =>
    set(() => ({ isPopWindowOpen })),
}));

// lottery 窗口是否打开
interface LotteryPopWindowStore {
  isLotteryPopWindowOpen: boolean;
  setIsLotteryPopWindowOpen: (isLotteryPopWindowOpen: boolean) => void;
}
export const useLotteryPopWindowStore = create<LotteryPopWindowStore>(
  (set) => ({
    isLotteryPopWindowOpen: false,
    setIsLotteryPopWindowOpen: (isLotteryPopWindowOpen: boolean) =>
      set(() => ({ isLotteryPopWindowOpen })),
  }),
);
const PopWindow = () => {
  const { randomRows, randomCols, generateRandomNums } = useRandomNumStore(
    (state) => state,
  );
  const { inputValue, setInputValue, clearInputValue } = useInputNumStore(
    (state) => state,
  );
  const [isRight, setIsRight] = useState<boolean | undefined>(undefined);
  const { isPopWindowOpen, setIsPopWindowOpen } = usePopWindowStore();
  const { rightCount } = useRightCountStore();
  const { setIsLotteryPopWindowOpen } = useLotteryPopWindowStore();

  const correctResult = randomRows * randomCols;

  // console.log(inputValue, "inputValue___");

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

    if (rightCount >= 10) {
      setIsLotteryPopWindowOpen(true);
    } else {
      generateRandomNums(); // 重新生成随机数
    }
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
          <button
            onClick={handleOK}
            style={{ width: rightCount >= 10 ? "30vw" : "12vw" }}
          >
            {rightCount >= 10 ? "已答对10题➡️" : "好的"}
          </button>
        </div>
      </div>
    )
  );
};

export default PopWindow;
