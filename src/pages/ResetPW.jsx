import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/image/Logo.svg";
import PasswordChangeForm from "../components/PasswordChangeForm";

export default function ResetPW() {
  const [inputID, setInputID] = useState("");
  const [showPWForm, setShowPWForm] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  const handleNextClick = () => {
    const storedID = localStorage.getItem("ID");
    if (inputID !== storedID) {
      setIsError(true);
    } else {
      setIsError(false);
      setShowPWForm(true);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Background>
      <FormWrap>
        <LogoImg src={Logo} alt="수정광산 로고" />
        <TitleText>비밀번호 변경</TitleText>
        {!showPWForm ? (
          <>
            <DetailText>
              수정광산 관리자 계정으로 가입했던
              <br />
              아이디를 입력하여 주세요.
            </DetailText>
            <IDInput
              placeholder="ID"
              type="text"
              value={inputID}
              onChange={(e) => setInputID(e.target.value)}
              maxLength={25}
              hasError={isError}
            />
            <NextButton onClick={handleNextClick}>다음</NextButton>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
          </>
        ) : (
          <>
            <DetailText>새로운 비밀번호를 입력해주세요.</DetailText>
            <PasswordChangeForm />
          </>
        )}
      </FormWrap>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f6f9fd;
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 660px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`;

const TitleText = styled.text`
  color: #a055ff;
  font-size: 23px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DetailText = styled.text`
  color: #222222;
  font-size: 15px;
  text-align: center;
  margin-bottom: 50px;
`;

const IDInput = styled.input`
  width: 330px;
  height: 35px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#D6DFE9")};
  padding: 5px;

  &:focus {
    border: 1px solid #a055ff;
  }
  &::placeholder {
    font-size: 15px;
    padding: 5px;
  }
`;

const NextButton = styled.button`
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
