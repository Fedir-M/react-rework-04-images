import s from "./IconBox.module.css";
import spriteCross from "./../../../assets/spriteCross.svg";

export const IconBox = () => {
  return (
    <div className={s.iconBox_wrapper}>
      <svg className={s.iconSvg} width="32" height="32">
        <use className={s.iconUse} href={`${spriteCross}#iconcross`}></use>
      </svg>
    </div>
  );
};
