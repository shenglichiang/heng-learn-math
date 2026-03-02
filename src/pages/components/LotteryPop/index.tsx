import styles from "./index.less";
import { useLotteryPopWindowStore } from "../PopWindow/";
import { useStartedStore } from "../PreSettingsPop/";
import clsx from "clsx";

// 导入素材
import aisha from "@/assets/lotteryImgs/aisha.jpg";
import themole from "@/assets/lotteryImgs/themole.jpg";

const lotteryImgs = [
  { id: 1, name: "aisha", url: aisha },
  { id: 2, name: "aisha", url: aisha },
  { id: 3, name: "aisha", url: aisha },
  { id: 4, name: "themole", url: themole },
];

const LotteryPop = () => {
  const { isLotteryPopWindowOpen } = useLotteryPopWindowStore();
  const { setIsStarted } = useStartedStore();

  // 生成随机数
  const randomNum = Math.floor(Math.random() * lotteryImgs.length);
  const bingoImg = lotteryImgs[randomNum];
  const { id, name, url } = bingoImg;
  //   console.log(bingoImg);

  const handleGameOver = () => {
    window.location.reload();
    setIsStarted(false);
  };

  return (
    <div
      className={clsx(
        styles.lotteryWrapper,
        !isLotteryPopWindowOpen && styles.hide,
      )}
    >
      <div className={styles.lotteryPop}>
        <img src={url} alt={name} className={styles.lotteryImg} />
      </div>
      <div className={styles.closeBtn} onClick={handleGameOver}></div>
    </div>
  );
};

export default LotteryPop;
