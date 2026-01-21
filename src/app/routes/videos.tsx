/** @jsxImportSource @emotion/react */
import { useAtomValue } from "jotai";
import { currentUserIdAtom, resultsFamily } from "../../store/atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { videos, type Video } from "../../constants/videos";
import ReactPlayer from "react-player";

const VideosPage = () => {
    const userId = useAtomValue(currentUserIdAtom);
    const results = useAtomValue(resultsFamily(userId!));
    const navigate = useNavigate();

    if (!userId) {
        return <Navigate to="/" />;
    }

    const isVideoCompleted = (video: Video) => {
        return results[video.id] && results[video.id].length > 0;
    };

    return (
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            padding: '48px 32px',
        }}>
            <div css={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '40px',
            }}>
                <button
                    onClick={() => navigate('/result')}
                    css={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }}
                >
                    전체 결과 보기
                </button>
            </div>

            <div css={{
                width: '100%',
                maxWidth: '1200px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '24px',
            }}>
                {videos.map((video) => {
                    const completed = isVideoCompleted(video);
                    return (
                        <div
                            key={video.id}
                            css={{
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                border: '1px solid #e0e0e0',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
                                }
                            }}
                        >
                            <div css={{
                                width: '100%',
                                aspectRatio: '16/9',
                                backgroundColor: 'black',
                                position: 'relative',
                            }}>
                                <ReactPlayer
                                    src={video.link}
                                    width="100%"
                                    height="100%"
                                    playing={false}
                                    controls={false}
                                />
                                {completed && (
                                    <div css={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: '#7ccf00',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}>
                                        ✓ 완료
                                    </div>
                                )}
                            </div>
                            <div css={{
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}>
                                <button
                                    onClick={() => navigate(`/test?videoId=${video.id}`)}
                                    disabled={completed}
                                    css={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        backgroundColor: '#f2f2f2',
                                        color: completed ? '#999' : 'black',
                                        cursor: 'pointer',
                                        border: 'none',
                                        fontSize: '16px',
                                        fontWeight: '400',
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            backgroundColor: '#e2e2e2',
                                        },
                                        '&:disabled': {
                                            backgroundColor: '#f2f2f2',
                                            cursor: 'default',
                                        }
                                    }}
                                >
                                    {completed ? '완료' : '테스트 시작'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VideosPage;