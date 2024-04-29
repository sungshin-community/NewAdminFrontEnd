import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import styled from "styled-components";
import Logo from "../assets/image/Logo.svg";
import EyeIconOff from "../assets/image/eye-off.png";
import EyeIconOn from "../assets/image/eye-on.png";
const BASE_URL = "http://15.165.252.35:1936";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //이미 로그인되어있는지 확인하는 로직
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const savedAutoLogin = localStorage.getItem("autoLogin") === "true";
    setAutoLogin(savedAutoLogin);
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  //로그인 로직
  const handleSubmit = async (e) => {
    e.preventDefault();
    //아이디나 비밀번호 미입력 시 에러
    if (!username || !password) {
      setErrorMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    //아이디와 비밀번호를 입력하여 로그인 요청하는 로직
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        username,
        password,
      });
      //로그인 성공 시,
      //응답 데이터 확인, 로컬 스토리지에 토큰들 저장, 인증 헤더 설정, 게시물 페이지로 이동
      console.log(response.data);
      console.log(autoLogin);
      setErrorMessage("");
      const hashed = await bcrypt.hash(password, 10);
      //console.log(bcrypt.hash(password, 10));
      localStorage.setItem("ID", username);
      localStorage.setItem("hashed", hashed);
      localStorage.setItem("autoLogin", autoLogin.toString());
      localStorage.setItem(
        "accessToken",
        response.data.data.tokenDto.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        response.data.data.tokenDto.refreshToken
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.tokenDto.accessToken}`;
      console.log(axios.defaults.headers.common.Authorization);
      navigate("/");
      //로그인 에러 처리 로직
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("아이디와 비밀번호를 정확하게 입력해주세요.");
      } else {
        setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
        console.log("Error", error.message);
      }
    }
  };

  //액세스 토큰 재발급 로직
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const isAutoLoginPossible = localStorage.getItem("autoLogin") === "true";
      if (
        isAutoLoginPossible &&
        error.response.status === 401 &&
        !error.config._retry
      ) {
        error.config._retry = true;
        try {
          const tokenResponse = await axios.post(
            `${BASE_URL}/auth/reissue-token`,
            {
              accessToken: localStorage.getItem("accessToken"),
              refreshToken: localStorage.getItem("refreshToken"),
            }
          );
          localStorage.setItem(
            "accessToken",
            tokenResponse.data.data.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            tokenResponse.data.data.refreshToken
          );
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${tokenResponse.data.data.accessToken}`;
          return axios(error.config);
        } catch (reissueError) {
          console.error("Token Expired. Redirecting to login page.");
          window.alert(
            "토큰이 만료되었습니다. 로그인 페이지로 리다이렉트합니다."
          );
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("autoLogin");
          localStorage.removeItem("hashed");
          navigate("/login"); //리프레시 토큰 만료 시 토큰 삭제 후 로그인 페이지로 리다이렉트
          return Promise.reject(reissueError);
        }
      }
      return Promise.reject(error);
    }
  );

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

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Background>
      <LoginFormWrap>
        <LogoImg src={Logo} alt="수정광산 로고" />
        <AdminText>수정광산 관리자 페이지</AdminText>
        <DetailText>
          함께 성장하고 같이 연대하는
          <br />
          우리만의 공간
        </DetailText>
        <form onSubmit={handleSubmit}>
          <InputWrap>
            <IDInput
              placeholder="ID"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={25}
              hasError={errorMessage}
            ></IDInput>
            <PWInputWrap>
              <PWInput
                placeholder="PW"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={25}
                hasError={errorMessage}
              ></PWInput>
              {showPassword ? (
                <EyeButton src={EyeIconOn} onClick={handlePasswordToggle} />
              ) : (
                <EyeButton src={EyeIconOff} onClick={handlePasswordToggle} />
              )}
            </PWInputWrap>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          </InputWrap>
          <AutoLoginWrap>
            <CheckInput
              type="checkbox"
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
            ></CheckInput>
            <CheckLabel>자동 로그인</CheckLabel>
          </AutoLoginWrap>
          {autoLogin && (
            <CheckText>
              자동 로그인 진행시, 로그인 상태는 30일동안 유지됩니다.
            </CheckText>
          )}
          <LoginButton type="submit">로그인</LoginButton>
        </form>
      </LoginFormWrap>
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

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
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

const PWInputWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PWInput = styled.input`
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
  bottom: 15px;
  right: 15px;
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const ErrorText = styled.text`
  font-size: 14px;
  color: red;
  margin-top: 3px;
`;

const AutoLoginWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 25px;
  margin-botton: 25px;
`;

const CheckInput = styled.input`
  width: 20px;
  height: 20px;
  outline: 1px solid #d6dfe9;
  border-radius: none;
  accent-color: #a055ff;
`;

const CheckLabel = styled.text`
  color: gray;
  font-size: 15px;
`;

const CheckText = styled.div`
  font-size: 14px;
  color: #a055ff;
  margin-top: 10px;
  margin-botton: 10px;
`;

const LoginButton = styled.button`
  width: 340px;
  height: 50px;
  margin-top: 25px;
  font-size: 18px;
  background-color: #979cac;
  color: white;
  border: none;

  &:hover {
    background-color: #2f395a;
  }
`;
