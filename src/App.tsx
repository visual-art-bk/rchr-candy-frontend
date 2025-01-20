import React, { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./app.module.css";
import AppContainer from "./AppContainer/AppContainer";
const ROOT_ID_TO_WORDPRESS_BODY_CONTENT = "wpbody-content";
const rootID = "rchrCandyRoot";
const rootElement = document.getElementById(rootID);

if (rootElement !== null && rootElement !== undefined) {
  createRoot(rootElement).render(<App isValidRootElement={true}></App>);
  console.log('뤼초록 스와이퍼 시작합니다.')
} else {
  console.error(
    `Invalid id [ ${rootID} ] to the page of the dashboard of Wp-Swiper.`
  );
  const rootWpBodyContent = document.getElementById(
    ROOT_ID_TO_WORDPRESS_BODY_CONTENT
  );

  // @ts-ignore
  // That' why rootWpBodyContent is got by the id of Wordpress.
  // createRoot(rootWpBodyContent).render(<div>대시보드 준비중이에요.</div>);
}

function App({ isValidRootElement }: { isValidRootElement: boolean }) {
  if (isValidRootElement === false) {
    // return <div>대시보드 준비중이에요.</div>;
    console.error('Error..')
  }
  return (
    <div className="app light" prefix="_rchrCandy-fm-43">
      <AppContainer></AppContainer>
    </div>
  );
}
