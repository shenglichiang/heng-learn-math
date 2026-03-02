import AnimalMatrix from "./components/AnimalMatrix";
import Equation from "./components/Equation";
import PopWindow from "./components/PopWindow";
import LotteryPop from "./components/LotteryPop";
import PreSettingsPop from "./components/PreSettingsPop";
export default function HomePage() {
  return (
    <>
      <Equation />
      <AnimalMatrix />
      <PopWindow />
      <LotteryPop />
      <PreSettingsPop />
    </>
  );
}
