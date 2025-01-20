import "./crawler.module.css";
import SearchBox from "./SearchBox/SearchBox";
import { useEffect, useState } from "react";
import MainTitle from "./MainTitle/MainTitle";
import { tScrappeds, tLinksJson } from "../AppContainer";

type tCrawlerProps = {
  isShowData: boolean;
  setIsShowData: React.Dispatch<React.SetStateAction<boolean>>;
  setStateLinksJson: React.Dispatch<React.SetStateAction<tLinksJson>>;
};
export default function Crawler(props: tCrawlerProps) {
  const { isShowData, setIsShowData, setStateLinksJson } = props;
  const defalutclassname = "rchr-crawler-container";
  const [classNameToCrawler, setclassNameToCrawler] =
    useState(defalutclassname);

  useEffect(() => {
    if (isShowData === true) {
      setclassNameToCrawler(`${defalutclassname} inactive`);
    } else {
      setclassNameToCrawler(defalutclassname);
    }
  }, [isShowData]);

  return (
    <div className={classNameToCrawler}>
      <div className="rchr-crawler">
        <MainTitle isShowData={isShowData}></MainTitle>

        <SearchBox
          isShowData={isShowData}
          setIsShowData={setIsShowData}
          setStateLinksJson={setStateLinksJson}
        ></SearchBox>
      </div>
    </div>
  );
}
