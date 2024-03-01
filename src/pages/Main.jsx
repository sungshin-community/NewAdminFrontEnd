import React, { useState } from "react";
import SideBar from "../components/SideBar";
import PostMannager from "../components/PostMannager";
import styled from "styled-components";
import DetailsView from "../components/DetailsView";
import Writing from "../components/Writing";

export default function Main() {
  const [isWriting, setIsWriting] = useState(false);
  console.log("isWriting value:", isWriting);

  const handleWritingButtonClick = () => {
    setIsWriting(true);
  };
  return (
    <MainWrap>
      <SideBar />
      <PostMannager onWritingButtonClick={handleWritingButtonClick} />
      {isWriting ? <Writing /> : <DetailsView />}
    </MainWrap>
  );
}
const MainWrap = styled.div`
  display: flex;
`;
