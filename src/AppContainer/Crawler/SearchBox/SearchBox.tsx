import "./search-box.module.css";
import { useEffect, useState } from "react";
import { tScrappeds, tScrappedJson, tLinksJson } from "../../AppContainer";

const MAX_KEYWORDS_SIZE = 10;

type tSearchBoxProps = {
  isShowData: boolean;
  setIsShowData: Function;
  setStateLinksJson: React.Dispatch<React.SetStateAction<tLinksJson>>;
};

export default function SearchBox(props: tSearchBoxProps) {
  const { isShowData, setIsShowData, setStateLinksJson } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: { target: { value: any } }) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    console.log("검색어:", searchTerm);
    setIsShowData(true);

    try {
      const baseUrl = `${window.location.origin}/wp-json/rchr-candy/v1/search-naver-blog/01`;
      const urlWithParams = `${baseUrl}?search_keyword=${encodeURIComponent(
        searchTerm
      )}&keywords_size=${MAX_KEYWORDS_SIZE}`;

      console.log(urlWithParams, "로 검색한 키워드 요청했습니다.");

      // GET 요청 전송
      const response = await fetch(urlWithParams);

      if (!response.ok) {
        const result = await response.json();
        console.error("데이터 요청 실패!");
        console.error("status", response.status);
        console.error("error_message", result.error_message);
        throw new Error("데이터 요청 실패!");
      }

      const data: tLinksJson = await response.json();
      console.log(`데이터 요청 성공했습니다. `, data);

      setStateLinksJson(data);
      setIsShowData(true);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  const handleKeyDown = async (event: { key: string; preventDefault: () => void }) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await fetchData(); // 분리된 fetchData 함수 호출
    }

  };

  const defaultClassnameToSearch = "rchr-search-box";
  const [classNameToSearch, setclassNameToSearch] = useState(
    defaultClassnameToSearch
  );

  useEffect(() => {
    if (isShowData === true) {
      setclassNameToSearch(`${classNameToSearch} inactive`);
    } else {
      setclassNameToSearch(defaultClassnameToSearch);
    }
  }, [isShowData]);

  return (
    <div className={classNameToSearch}>
      <div className="search-box">
        <input
          id="crawlKeywords"
          type="text"
          placeholder="예) 가을 러닝"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
