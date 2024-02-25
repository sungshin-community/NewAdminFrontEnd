import React from "react";
import styled from "styled-components";
import Logo from "../assets/image/Logo.svg";
import SideBarTab from "./SideBarTab";
export default function SideBar() {
  return (
    <SideBarWrap>
      <LogoImg src={Logo} alt="수정광산 로고" />
      <SideBarTab />
    </SideBarWrap>
  );
}

const SideBarWrap = styled.div`
  width: 238px;
  height: 100vh;
  background-color: #f6f9fd;
`;

const LogoImg = styled.img`
  margin: 48px 0px 48px 30px;
`;
