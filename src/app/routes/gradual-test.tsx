/** @jsxImportSource @emotion/react */

import { useState, useEffect, useRef } from "react"
import { gradualVidoes, type Video } from "../../constants/videos"
import { Navigate, useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"

const GradualTestContent = ({ video, videoIndex }: { video: Video, videoIndex: number }) => {
    const [playbackRate, setPlaybackRate] = useState(1.00);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const playerRef = useRef<any>(null);
    const intervalRef = useRef<number | null>(null);
    const navigate = useNavigate();

    const startTime = video.start;
    const videoSRC = `${video.link}#t=${startTime}`;

    // Calculate interval: duration / 6 seconds
    const intervalDuration = (video.duration / 6) * 1000; // Convert to milliseconds

    const startGradualPlayback = () => {
        setIsPlaying(true);
        setPlaybackRate(1.00);

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        let currentRate = 1.00;
        const increment = 0.03;
        const maxRate = 1.15;

        // Set interval to increase playback rate
        intervalRef.current = setInterval(() => {
            currentRate += increment;
            if (currentRate > maxRate) {
                currentRate = maxRate;
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }
            setPlaybackRate(Number(currentRate.toFixed(2)));
        }, intervalDuration);
    };

    const handleNext = () => {
        // Clean up interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Move to next video or back to videos page
        if (videoIndex < gradualVidoes.length - 1) {
            navigate(`/gradual-test?videoIndex=${videoIndex + 1}`);
        } else {
            navigate('/');
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

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
                maxWidth: '1200px',
                gap: '12px',
            }}>
                <button
                    onClick={startGradualPlayback}
                    css={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        backgroundColor: '#f2f2f2',
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
                    disabled={!isReady || isPlaying}
                >
                    재생하기 ▶
                </button>
                <button
                    onClick={handleNext}
                    css={{
                        // alignSelf: 'end',
                        // marginTop: '32px',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '10px',
                        backgroundColor: 'black',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                        // fontWeight: '600',
                    }}
                >
                    다음
                </button>
                <span css={{
                    fontSize: '24px',
                    color: 'white',
                }}>
                    {playbackRate.toFixed(2)}x
                </span>
            </span>

            <div css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1200px',
                gap: '16px',
            }}>
                <div css={{
                    width: '100%',
                    backgroundColor: 'black',
                    aspectRatio: '16/9',
                }}>
                    <ReactPlayer
                        ref={playerRef}
                        key={`${video.link}-${videoIndex}`}
                        src={videoSRC}
                        playing={isPlaying}
                        controls={false}
                        width="100%"
                        height="100%"
                        onReady={() => {
                            setIsReady(true);
                        }}
                        playbackRate={playbackRate}
                        onEnded={handleVideoEnd}
                    />
                </div>

                {/* <div css={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '12px',
                }}>
                    <span css={{
                        fontSize: '18px',
                        fontWeight: '500',
                    }}>
                        현재 배속:
                    </span>
                    <span css={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#2563eb',
                    }}>
                        {playbackRate.toFixed(2)}x
                    </span>
                </div> */}
            </div>
        </div>
    );
}

const GradualTestPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const videoIndexParam = searchParams.get('videoIndex');

    const videoIndex = videoIndexParam ? parseInt(videoIndexParam) : 0;
    const video = gradualVidoes[videoIndex];

    if (!video) {
        return <Navigate to="/" />;
    }

    return (
        <GradualTestContent
            key={videoIndex}
            video={video}
            videoIndex={videoIndex}
        />
    );
}

export default GradualTestPage;
