import { createGlobalStyle } from "styled-components";
import SpoqaHanSansNeoBold from "./assets/font/SpoqaHanSansNeo-Bold.otf";
import SpoqaHanSansNeoLight from "./assets/font/SpoqaHanSansNeo-Light.otf";
import SpoqaHanSansNeoMedium from "./assets/font/SpoqaHanSansNeo-Medium.otf";
import SpoqaHanSansNeoRegular from "./assets/font/SpoqaHanSansNeo-Regular.otf";
import SpoqaHanSansNeoThin from "./assets/font/SpoqaHanSansNeo-Thin.otf";

const GlobalStyle = createGlobalStyle`
@font-face { 
  font-family: "SpoqaHanSansNeoBold";
  src: url(${SpoqaHanSansNeoBold}) format("opentype");
}
@font-face { 
  font-family: "SpoqaHanSansNeoLight";
  src: url(${SpoqaHanSansNeoLight}) format("opentype");
}

@font-face { 
  font-family: "SpoqaHanSansNeoMedium";
  src: url(${SpoqaHanSansNeoMedium}) format("opentype");
}

@font-face { 
  font-family: "SpoqaHanSansNeoRegular";
  src: url(${SpoqaHanSansNeoRegular}) format("opentype");
}

@font-face { 
  font-family: "SpoqaHanSansNeoThin";
  src: url(${SpoqaHanSansNeoThin}) format("opentype");
}


* {
    font-family: 'SpoqaHanSansNeoRegular';
    margin: 0px;
}
`;

export default GlobalStyle;
