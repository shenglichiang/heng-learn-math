import { useState } from "react";
import styles from "./index.less";
import { create } from "zustand";
import clsx from "clsx";

// 游戏状态（是否开始）
interface StartedStore {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
}
export const useStartedStore = create<StartedStore>((set) => ({
  isStarted: false,
  setIsStarted: (isStarted: boolean) => set(() => ({ isStarted })),
}));

// 游戏设置
interface GameSettings {
  maxMultiplier: number;
  totalLevels: number;
  setMaxMultiplier: (value: number) => void;
  setTotalLevels: (value: number) => void;
  // 可选：reset 方法
  resetSettings: () => void;
}
export const useGameSettingsStore = create<GameSettings>((set) => ({
  maxMultiplier: 5,
  totalLevels: 10,
  setMaxMultiplier: (value: number) => set(() => ({ maxMultiplier: value })),
  setTotalLevels: (value: number) => set(() => ({ totalLevels: value })),
  resetSettings: () => set(() => ({ maxMultiplier: 5, totalLevels: 10 })),
}));

const PreSettingsPop = () => {
  const { isStarted, setIsStarted } = useStartedStore((state) => state);
  const { maxMultiplier, totalLevels, setMaxMultiplier, setTotalLevels } =
    useGameSettingsStore((state) => state);
  const handleStart = () => {
    setIsStarted(true);
  };

  //   console.log(maxMultiplier, totalLevels, ")))))))))))))))))))))");

  return (
    <div className={clsx(styles.popWrapper, isStarted ? styles.hide : "")}>
      <div className={styles.popWindow}>
        <div className={styles.maxNum}>
          最大乘数：
          <label>
            <select
              name="maxNum"
              className={styles.selectMaxNum}
              value={maxMultiplier}
              onChange={(e) => {
                console.log(e, "e)))-");
                const _value = Number(e.target.value);

                setMaxMultiplier(_value);
              }}
            >
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </label>
        </div>
        <div className={styles.totalLevel}>
          关卡总数：
          <label>
            <select
              name="levelNum"
              className={styles.selectelevelNum}
              value={totalLevels}
              onChange={(e) => {
                const _value = Number(e.target.value);
                setTotalLevels(_value);
              }}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </label>
        </div>
        <button className={styles.startBtn} onClick={handleStart}>
          开始
        </button>
      </div>
    </div>
  );
};

export default PreSettingsPop;
