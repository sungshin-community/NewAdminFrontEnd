import React from "react";
import styled from "styled-components";
import Button from "./Button";

export default function Writing() {
  return (
    <WritingWrap>
      <StyledHeading>게시글 작성</StyledHeading>
      <div className="Write">
        <input id="title_txt" placeholder='제목을 입력하세요.' type="text" />
      </div>

      <div className="Write">
        <textarea id='content_txt' placeholder='내용을 입력하세요.'></textarea>
      </div>
      <ButtonWrap1>
        <Button width="120px" height="28px" fontSize="14px">
          취소
        </Button>
        <Button width="120px" height="28px" fontSize="14px">
          등록하기
        </Button>
      </ButtonWrap1>
    </WritingWrap>
  );
}

const StyledHeading = styled.h3`
  font-family: "SpoqaHanSansNeoLight";
  margin-top: 30px;
  margin-left: 25px;
`;

const ButtonWrap1 = styled.div`
  margin-left: auto;
  margin-right: 60px;
  display: flex;
  gap: 8px; /* Adjust the gap as needed */
  justify-content: flex-end; /* Align buttons to the right */
`;

const WritingWrap = styled.div`
  background-color: #FBFCFE;
  height: 100vh;
  width: 692px;
  padding: 20px;
  .Write {
    padding: 15px;
    padding-left: 30px;
    margin-top: 10px;

    input,
    textarea {
      width: 91%;
      padding-bottom: 30px;
      resize: none;
     
      border: none;
      font-size: 15px;
      font-family: "SpoqaHanSansNeoLight";
      border: 1px solid #ababab;
      border-bottom: solid 1px #ababab;
      font-weight: bold;
      background-color: #f6f9fd;
      &:focus {
        outline: none;
      }
      &::placeholder {
        font-size: 16px; 
      }
    }

    textarea {
      height: 300px; /* Adjust height as needed */
    }
  }
`;
