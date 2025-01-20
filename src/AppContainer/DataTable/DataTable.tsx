import React, { useEffect, useState, memo } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "./data-table.module.css";
import { tScrappeds, tLinksJson } from "../AppContainer";

const REMAINING_TIME = 60;

type tDataTableProps = {
  isShowData: boolean;
  setIsShowData: (show: boolean) => void;
  stateLinksJson: tLinksJson;
};

// 로딩 스피너 컴포넌트
const LoadingSpinner = ({
  isLoading,
  isShowData,
}: {
  isLoading: boolean;
  isShowData: boolean;
}) => {
  const [remainingTime, setRemainingTime] = useState(REMAINING_TIME);

  useEffect(() => {
    if (isLoading && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading, remainingTime]);

  useEffect(() => {
    if (isShowData === true) {
      setRemainingTime(REMAINING_TIME);
    }
  }, [isShowData]);

  return (
    <div className="loading-container">
      <PulseLoader
        color="#36d7b7"
        size={15}
        speedMultiplier={0.5}
        loading={isLoading}
      />
      <div className="loading-message">
        <p>남은 시간 {remainingTime}초</p>
      </div>
      <div className="loading-message">
        <p>네이버에서 데이터 수집 중이에요.</p>
      </div>
    </div>
  );
};

const SearchMessage = () => (
  <div className="search-message">
    <span>네이버 블로그에서 검색했어요</span>
  </div>
);

// 테이블 컴포넌트
const DataTableContent = memo(
  ({ columns, data }: { columns: string[]; data: tLinksJson }) => (
    <table className="responsive-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.nick}</td>
            <td>{row.title}</td>
            <td>
              <a href={row.link} target="_blank" rel="noopener noreferrer">
                블로그 바로가기
              </a>
            </td>
            <td>{row.visitors}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
);

export default function DataTable({
  isShowData,
  stateLinksJson,
}: tDataTableProps) {
  const DEFAULT_CLASS_NAME = "table-container";
  const [classNameOfTable, setClassNameOfTable] = useState(DEFAULT_CLASS_NAME);
  const [isLoading, setIsLoading] = useState(true);

  const columns = ["네이버 블로거 닉네임", "포스팅 제목", "링크", "방문자수"];

  useEffect(() => {
    setIsLoading(stateLinksJson.length === 0);
  }, [stateLinksJson]);

  useEffect(() => {
    setClassNameOfTable(
      isShowData ? `${DEFAULT_CLASS_NAME} active` : DEFAULT_CLASS_NAME
    );
  }, [isShowData]);

  useEffect(() => {
    if (stateLinksJson.length === 0 && isShowData === true) {
      setClassNameOfTable(
        isShowData ? `${DEFAULT_CLASS_NAME} active loading` : DEFAULT_CLASS_NAME
      );
    } else {
      setClassNameOfTable(
        isShowData ? `${DEFAULT_CLASS_NAME} active` : DEFAULT_CLASS_NAME
      );
    }
  }, [isShowData, stateLinksJson]);

  return (
    <div className={classNameOfTable}>
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} isShowData={isShowData} />
      ) : (
        <>
          {/* <SearchMessage /> */}
          <DataTableContent columns={columns} data={stateLinksJson} />
        </>
      )}
    </div>
  );
}
