import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import ResetPW from "./pages/ResetPW";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/resetPW" element={<ResetPW />} />
      </Routes>
    </div>
  );
}

export default App;
