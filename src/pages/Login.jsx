import React, { useState } from "react";
//import axios from "axios";
import styled from "styled-components";
import Logo from "../assets/image/Logo.svg";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    } else {
      setErrorMessage('');
    }
  }

    //api 연동 시 사용할 부분
    /*try {
      const response = await axios.post('https://api-endpoint/login', {
        username,
        password,
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage('아이디와 비밀번호를 정확하게 입력해주세요.');
      } else {
        console.log('Error', error.message);
      }
    }
  };*/

  return (
    <Background>
      <LoginFormWrap>
        <LogoImg src={Logo} alt="수정광산 로고"/>
        <AdminText>수정광산 관리자 페이지</AdminText>
        <DetailText>함께 성장하고 같이 연대하는<br/>우리만의 공간</DetailText>
       <form onSubmit={handleSubmit}>
        <InputWrap>
          <IDInput 
            placeholder="ID"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={25}
            hasError={errorMessage}>
          </IDInput>
          <PWInput
          placeholder="PW"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={25}
          hasError={errorMessage}>
          </PWInput>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </InputWrap>
        <AutoLoginWrap>
          <CheckInput
            type="checkbox"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}>
          </CheckInput>
          <CheckLabel>
          자동 로그인
          </CheckLabel>
        </AutoLoginWrap>
        {autoLogin && <CheckText>자동 로그인 진행시, 로그인 상태는 30일동안 유지됩니다.</CheckText>}
      <LoginButton type="submit">로그인</LoginButton>
    </form>
    </LoginFormWrap>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #F6F9FD;
`;

const LoginFormWrap = styled.div`
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

const AdminText = styled.text`
  color: #A055FF;
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

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const IDInput = styled.input`
  width: 330px;
  height: 35px;
  border: 1px solid ${props => props.hasError ? "red" : "#D6DFE9"};
  padding: 5px;

  &:focus {
    border: 1px solid #A055FF;
  }
  &::placeholder {
    font-size: 15px;
    padding: 5px;
  }
`;

const PWInput = styled.input`
  width: 330px;
  height: 35px;
  border: 1px solid ${props => props.hasError ? "red" : "#D6DFE9"};
  padding: 5px;

  &:focus {
    border-color: 1px solid #A055FF;
  }
  &::placeholder {
    font-size: 15px;
    padding: 5px;
  }
`;

const ErrorText = styled.text`
  font-size: 14px;
  color: red;
  margin-top: 3px;
`

const AutoLoginWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 25px;
  margin-botton: 25px;
`

const CheckInput = styled.input`
  width: 20px;
  height: 20px;
  outline: 1px solid #D6DFE9;
  border-radius: none;
  accent-color: #A055FF;
`

const CheckLabel = styled.text`
  color: gray;
  font-size: 15px;
`

const CheckText = styled.div`
  font-size: 14px;
  color: #A055FF;
  margin-top: 10px;
  margin-botton: 10px;
`

const LoginButton = styled.button`
  width: 340px;
  height: 50px;
  margin-top: 25px;
  font-size: 18px;
  background-color: #979CAC;
  color: white;
  border: none;

  &:hover {
    background-color: #2F395A;
  }
`
