import styles from "./index.less";
import { create } from "zustand";
import { useRandomNumStore } from "../AnimalMatrix";
import {
  useInputNumStore,
  useRightCountStore,
  useIsSubmittingStore,
} from "../Equation";
import { useGameSettingsStore } from "../PreSettingsPop";

// 导入素材
import Hardy from "@/assets/hardy.jpg";
import { useEffect, useState } from "react";
import clsx from "clsx";

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
  const [isMobile, setIsMobile] = useState(false);

  const { totalLevels } = useGameSettingsStore();
  const { setIsSubmitting } = useIsSubmittingStore();
  // 监听屏幕宽度
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getOkBtnClassName = () => {
    if (isMobile) {
      return ` ${rightCount >= totalLevels ? styles["okBtnMobileLarge"] : styles["okBtnMobileSmall"]}`;
    } else {
      return ` ${rightCount >= totalLevels ? styles["okBtnLarge"] : styles["okBtnSmall"]}`;
    }
  };

  // console.log(getOkBtnClassName(), ">>>>>>>>>>");
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
    setIsSubmitting(false);

    if (rightCount >= totalLevels) {
      setIsLotteryPopWindowOpen(true);
    } else {
      generateRandomNums(); // 重新生成随机数
    }
  };
  return (
    isPopWindowOpen && (
      <div className={styles.popWrapper}>
        <div className={clsx(styles.popWindow, styles.show)}>
          <img src={Hardy} alt="Hardy" className={styles.hardy} />

          <p className={styles.popEquation}>
            {randomRows} X {randomCols} = {displayInputValue}{" "}
            {isRight === true && "✅"}
            {isRight === false && "❌"}
          </p>
          {!isRight && (
            <p className={styles.rightPopEquation}>
              {randomRows} X {randomCols} = {randomRows * randomCols} ✅
            </p>
          )}
          <button
            onClick={handleOK}
            className={clsx(styles.okBtn, getOkBtnClassName())}
          >
            {rightCount >= totalLevels ? `已答对${totalLevels}题➡️` : "好  的"}
          </button>
        </div>
      </div>
    )
  );
};

export default PopWindow;
