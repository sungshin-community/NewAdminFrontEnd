import React from "react";
import styled from "styled-components";

export default function SideBarTab() {
  return (
    <SideBarTabWrap>
      <TabText>작성 게시글 관리</TabText>
    </SideBarTabWrap>
  );
}

const SideBarTabWrap = styled.div`
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: #f6efff;
  display: flex;
`;

const TabText = styled.div`
  font-size: 17px;
  color: #a055ff;
  margin-left: 32px;
`;
