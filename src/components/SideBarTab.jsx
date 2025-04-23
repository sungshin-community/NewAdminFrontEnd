import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const BASE_URL = "http://admin-api.crystalmine.kr";

export default function SideBarTab() {
  const navigate = useNavigate();

  //로그아웃 로직
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await axios.get(
        `${BASE_URL}/auth/signout?refresh-token=${refreshToken}`
      );
      console.log(response.data);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("hashed");
      localStorage.removeItem("autoLogin");
      navigate("/login");
    } catch (error) {
      alert("토큰 정보를 찾을 수 없어 로그아웃 실패");
      console.log("Error", error.message);
    }
  };

  const moveToResetPW = () => {
    navigate("/resetPW");
  };

  return (
    <>
      <SideBarTabWrap>
        <TabText>작성 게시글 관리</TabText>
      </SideBarTabWrap>
      <ResetPWButton onClick={moveToResetPW}>비밀번호 변경</ResetPWButton>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </>
  );
}

const SideBarTabWrap = styled.div`
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: #f6efff;
  display: flex;
`;

const TabText = styled.div`
  font-size: 17px;
  color: #a055ff;
  margin-left: 32px;
`;

const LogoutButton = styled.button`
  font-size: 17px;
  color: #979cac;
  position: relative;
  top: 620px;
  margin-left: 32px;
  border: none;
  background-color: #f6f9fd;
  cursor: pointer;
  &:hover {
    color: #2f395a;
  }
`;

const ResetPWButton = styled.button`
  font-size: 17px;
  color: #979cac;
  position: relative;
  top: 610px;
  margin-left: 32px;
  margin-bottom: 20px;
  border: none;
  background-color: #f6f9fd;
  cursor: pointer;
  &:hover {
    color: #2f395a;
  }
`;
