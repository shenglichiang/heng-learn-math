import styles from "./index.less";
import { useRandomNumStore } from "../AnimalMatrix";
import { useState } from "react";
import { create } from "zustand";
import { usePopWindowStore } from "../PopWindow";
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
const Equation = () => {
  const { randomRows, randomCols } = useRandomNumStore((state) => state);
  const [inputNum, setInputNum] = useState<string | null>(null);
  const { inputValue, setInputValue, clearInputValue } = useInputNumStore(
    (state) => state,
  );
  const { isPopWindowOpen, setIsPopWindowOpen } = usePopWindowStore();
  const { rightCount, incrementRightCount } = useRightCountStore();
  // 触发提交
  const handleSubmit = () => {
    if (!inputValue) {
      alert("请输入答案...");
      return;
    }
    setIsPopWindowOpen(true);

    if (Number(inputValue) === randomRows * randomCols) {
      const currentRightCount = incrementRightCount();
      let rightCount = currentRightCount;
      // console.log(rightCount, "rightCount____");
    }
  };

  const progressWidth = Math.min(rightCount / 10, 1);
  // console.log(progressWidth);

  return (
    <div className={styles.equationContainer}>
      <div className={styles.equation}>
        <div className={styles.countContainer}>
          <div className={styles.multiNum}>{randomRows}</div>
          <p className={styles.label}>每列动物个数</p>
        </div>

        <div className={styles.bigCharacter}>×</div>

        <div className={styles.countContainer}>
          <div className={styles.multiNum}>{randomCols}</div>
          <p className={styles.label}>每行动物种数</p>
        </div>

        <div className={styles.bigCharacter}>=</div>

        <div className={styles.countContainer}>
          <div className={styles.multiNum}>
            {/* <label htmlFor="answerNum"></label> */}
            <input
              id="answerNum"
              type="number"
              placeholder="_____?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                // 回车触发提交
                if (e.key === "Enter") handleSubmit();
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
