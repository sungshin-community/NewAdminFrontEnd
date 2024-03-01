import React from "react";
import styled from "styled-components";
import Button from "./Button";
import DeleteModal from "./DeleteModal"; 
import PasswordModal from "./PasswordModal"; 
import ModifyModal from "./ModifyModal";
import { useState } from "react";
// 연동 전 데모 데이터
const demoData = [
  {
    number: 1,
    title: "게시글의 제목입니다",
    date: "24.02.10 - 12:00",
    content: "게시글 내용입니다 어쩌구저쩌구 일이삼사오육칠팔구십",
  },
];

export default function DetailsView() {
  
  {/*삭제 모달*/}
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const selectedPost = demoData[0];

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    setPasswordModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleConfirmPassword = () => {
    // 비밀번호를 확인하고 게시물을 삭제하는 실제 로직 추가
    // 현재는 비밀번호 모달을 닫기만 한다
    setPasswordModalOpen(false);
  };

  const handleCancelPassword = () => {
    setPasswordModalOpen(false);
  };

  {/*수정 모달*/}
  const [isModifyModalOpen, setModifyModalOpen] = useState(false);

  const handleModifyClick = () => {
    setModifyModalOpen(true);
  };

  const handleConfirmModify = () => {
    setModifyModalOpen(false);
    // 게시글 수정 처리 로직을 여기에 추가
    window.alert("게시글이 수정되었습니다.");
  };

  const handleCancelModify = () => {
    setModifyModalOpen(false);
  };

  return (
    <DetailsViewWrap>
      <StyledHeading>게시글 정보 상세보기</StyledHeading>
      <PostContainer>
        <TitleWrap marginBottom="20px" borderBottom="1px solid #000000">
          <PostInform>게시글 기본 정보</PostInform>
          <Scrap>스크랩</Scrap>
        </TitleWrap>
        <Number>고유번호: {selectedPost.number}</Number>
        <Date>작성일: {selectedPost.date}</Date>
        <UpdateDate>업데이트일</UpdateDate>
      
          <TitleBox>{selectedPost.title}</TitleBox>
          <Content>{selectedPost.content}</Content>
  
      </PostContainer>
      <ButtonWrap1>
        <Button width="120px" height="28px" fontSize="14px" onClick={handleModifyClick}>
          게시글 수정
        </Button>
        {/* 수정 모달 */}
        <ModifyModal
          isOpen={isModifyModalOpen}
          onConfirm={handleConfirmModify}
          onCancel={handleCancelModify}
        />
        <Button
          width="120px"
          height="28px"
          fontSize="14px"
          onClick={handleDeleteClick}
        >
          게시글 삭제
        </Button>
        
      </ButtonWrap1>
      {/* 삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* 비밀번호 모달 */}
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
  background-color: #FBFCFE;
  height: 100vh;
  width: 692px;
  padding: 20px; // Added padding
  position: relative;
`;

const PostContainer = styled.div`
   // Different background color
  margin-bottom: 20px; // Added margin-bottom
  padding: 20px; // Added padding
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
  background-color: #F6F9FD; 
  margin-top: 20px; 
  padding: 20px; 
  margin-left: 30px;
  margin-right: 30px;
`;

const Content = styled.div`
  margin-top: 10px; 
  background-color: #F6F9FD; 
  margin-top: 20px; 
  padding: 20px; 
  margin-left: 30px;
  margin-right: 30px;
  height: 200px;
`;

const ButtonWrap1 = styled.div`
  margin-left: auto;
  margin-right: 55px;
  display: flex;
  gap: 8px; /* Adjust the gap as needed */
  justify-content: flex-end; /* Align buttons to the right */
`;
