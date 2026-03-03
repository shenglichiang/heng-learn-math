import styles from "./index.less";
import { useRandomNumStore } from "../AnimalMatrix";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { usePopWindowStore } from "../PopWindow";
import { useGameSettingsStore } from "../PreSettingsPop";
interface InputNumState {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  clearInputValue: () => void;
}
export const useInputNumStore = create<InputNumState>((set) => ({
  inputValue: "",

  setInputValue: (inputValue: string) => set({ inputValue }),

  clearInputValue: () => set({ inputValue: "" }),
}));

// 正确的数量
interface RightCountState {
  rightCount: number;
  setRightCount: (rightCount: number) => void;
  incrementRightCount: () => void;
}
export const useRightCountStore = create<RightCountState>((set, get) => ({
  rightCount: 0,
  setRightCount: (rightCount: number) => set(() => ({ rightCount })),
  incrementRightCount: () => {
    const current = get().rightCount;
    const newCount = current + 1;
    set(() => ({ rightCount: newCount }));
    return newCount;
  },
}));

// 是否正在提交
interface IsSubmittingState {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}
export const useIsSubmittingStore = create<IsSubmittingState>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
}));

// 主逻辑和主渲染
const Equation = () => {
  const { randomRows, randomCols } = useRandomNumStore((state) => state);
  const [inputNum, setInputNum] = useState<string | null>(null);
  const { inputValue, setInputValue, clearInputValue } = useInputNumStore(
    (state) => state,
  );
  const { isPopWindowOpen, setIsPopWindowOpen } = usePopWindowStore();
  const { rightCount, incrementRightCount } = useRightCountStore();

  const answerInputRef = useRef<HTMLInputElement>(null);

  const { maxMultiplier, totalLevels, setMaxMultiplier, setTotalLevels } =
    useGameSettingsStore((state) => state);

  const { isSubmitting, setIsSubmitting } = useIsSubmittingStore();

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!inputValue) {
      alert("请输入答案...");
      return;
    }
    setIsPopWindowOpen(true);

    if (Number(inputValue) === randomRows * randomCols) {
      const currentRightCount = incrementRightCount();
      let rightCount = currentRightCount;
    }
  };

  const progressWidth = Math.min(rightCount / totalLevels, 1);
  // console.log(progressWidth);

  // 按下空格自动聚焦输入框
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        answerInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.equationContainer}>
      <div className={styles.equation}>
        <div className={styles.countContainer}>
          <div className={styles.multiNum}>{randomRows}</div>
          <p className={styles.label}>列:动物个数</p>
        </div>

        <div className={styles.bigCharacter}>×</div>

        <div className={styles.countContainer}>
          <div className={styles.multiNum}>{randomCols}</div>
          <p className={styles.label}>行:动物种数</p>
        </div>

        <div className={styles.bigCharacter}>=</div>

        <div className={styles.countContainer}>
          <div className={styles.multiNum}>
            {/* <label htmlFor="answerNum"></label> */}
            <input
              ref={answerInputRef}
              id="answerNum"
              type="number"
              placeholder="(    )"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                // 回车触发提交
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
          <p className={styles.label}>所有动物总数</p>
        </div>
      </div>
      <button onClick={handleSubmit}>确 定</button>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progressWidth * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Equation;
