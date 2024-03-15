import React, { useState } from "react";
import SideBar from "../components/SideBar";
import PostMannager from "../components/PostMannager";
import styled from "styled-components";
import DetailsView from "../components/DetailsView";
import Writing from "../components/Writing";

export default function Main() {
    const [isWriting, setIsWriting] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null); 
    const [isModifying, setIsModifying] = useState(false);

    const handleWritingButtonClick = () => {
        setIsWriting(true);
        setSelectedPostId(null); 
    };

    const handlePostClick = (postId) => {
        setSelectedPostId(postId); // 선택된 게시물의 ID를 업데이트
        setIsWriting(false);
    };

    const updateIsModifying = (isModifying) => {
      setIsModifying(isModifying);
    }

    return (
        <MainWrap>
            <SideBar />
            <PostMannager onWritingButtonClick={handleWritingButtonClick} onPostClick={handlePostClick} isModifying={isModifying} /> 
            {!isWriting && selectedPostId !== null && <DetailsView postId={selectedPostId} updateIsModifying={updateIsModifying}/>} {/* 선택된 게시물의 ID가 있을 때만 DetailsView를 렌더링 */}
            {isWriting && <Writing  />}
        </MainWrap>
    );
}

const MainWrap = styled.div`
  display: flex;
`;
