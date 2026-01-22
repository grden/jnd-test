import { Routes, Route } from "react-router-dom";
import VideoTestPage from "./routes/test";
import GoVideoTestPage from "./routes/go";
import StartPage from "./routes/start";
import ResultPage from "./routes/result";
import GoResultPage from "./routes/goresult";
import VideosPage from "./routes/videos";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/go" element={<GoVideoTestPage />} />
            <Route path="/test" element={<VideoTestPage />} />
            <Route path="/goresult" element={<GoResultPage />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    );
};

export default AppRoutes;