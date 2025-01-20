import { useEffect, useState } from "react";
import "./main-title.module.css";

type tMainTitleProps = {
  isShowData: boolean;
};

export default function MainTitle(props: tMainTitleProps) {
  const { isShowData } = props;
  const defaultClassnameMainTitle = "rchr-main-title";
  const [classNameOfMainTitle, setClassName] = useState(
    defaultClassnameMainTitle
  );

  const fullText = "무엇이든 크롤링 해보세요!";
  const [displayedText, setDisplayedText] = useState(""); // 초기 상태 빈 문자열로 설정

  useEffect(() => {
    if (isShowData === true) {
      setClassName(`${defaultClassnameMainTitle} inactive`);
    } else {
      setClassName(defaultClassnameMainTitle);
    }
  }, [isShowData]);

  useEffect(() => {
    if (!isShowData) {
      setDisplayedText(""); // 상태 초기화
      let index = 0;
      const delay = 100; // 글자 타이핑 속도 (ms)

      const intervalId = setInterval(() => {
        if (index <= fullText.length) { // 텍스트 길이를 초과하지 않도록 조건 추가
          setDisplayedText(fullText.slice(0, index)); // index까지의 부분 문자열 설정
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, delay);

      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [isShowData]); // isShowData의 상태 변경 시 실행

  return (
    <div className={classNameOfMainTitle}>
      <p>{displayedText}</p>
    </div>
  );
}
