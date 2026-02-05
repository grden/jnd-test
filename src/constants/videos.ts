export type Video = {
    id: number;
    name: string;
    link: string;
    start: number;
    duration: number;
}

export const videos: Video[] = [
    {
        id: 1,
        name: "오버워치",
        link: "/videos/visual_high_speech_high.mp4",
        start: 0,
        duration: 10
    },
    {
        id: 2,
        name: "카메라",
        link: "/videos/visual_high_speech_low.mp4",
        start: 0,
        duration: 8
    },
    {
        id: 3,
        name: "연못구름",
        link: "/videos/visual_high_speech_mid.mp4",
        start: 0,
        duration: 10
    },
    {
        id: 4,
        name: "농구",
        link: "/videos/visual_low_speech_high.mp4",
        start: 0,
        duration: 10
    },
    {
        id: 5,
        name: "향수",
        link: "/videos/visual_low_speech_low.mp4",
        start: 0,
        duration: 10
    },
    {
        id: 6,
        name: "보험",
        link: "/videos/visual_low_speech_mid.mp4",
        start: 0,
        duration: 10
    },
    {
        id: 7,
        name: "과르디올라",
        link: "/videos/visual_mid_speech_high.mp4",
        start: 0,
        duration: 10
    },
    {
        id: 8,
        name: "야닝야닝",
        link: "/videos/visual_mid_speech_low.mp4",
        start: 0,
        duration: 10
    },
    {
        id: 9,
        name: "뉴스",
        link: "/videos/visual_mid_speech_mid.mp4",
        start: 0,
        duration: 10
    },
]

export const goVideo: Video[] = [
    {
        id: 1,
        name: "고재영",
        link: "/videos/v1h1.mp4",
        start: 0,
        duration: 7
    },
]

export const gradualVidoes: Video[] = [
    {
        id: 1,
        name: "aaa",
        link: "/videos/gradual/aaa_crop.mp4",
        start: 0,
        duration: 9
    },
    {
        id: 2,
        name: "bbb",
        link: "/videos/gradual/bbb_crop.mp4",
        start: 0,
        duration: 9
    },
    {
        id: 3,
        name: "ccc",
        link: "/videos/gradual/ccc.mp4",
        start: 0,
        duration: 6
    },
    {
        id: 4,
        name: "ddd",
        link: "/videos/gradual/ddd.mp4",
        start: 0,
        duration: 8
    },
]