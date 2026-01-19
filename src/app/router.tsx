import { Routes, Route } from "react-router-dom";
import VideoTestPage from "./routes/test";
import StartPage from "./routes/start";
import ResultPage from "./routes/result";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/test" element={<VideoTestPage />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    );
};

export default AppRoutes;