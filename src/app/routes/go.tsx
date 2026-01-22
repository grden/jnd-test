/** @jsxImportSource @emotion/react */

import { useState } from "react"
import { goVideo, type Video } from "../../constants/videos"
import { speeds } from "../../constants/speed"
import { useAtom, useAtomValue } from "jotai"
import { currentUserIdAtom, goResultsFamily } from "../../store/atoms"
import { Navigate, useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"

const generateVideoTestSet = (video: Video, speeds: string[][]): { video: Video, speed: string[] }[] => {
    const videoTestSet: { video: Video, speed: string[] }[] = [];

    // shuffle speeds
    const shuffledSpeeds = shuffleList(speeds);

    shuffledSpeeds.forEach((speed) => {
        videoTestSet.push({
            video: video,
            speed: speed
        });
    });

    return videoTestSet;
};

const shuffleList = (list: string[][]) => {
    const newList = [...list];

    for (let i = newList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newList[i], newList[j]] = [newList[j], newList[i]];
    }

    return newList;
};

const checkCorrect = (speedA: string, speedB: string, selectedSpeed: string) => {
    const maxSpeed = Math.max(Number(speedA), Number(speedB));
    return Number(selectedSpeed) === maxSpeed;
}


const GoVideoTestPage = () => {
    const userId = useAtomValue(currentUserIdAtom);
    const navigate = useNavigate();

    if (!userId) {
        return <Navigate to="/" />;
    }

    const video = goVideo[0];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoTestSet] = useState<{ video: Video, speed: string[] }[]>(() => {
        return generateVideoTestSet(video, speeds);
    });
    const [selected, setSelected] = useState<string | null>(null);
    const [results, setResults] = useAtom(goResultsFamily(userId));

    const startTime = videoTestSet[currentIndex].video.start;
    // const endTime = videoTestSet[currentIndex].video.start + 10;
    // const playDuration = videoTestSet[currentIndex].video.duration;

    const [isReady, setIsReady] = useState<number>(0);
    const [playStatus, setPlayStatus] = useState<'pre' | 'in' | 'A' | 'B' | 'post'>('pre');

    const handleNext = () => {
        if (!selected) return;

        const newResult = {
            trialIndex: currentIndex,
            videoId: videoTestSet[currentIndex].video.name,
            speedA: videoTestSet[currentIndex].speed[0],
            speedB: videoTestSet[currentIndex].speed[1],
            selectedSpeed: selected!,
            correct: checkCorrect(videoTestSet[currentIndex].speed[0], videoTestSet[currentIndex].speed[1], selected!),
        };

        // Update results array with validation
        const safeResults = Array.isArray(results) ? results : [];
        setResults([...safeResults, newResult]);

        setSelected(null);

        if (currentIndex < videoTestSet.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setPlayStatus('pre');
            setIsReady(0);
        } else {
            navigate('/goresult');
        }
    }

    return (
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '32px',
        }}>
            <span css={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                marginBottom: '32px',
                gap: '12px',
            }}>
                <h1 css={{
                    fontSize: '24px',
                    fontWeight: '600',
                    textAlign: 'start',
                }}>({currentIndex + 1}/{videoTestSet.length}) 두 영상 중 더 빠른 영상을 선택하세요.</h1>
                <button
                    onClick={() => {
                        setPlayStatus('A');
                    }}
                    css={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        backgroundColor: 'f2f2f2',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        '&:hover': {
                            backgroundColor: '#e2e2e2',
                        },
                        '&:disabled': {
                            backgroundColor: '#f2f2f2',
                            cursor: 'default',
                        }
                    }}
                    disabled={playStatus !== 'pre' || isReady !== 2}
                >
                    재생하기 ▶
                </button>
            </span>


            <div css={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: '16px',
            }} key={currentIndex}>
                <span css={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <h3 css={{
                        fontSize: '24px',
                        fontWeight: '500',
                        textAlign: 'center',
                        marginBottom: '8px',
                    }}>A</h3>
                    <div css={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        aspectRatio: '16/9',
                    }}>
                        <ReactPlayer
                            key={`A-${videoTestSet[currentIndex].video.link}-${currentIndex}`}
                            src={`${videoTestSet[currentIndex].video.link}#t=${startTime}`}
                            playing={playStatus === 'A'}
                            controls={false}
                            width="100%"
                            height="100%"
                            onReady={() => {
                                setIsReady(prev => prev + 1);
                            }}
                            playbackRate={Number(videoTestSet[currentIndex].speed[0])}
                            onStart={() => {
                                if (playStatus !== 'A') return;

                                // 실제 재생 시간 계산: (영상길이 / 배속) * 1000ms
                                const playDuration = (videoTestSet[currentIndex].video.duration / Number(videoTestSet[currentIndex].speed[0])) * 1000;

                                setTimeout(() => {
                                    setPlayStatus('in');
                                    setTimeout(() => setPlayStatus('B'), 1000);
                                }, playDuration);
                            }}
                        />
                    </div>
                    <button onClick={() => { setSelected(videoTestSet[currentIndex].speed[0]); }} css={{
                        width: '100%',
                        marginTop: '8px',
                        height: '48px',
                        borderRadius: '10px',
                        backgroundColor: '#f2f2f2',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'semibold',
                        '&:hover': {
                            backgroundColor: '#e2e2e2',
                        },
                        '&:focus': {
                            backgroundColor: '#e2e2e2',
                            border: '1px solid #b0b0b0',
                        }
                    }}>A가 더 빨랐다.</button>
                </span>

                <span css={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <h3 css={{
                        fontSize: '24px',
                        fontWeight: '500',
                        textAlign: 'center',
                        marginBottom: '8px',
                    }}>B</h3>
                    <div css={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        aspectRatio: '16/9',
                    }}>
                        <ReactPlayer
                            key={`B-${videoTestSet[currentIndex].video.link}-${currentIndex}`}
                            src={`${videoTestSet[currentIndex].video.link}#t=${startTime}`}
                            playing={playStatus === 'B'}
                            controls={false}
                            width="100%"
                            height="100%"
                            playbackRate={Number(videoTestSet[currentIndex].speed[1])}
                            onReady={() => {
                                setIsReady(prev => prev + 1);
                            }}
                            onStart={() => {
                                if (playStatus !== 'B') return;

                                // 실제 재생 시간 계산: (영상길이 / 배속) * 1000ms
                                const realDuration = (videoTestSet[currentIndex].video.duration / Number(videoTestSet[currentIndex].speed[1])) * 1000;

                                setTimeout(() => {
                                    setPlayStatus('post');
                                }, realDuration);
                            }}
                        />
                    </div>
                    <button onClick={() => { setSelected(videoTestSet[currentIndex].speed[1]); }} css={{
                        width: '100%',
                        marginTop: '8px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: '#f2f2f2',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'semibold',
                        '&:hover': {
                            backgroundColor: '#e2e2e2',
                        },
                        '&:focus': {
                            backgroundColor: '#e2e2e2',
                            border: '1px solid #b6b6b6',
                        }
                    }}>B가 더 빨랐다.</button>
                </span>
            </div>

            <button onClick={handleNext} disabled={!selected || playStatus !== 'post'} css={{
                width: '200px',
                alignSelf: 'end',
                marginTop: '32px',
                height: '48px',
                border: selected && playStatus === 'post' ? 'none' : '1px solid #e2e2e2',
                borderRadius: '12px',
                backgroundColor: selected && playStatus === 'post' ? 'black' : 'white',
                color: selected && playStatus === 'post' ? 'white' : '#b6b6b6',
                cursor: selected && playStatus === 'post' ? 'pointer' : 'default',
                fontSize: '16px',
                fontWeight: '600',
            }}>다음</button>

        </div>
    );
}

export default GoVideoTestPage;