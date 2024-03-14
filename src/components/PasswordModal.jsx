import React from "react";
import Modal from "./Modal"; 
import styled from "styled-components";
import { useState } from "react";

const PasswordModal = ({ isOpen, onConfirm, onCancel, onChange, passwordInput }) => {
  // eslint-disable-next-line
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleConfirm = () => {
    // 연동 전 데모 데이터
    const correctPassword = "example123";
    if (passwordInput === correctPassword) {
      setIsPasswordValid(true);
      onConfirm(); // 비밀번호가 맞으면 확인 동작 수행
    } else {
      setIsPasswordValid(false);
      window.alert("올바르지 않은 비밀번호입니다. 다시 시도하세요.");
    }
  };

  return (
    <StyledPasswordModal isOpen={isOpen} onClose={onCancel}>
      <ModalContent>
        <p>비밀번호를 입력하세요:</p>
        <PasswordInput type="password" value={passwordInput} onChange={onChange} />
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
      </ModalContent>
    </StyledPasswordModal>
  );
};

export default PasswordModal;

const StyledPasswordModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "SpoqaHanSansNeoLight";
`;

const ModalContent = styled.div`
  background-color: #D6DFE9;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const PasswordInput = styled.input`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const ConfirmButton = styled.button`
  background-color: #2F395A; 
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;
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
