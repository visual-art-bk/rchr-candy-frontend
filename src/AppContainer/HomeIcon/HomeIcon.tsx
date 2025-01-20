import { useEffect, useState } from "react";
import "./home-icon.module.css";

type tHomeIconPros = {
  isShowData: boolean;
  setIsShowData: Function;
  setStateLinksJson: Function;
};

export default function HomeIcon(props: tHomeIconPros) {
  const { isShowData, setIsShowData, setStateLinksJson } = props;
  const defaultClassName = "rchr-home-icon material-icons md-32";
  const [classNameToHomeIcon, setClassName] = useState(defaultClassName);

  const onClick = () => {
    setIsShowData(false);
    setStateLinksJson([]);
  };

  useEffect(() => {
    if (isShowData === true) {
      setClassName("rchr-home-icon material-icons md-32 active");
    } else {
      setClassName(defaultClassName);
    }
  }, [isShowData]);

  // isShowData가 true일 때만 렌더링
  if (!isShowData) {
    return null;
  }

  return (
    <div className={classNameToHomeIcon} onClick={onClick}>
      <span>home</span>
      <span className="icon-label">홈</span>
    </div>
  );
}
