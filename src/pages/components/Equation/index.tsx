import styles from "./index.less";
import { useRandomNumStore } from "../AnimalMatrix";
import { useState } from "react";

const Equation = () => {
  const { randomRows, randomCols } = useRandomNumStore((state) => state);

  const [inputNum, setInputNum] = useState<string | null>(null);

  // 监听输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log(value);

    setInputNum(value);
  };

  // 触发提交
  const handleSubmit = () => {
    if (inputNum) {
      // 触发提交
      setInputNum("");
    }
  };

  return (
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
          <label htmlFor="answerNum"></label>
          <input
            id="answerNum"
            type="number"
            placeholder="动物总数"
            onChange={handleInputChange}
            onKeyDown={(e) => {
              // 回车触发提交
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </div>

        {/* <p className={styles.label}>所有动物总数</p> */}
      </div>

      <button onClick={handleSubmit}>确 定</button>
    </div>
  );
};

export default Equation;
