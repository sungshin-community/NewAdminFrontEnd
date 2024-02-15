import React from "react";
import styled from "styled-components";

export default function DetailsView() {
  return <DetailsViewWrap>게시글 정보 상세보기</DetailsViewWrap>;
}

const DetailsViewWrap = styled.div`
  background-color: #f6f9fd;
  height: 100vh;
  width: 692px;
`;
