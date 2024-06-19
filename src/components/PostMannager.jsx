import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Pagination from "./Pagination";
import axios from "axios";

export default function PostMannager({
  onWritingButtonClick,
  onPostClick,
  isModifying,
}) {
  const [postLists, setPostLists] = useState([]); // 게시글 목록
  const [data, setData] = useState([]); // 전체 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글
  const [isWriting, setIsWriting] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  // 검색어 입력
  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // 검색 버튼 클릭
  const handleSearchButtonClick = () => {
    fetchData(currentPage, searchKeyword);
  };

  //테스트 accessToken
  {
    /*  const accessToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM1MTIzNSIsImF1dGgiOiJTQ0hPT0xfREVQQVJUTUVOVCIsImV4cCI6MTcxMDc3NjE5Nn0.KhfX5_UIt0gCP4KZQCp1A30WRE4mSDUF7uJ4ZTmm6kHxq8ikKNmnPX1vt9Ig0NcTGcJ-CRXzShWYlRYeTACKWg";
   const login = async (id, password) => {
    try {
      const apiUrl = "http://15.165.252.35:1936/auth/signin";

      const response = await axios.post(apiUrl, {
        username: id,
        password: password,
      });

      const accessToken = response.data.data.tokenDto.accessToken;
      const refreshToken = response.data.data.tokenDto.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(response.data);
      return true;
    } catch (e) {
      console.log(e.response.data);
      return false;
    }
  };

    const testLogin = async () => {
    try {
      const result = await login("12351235", "password123!!!");
      if (result) {
        console.log("로그인 성공");
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    testLogin();
  }, []);*/
  }

  // 게시글 목록 연동
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://crystalmineadmindev.o-r.kr/department/posts`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(currentPage);
  }, []);

  // 페이지 별 게시글 목록 연동
  const fetchData = async (page, searchKeyword) => {
    try {
      let apiUrl = `http://crystalmineadmindev.o-r.kr/department/posts?page=${
        page - 1
      }`;

      // 검색어가 있을 경우 쿼리에 추가
      if (searchKeyword) {
        apiUrl += `&searchKeyWord=${searchKeyword}`;
      }
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPostLists(response.data.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePostClick = (postId) => {
    if (isModifying) return;
    console.log("Post ID:", postId);
    setSelectedPost(postId);
    onPostClick(postId); // 선택된 게시물의 ID를 부모 컴포넌트로 전달
  };

  return (
    <PostMannagerWrap>
      {/* 상단 제목 */}
      <TitleWrap>
        <MainText>작성 게시글 관리</MainText>
      </TitleWrap>
      {/* 검색 */}
      <div>
        <SearchText>검색어 입력</SearchText>
        <SearchBoxWrap>
          <TitleWrap marginBottom="20px" borderBottom="1px solid #D6DFE9">
            <SearchInputText>제목+내용</SearchInputText>
            <SearchInput
              placeholder="검색어를 입력해주세요."
              value={searchKeyword}
              onChange={handleSearchInputChange}
            ></SearchInput>
          </TitleWrap>
          <Button
            width="120px"
            height="28px"
            fontSize="14px"
            onClick={handleSearchButtonClick}
          >
            검색
          </Button>
        </SearchBoxWrap>
      </div>
      {/* 게시글 리스트 */}
      <ListContainer>
        <ListBoxWrap even={2}>
          <TableBox padding="20px 10px 20px 20px">고유번호</TableBox>
          <TableBox width="160px" padding="20px 10px 20px 20px">
            제목
          </TableBox>
          <TableBox width="130px" padding="20px 10px 20px 20px">
            작성 일시
          </TableBox>
          <TableBox style={{ flex: 1 }} padding="20px 10px 20px 20px">
            내용
          </TableBox>
        </ListBoxWrap>
        {postLists.map((data, index) => (
          <ClickablePost
            isModifying={isModifying}
            key={data.postId}
            onClick={() => handlePostClick(data.postId)}
          >
            <ListBoxWrap even={index % 2 === 0}>
              <TableBox>{data.postId}</TableBox>
              <TableBox width="160px">{data.title}</TableBox>
              <TableBox width="130px">{data.createdAt}</TableBox>
              <TableBox style={{ flex: 1 }}>
                {data.content.length > 15
                  ? `${data.content.slice(0, 15)}...`
                  : data.content}
              </TableBox>
            </ListBoxWrap>
          </ClickablePost>
        ))}
      </ListContainer>
      <ButtonWrap>
        <Button onClick={onWritingButtonClick}>게시글 작성</Button>
      </ButtonWrap>
      {/* 페이지네이션 */}
      <Pagination
        itemsPerPage={data.numberOfElements}
        totalItems={data?.pageable?.pageSize}
        currentPage={currentPage}
        setCurrentPage={(page) => setCurrentPage(page)}
        totalPageNum={20}
        fetchData={fetchData}
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
  width: 80%;
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
  width: ${(props) => props.width || "70px"};
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

const ClickablePost = styled.div`
  cursor: ${(props) => (props.isModifying ? "not-allowed" : "pointer")};
`;

const handlePostClick = (postId) => {
  console.log("Clicked post with ID:", postId);
};
