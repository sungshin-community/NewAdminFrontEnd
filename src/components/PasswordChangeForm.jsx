import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import EyeIconOff from "../assets/image/eye-off.png";
import EyeIconOn from "../assets/image/eye-on.png";
const BASE_URL = "http://crystalmineadmindev.o-r.kr";

export default function PasswordChangeForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setIsError(true);
    } else {
      axios
        .patch(`${BASE_URL}/mypage/password`, { password: newPassword })
        .then((response) => {
          alert("비밀번호가 변경되었습니다.");
          navigate("/");
        })
        .catch((error) => {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
          navigate("/");
        });
    }
  };

  //서버로 보내는 모든 요청에 액세스 토큰을 포함하는 로직
  axios.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem("accessToken");
      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleNewPasswordToggle = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <PWInputWrap>
        <NewPWInput
          placeholder="PW"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          maxLength={25}
          hasError={isError}
        />
        {showNewPassword ? (
          <EyeButton src={EyeIconOn} onClick={handleNewPasswordToggle} />
        ) : (
          <EyeButton src={EyeIconOff} onClick={handleNewPasswordToggle} />
        )}
        <ConfirmPWInput
          placeholder="PW 확인"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={25}
          hasError={isError}
        />
        {showConfirmPassword ? (
          <EyeButton2 src={EyeIconOn} onClick={handleConfirmPasswordToggle} />
        ) : (
          <EyeButton2 src={EyeIconOff} onClick={handleConfirmPasswordToggle} />
        )}
      </PWInputWrap>
      <ResetButton onClick={handleResetPassword}>변경 완료</ResetButton>
      <CancelButton onClick={handleCancel}>취소</CancelButton>
    </>
  );
}

const PWInputWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const NewPWInput = styled.input`
  width: 330px;
  height: 35px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#D6DFE9")};
  padding: 5px;

  &:focus {
    border-color: 1px solid #a055ff;
  }
  &::placeholder {
    font-size: 15px;
    padding: 5px;
  }
`;

const ConfirmPWInput = styled.input`
  width: 330px;
  height: 35px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#D6DFE9")};
  padding: 5px;

  &:focus {
    border-color: 1px solid #a055ff;
  }
  &::placeholder {
    font-size: 15px;
    padding: 5px;
  }
`;

const EyeButton = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const EyeButton2 = styled.img`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  width: 340px;
  height: 50px;
  margin-top: 50px;
  font-size: 18px;
  background-color: #979cac;
  color: white;
  border: none;

  &:hover {
    background-color: #2f395a;
  }
`;

const CancelButton = styled.button`
  width: 340px;
  height: 50px;
  margin-top: 10px;
  font-size: 18px;
  background-color: #fff;
  color: #2f395a;
  border: none;

  &:hover {
    background-color: #2f395a;
    color: white;
  }
`;
