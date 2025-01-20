import "./app-container.module.css";
import HomeIcon from "./HomeIcon/HomeIcon";
import Crawler from "./Crawler/Crawler";
import DataTable from "./DataTable/DataTable";
import ExcelDownloader from "./ExcelDownloader/ExcelDownloader";
import { useState } from "react";

export type tLinksJson = {
  link: string;
  nick: string;
  title: string;
  visitors: string;
}[];

export type tScrappedJson = {
  links: tLinksJson;
};
export type tScrappeds = {
  nick: string;
  title: string;
  link: string;
  visitors: string;
};

const intialLinksJson: tLinksJson = [];

export default function AppContainer() {
  const [isShowData, setIsShowData] = useState(false);

  // const [stateScrappeds, stateSetScrappeds] = useState();
  const [stateLinksJson, setStateLinksJson] = useState(intialLinksJson);

  return (
    <div className="app-container-wrapper">
      <div className="app-container">
        <HomeIcon
          isShowData={isShowData}
          setIsShowData={setIsShowData}
          setStateLinksJson={setStateLinksJson}
        ></HomeIcon>

        <Crawler
          isShowData={isShowData}
          setIsShowData={setIsShowData}
          // stateSetScrappeds={stateSetScrappeds}
          setStateLinksJson={setStateLinksJson}
        ></Crawler>

        <DataTable
          isShowData={isShowData}
          setIsShowData={setIsShowData}
          stateLinksJson={stateLinksJson}
        ></DataTable>

        <ExcelDownloader stateLinksJson={stateLinksJson}></ExcelDownloader>
      </div>
    </div>
  );
}
