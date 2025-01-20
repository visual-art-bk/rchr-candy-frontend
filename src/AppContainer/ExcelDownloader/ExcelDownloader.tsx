import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { tLinksJson } from "../AppContainer";
import "./excel-downloader.module.css";

type tExcelDw = {
  stateLinksJson: tLinksJson;
};

export default function ExcelDownloader(props: tExcelDw) {
  const { stateLinksJson } = props;

  const defaultClassName = "excel-dw-container";
  const [classNameToExcelDw, setClassNameToExcelDw] =
    useState(defaultClassName);

  useEffect(() => {
    // stateLinksJson의 길이에 따라 클래스 이름을 변경하여 display 속성을 조정
    if (stateLinksJson.length !== 0) {
      setClassNameToExcelDw(`${defaultClassName} active`);
    } else {
      setClassNameToExcelDw(defaultClassName);
    }
  }, [stateLinksJson]);

  const handleDownload = () => {
    if (stateLinksJson.length === 0) return;

    // JSON 데이터를 워크시트로 변환
    const worksheet = XLSX.utils.json_to_sheet(stateLinksJson);

    const columnWidths = Object.keys(
      stateLinksJson[0] as Record<string, any>
    ).map((key) => {
      const typedKey = key as keyof (typeof stateLinksJson)[0];

      const maxLength = Math.max(
        key.length,
        ...stateLinksJson.map((row) =>
          row[typedKey] ? String(row[typedKey]).length : 0
        )
      );

      return { wch: maxLength + 2 };
    });

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "stateLinksJson.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // stateLinksJson의 길이가 0일 때 컴포넌트를 렌더링하지 않도록 조건부 렌더링 적용
  if (stateLinksJson.length === 0) {
    return null;
  }

  return (
    <div className={classNameToExcelDw}>
      <div className="excel-dw" onClick={handleDownload}>
        <p>엑셀 다운하기</p>
      </div>
    </div>
  );
}
