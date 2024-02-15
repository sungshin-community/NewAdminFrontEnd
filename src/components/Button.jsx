import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled.button`
  width: ${(props) => props.width || "145px"};
  height: ${(props) => props.height || "44px"};

  background-color: #2f395a;
  font-family: "SpoqaHanSansNeoLight";
  border: none;
  color: white;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
`;
