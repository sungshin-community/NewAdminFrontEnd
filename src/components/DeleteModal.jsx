import React from "react";
import Modal from "./Modal";
import styled from "styled-components";

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <StyledDeleteModal isOpen={isOpen} onClose={onCancel}>
      <ModalContent>
        <p>게시글을 삭제하시겠습니까?</p>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <DeleteButton onClick={onConfirm}>삭제하기</DeleteButton>
      </ModalContent>
    </StyledDeleteModal>
  );
};

export default DeleteModal;


const StyledDeleteModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "SpoqaHanSansNeoLight";
`;

const ModalContent = styled.div`
  background-color: #D6DFE9;
  padding: 20px;

  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: #2F395A; 
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;
  margin-left: 15px;
  border: none;
  
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #FFFFFF; 
  color: #2F395A;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`;
