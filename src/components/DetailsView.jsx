import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import DeleteModal from "./DeleteModal";
import PasswordModal from "./PasswordModal";
import ModifyModal from "./ModifyModal";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailsView({ postId, updateIsModifying }) {
  {
    /*삭제 모달*/
  }

  const accessToken = localStorage.getItem("accessToken");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [data, setData] = useState([]); // 전체 데이터
  const [modifiedPostData, setModifiedPostData] = useState({
    title: "",
    content: "",
  });
  const [isModifying, setIsModifying] = useState(false);

  const handleConfirmModify = () => {
    setModifyModalOpen(false);
    setIsModifying(true);
    updateIsModifying(true);
  };

  const handlePostClick = async () => {
    // const title = document.getElementById('detail_title_txt');
    // const content = document.getElementById('detail_content_txt');

    // const modifiedPostData = {
    //   title: title.textContent,
    //   content: content.textContent
    // };

    try {
      console.log("Modified Post Data:", modifiedPostData);
      const apiUrl = `http://admin-api.crystalmine.kr/department/posts/${postId}`;
      const response = await axios.put(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: modifiedPostData,
      });

      console.log("게시글이 성공적으로 수정되었습니다.", response.data);
      window.alert("게시글이 수정되었습니다.");

      setData(modifiedPostData);
    } catch (error) {
      setModifiedPostData(data);
      console.error("게시글 수정 중 오류 발생:", error);
    }

    setIsModifying(false);
    updateIsModifying(false);
  };

  const handleCancelPostClick = () => {
    setModifiedPostData(data);
    setIsModifying(false);
    updateIsModifying(false);
  };
  // const accessToken =
  // "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM1MTIzNSIsImF1dGgiOiJTQ0hPT0xfREVQQVJUTUVOVCIsImV4cCI6MTcxMDMyNTYyMn0.hpUIMgUs4aGLqvB-Y-0XmInfscKWSrkkYtZgCJwHNIT805ZHv8vgvREakjHOK-iFI0OCccVbWFle78yKukQFlw";

  //const selectedPost = demoData[0];

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    setPasswordModalOpen(true);
    // setData(modifiedPostData);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleConfirmPassword = async () => {
    try {
      const apiUrl = `http://admin-api.crystalmine.kr//department/posts/${postId}`;
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          password: passwordInput,
        },
      });
      console.log("게시물이 성공적으로 삭제되었습니다.", response.data);
      setPasswordInput(""); // 비밀번호 입력 필드 초기화
      setPasswordModalOpen(false);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
    }
  };

  const handleCancelPassword = () => {
    setPasswordInput(""); // 비밀번호 입력 필드 초기화
    setPasswordModalOpen(false);
  };

  {
    /*수정 모달*/
  }
  const [isModifyModalOpen, setModifyModalOpen] = useState(false);

  const handleModifyClick = () => {
    setModifyModalOpen(true);
  };

  const handleCancelModify = () => {
    setModifyModalOpen(false);
  };

  const handleSpanChange = (event) => {
    if (event.target.id == "detail_title_txt") {
      setModifiedPostData({
        ...modifiedPostData,
        title: event.target.textContent,
      });
    } else {
      setModifiedPostData({
        ...modifiedPostData,
        content: event.target.textContent,
      });
    }
  };

  // DetailView
  useEffect(() => {
    console.log("initial-postId: " + postId);
    const fetchData = async () => {
      try {
        const apiUrl = `http://admin-api.crystalmine.kr/department/posts/${postId}`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setData(response.data.data);
        setModifiedPostData(response.data.data);

        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  return (
    <DetailsViewWrap>
      <StyledHeading>게시글 정보 상세보기</StyledHeading>
      <PostContainer>
        <TitleWrap marginBottom="20px" borderBottom="1px solid #000000">
          <PostInform>게시글 기본 정보</PostInform>
          <Scrap>스크랩</Scrap>
        </TitleWrap>
        <Number>고유번호:{data.postId}</Number>
        <Date>작성일: {data.createdAt}</Date>
        <UpdateDate>업데이트일: {data.modifiedAt}</UpdateDate>
        <span
          id="detail_title_txt"
          contentEditable={isModifying}
          onBlur={handleSpanChange}
          suppressContentEditableWarning="true"
        >
          <TitleBox>{modifiedPostData.title}</TitleBox>
        </span>
        <span
          id="detail_content_txt"
          contentEditable={isModifying}
          onBlur={handleSpanChange}
          suppressContentEditableWarning="true"
        >
          <Content>{modifiedPostData.content}</Content>
        </span>
        <ButtonWrap1>
          {!isModifying && (
            <Button
              width="120px"
              height="28px"
              fontSize="14px"
              onClick={handleModifyClick}
            >
              게시글 수정
            </Button>
          )}
          {/* 수정 모달 */}
          <ModifyModal
            isOpen={isModifyModalOpen}
            onConfirm={handleConfirmModify}
            onCancel={handleCancelModify}
          />
          {!isModifying && (
            <Button
              width="120px"
              height="28px"
              fontSize="14px"
              onClick={handleDeleteClick}
            >
              게시글 삭제
            </Button>
          )}
          {isModifying && (
            <Button
              width="120px"
              height="28px"
              fontSize="14px"
              onClick={handleCancelPostClick}
            >
              취소
            </Button>
          )}
          {isModifying && (
            <Button
              width="120px"
              height="28px"
              fontSize="14px"
              onClick={handlePostClick}
            >
              등록하기
            </Button>
          )}
        </ButtonWrap1>
      </PostContainer>

      {/* 삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />

      {/* 비밀번호 입력 모달 */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onConfirm={handleConfirmPassword}
        onCancel={handleCancelPassword}
        onChange={handlePasswordInput}
        passwordInput={passwordInput}
      />
    </DetailsViewWrap>
  );
}

const StyledHeading = styled.h3`
  font-family: "SpoqaHanSansNeoLight";
  margin-top: 30px;
  margin-left: px;
`;

const DetailsViewWrap = styled.div`
  background-color: #fbfcfe;
  max-height: 300vh;
  width: 692px;
  padding: 20px;
  position: relative;
`;

const PostContainer = styled.div`
  margin-bottom: 5%;
  padding: 20px;
`;

const PostInform = styled.div`
  margin-top: 20px;
  margin-right: 80px;
`;

const Scrap = styled.div`
  margin-top: 20px;
  margin-left: 100px;
`;

const TitleWrap = styled.div`
  display: flex;
  width: 90%;
  align-items: baseline;
  margin-left: 30px;
  margin-bottom: ${(props) => props.marginBottom || "15px"}; // 속성 사용
  border-bottom: ${(props) => props.borderBottom || "none"}; // 속성 사용
`;

const Number = styled.div`
  margin-left: 30px;
  margin-bottom: 15px;
`;

const Date = styled.div`
  margin-left: 30px;
  margin-bottom: 15px;
`;

const UpdateDate = styled.div`
  margin-left: 30px;
`;

const TitleBox = styled.div`
  font-weight: bold;
  background-color: #f6f9fd;
  margin-top: 20px;
  padding: 20px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Content = styled.div`
  margin-top: 10px;
  background-color: #f6f9fd;
  margin-top: 20px;
  padding: 20px;
  margin-left: 30px;
  margin-right: 30px;
  max-height: 300px;
  overflow: auto;
  margin-bottom: 5%;
  line-height: 1.7;
`;

const ButtonWrap1 = styled.div`
  margin-left: auto;
  margin-right: 55px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;
