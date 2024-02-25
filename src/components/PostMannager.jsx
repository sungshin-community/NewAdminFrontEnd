import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Pagination from "./Pagination";
export default function PostMannager({ onWritingButtonClick }) {
  const TimName = "창업지원팀"; // 팀(게시판 정보)
  // 연동 전 데모 데이터
  const demoData = [
    {
      number: 1,
      title: "게시글의 제목입니다",
      date: "24.02.10 - 12:00",
      content: "게시글 내용입니다 어쩌구저쩌구 일이삼사오육칠팔구십",
    },
    {
      number: 2,
      title: "창업지원팀 게시글",
      date: "24.05.10 - 12:00",
      content: "일이삼사오육칠팔구십일일일",
    },
    {
      number: 2,
      title: "창업지원팀 게시글",
      date: "24.05.10 - 12:00",
      content: "일이삼사오육칠팔구십일일일",
    },
    {
      number: 2,
      title: "창업지원팀 게시글",
      date: "24.05.10 - 12:00",
      content: "일이삼사오육칠팔구십일일일",
    },
    {
      number: 2,
      title: "창업지원팀 게시글",
      date: "24.05.10 - 12:00",
      content: "일이삼사오육칠팔구십일일일",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PostMannagerWrap>
      {/* 상단 제목 */}
      <TitleWrap>
        <MainText>작성 게시글 관리</MainText>
        <TimeNameText>{TimName}</TimeNameText>
      </TitleWrap>
      {/* 검색 */}
      <div>
        <SearchText>검색어 입력</SearchText>
        <SearchBoxWrap>
          <TitleWrap marginBottom="20px" borderBottom="1px solid #D6DFE9">
            <SearchInputText>제목+내용</SearchInputText>
            <SearchInput placeholder="검색어를 입력해주세요."></SearchInput>
          </TitleWrap>
          <Button width="120px" height="28px" fontSize="14px">
            검색
          </Button>
        </SearchBoxWrap>
      </div>
      {/* 게시글 리스트 */}
      <ListContainer>
        <ListBoxWrap even={2}>
          <TableBox padding="20px 10px 20px 20px">고유번호</TableBox>
          <TableBox width="250px" padding="20px 10px 20px 20px">
            제목
          </TableBox>
          <TableBox width="130px" padding="20px 10px 20px 20px">
            작성 일시
          </TableBox>
          <TableBox style={{ flex: 1 }} padding="20px 10px 20px 20px">
            내용
          </TableBox>
        </ListBoxWrap>
        {demoData.map((data, index) => (
          <ListBoxWrap even={index % 2 === 0}>
            <TableBox>{data.number}</TableBox>
            <TableBox width="250px">{data.title}</TableBox>
            <TableBox width="130px" textAlign="center">
              {data.date}
            </TableBox>
            <TableBox style={{ flex: 1 }}>
              {data.content.length > 15
                ? `${data.content.slice(0, 15)}...`
                : data.content}
            </TableBox>
          </ListBoxWrap>
        ))}
      </ListContainer>
      <ButtonWrap>
        <Button onClick={onWritingButtonClick}>게시글 작성</Button>
      </ButtonWrap>
      {/* 페이지네이션 */}
      <Pagination
        itemsPerPage={15}
        totalItems={150}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageNum={10}
      />
    </PostMannagerWrap>
  );
}

const PostMannagerWrap = styled.div`
  color: #2f395a;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 41px 53px;
`;
const TitleWrap = styled.div`
  display: flex;
  width: 60%;
  align-items: baseline;
  margin-bottom: ${(props) => props.marginBottom || "30px"};
  border-bottom: ${(props) => props.borderBottom || ""};
  padding-bottom: 6px;
  margin-right: 30px;
`;

const SearchBoxWrap = styled.div`
  display: flex;
`;
const MainText = styled.div`
  font-size: 25px;
`;

const TimeNameText = styled.div`
  font-size: 17px;
  margin-left: 17px;
`;

const SearchText = styled.div`
  font-size: 14px;
  color: #5e6f9e;
  margin-bottom: 13px;
`;
const SearchInputText = styled.div`
  width: fit-content;
  font-size: 16px;
  color: #2f395a;
  border-right: 1px solid #2f395a;
  padding-right: 13px;
`;

const SearchInput = styled.input`
  font-size: 16px;
  outline: none;
  border: none;
  color: #2f395a;
  margin-left: 17px;
  &::placeholder {
    color: #9fabd3;
  }
`;

const ListBoxWrap = styled.div`
  background-color: ${(props) => (props.even ? "#F6F9FD" : "#EDF2F9")};
  display: flex;
`;

const TableBox = styled.div`
  width: ${(props) => props.width || "90px"};
  padding: ${(props) => props.padding || "10px 10px 10px 20px"};
  color: #2f395a;
  text-align: ${(props) => props.textAlign || "start"};
`;

const ListContainer = styled.div`
  margin-bottom: 12px;
`;

const ButtonWrap = styled.div`
  margin-left: auto;
`;
