import React from "react";
import styled from "styled-components";
import Button from "./Button";
export default function PostMannager({ onWritingButtonClick }) {
  return (
    <PostMannagerWrap>
      <MainText>작성 게시글 관리</MainText>
      <Button onClick={onWritingButtonClick}>게시글 작성</Button>
    </PostMannagerWrap>
  );
}

const PostMannagerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 41px 53px;
`;

const MainText = styled.div`
  color: #2f395a;
  font-size: 25px;
`;
