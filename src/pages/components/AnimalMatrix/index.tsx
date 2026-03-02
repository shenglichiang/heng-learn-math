import { useEffect, useState } from "react";
import styles from "./index.less";
import { create } from "zustand";
import { useStartedStore } from "@/pages/components/PreSettingsPop";
import { useGameSettingsStore } from "@/pages/components/PreSettingsPop";

// 导入素材
import catUrl from "@/assets/multiplication/cat.png";
import deerUrl from "@/assets/multiplication/deer.png";
import dogUrl from "@/assets/multiplication/dog.png";
import dolphinUrl from "@/assets/multiplication/dolphin.png";
import foxUrl from "@/assets/multiplication/fox.png";
import pandaUrl from "@/assets/multiplication/panda.png";
import penguinUrl from "@/assets/multiplication/penguin.png";
import rabbitUrl from "@/assets/multiplication/rabbit.png";
import squirrelUrl from "@/assets/multiplication/squirrel.png";
import tigerUrl from "@/assets/multiplication/tiger.png";

interface Animal {
  id: number;
  name: string;
  url: string;
}

const animals: Animal[] = [
  { id: 1, name: "cat", url: catUrl },
  { id: 2, name: "deer", url: deerUrl },
  { id: 3, name: "dog", url: dogUrl },
  { id: 4, name: "dolphin", url: dolphinUrl },
  { id: 5, name: "fox", url: foxUrl },
  { id: 6, name: "panda", url: pandaUrl },
  { id: 7, name: "penguin", url: penguinUrl },
  { id: 8, name: "rabbit", url: rabbitUrl },
  { id: 9, name: "squirrel", url: squirrelUrl },
  { id: 10, name: "tiger", url: tigerUrl },
];
// 随机函数（生成1-10整数）
interface RandomNumState {
  randomRows: number;
  randomCols: number;
  generateRandomNums: (min?: number, max?: number) => void;
}
export const useRandomNumStore = create<RandomNumState>((set, get) => ({
  randomRows: 1,
  randomCols: 1,
  generateRandomNums: (min = 1, forcedMax?: number) => {
    const max = forcedMax ?? useGameSettingsStore.getState().maxMultiplier;
    const getRandomNum = (minNum: number, maxNum: number) =>
      Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    set({
      randomRows: getRandomNum(min, max),
      randomCols: getRandomNum(min, max),
    });
  },
}));

const AnimalMatrix = () => {
  const [matrix, setMatrix] = useState<Animal[][]>([]);
  const { randomRows, randomCols, generateRandomNums } = useRandomNumStore(
    (state) => state,
  );
  const { isStarted } = useStartedStore();

  // 随机选取n个动物
  const getRandomAnimals = (count: number): Animal[] => {
    const copyAnimals = [...animals];
    const result: typeof animals = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * copyAnimals.length);
      result.push(copyAnimals.splice(randomIndex, 1)[0]);
    }
    return result;
  };

  // 生成图片矩阵
  const generateMatrix = () => {
    const uniqueAnimals = getRandomAnimals(randomCols);

    const newMatrix: typeof matrix = [];
    for (let i = 0; i < randomRows; i++) {
      newMatrix.push(uniqueAnimals.map((animal) => ({ ...animal })));
    }
    setMatrix(newMatrix);
  };

  // 初始化组件
  useEffect(() => {
    if (!isStarted) {
      setMatrix([]);
      return;
    }
    generateRandomNums();
  }, [isStarted, generateRandomNums]);

  useEffect(() => {
    if (randomRows >= 1 && randomCols >= 1 && isStarted) {
      generateMatrix();
    }
  }, [randomRows, randomCols, isStarted]);

  return (
    <div
      className={styles.animalMatrixContainer}
      style={{ "--col-count": randomCols } as React.CSSProperties}
    >
      {matrix.flat().map((img, index) => (
        <div key={`${img.id}-${index}`} className={styles.animalCell}>
          <img src={img.url} alt={img.name} className={styles.animal} />
        </div>
      ))}
    </div>
  );
};

export default AnimalMatrix;
