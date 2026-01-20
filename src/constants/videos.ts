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
        name: "최강록",
        link: "videos/v0h0.mp4",
        start: 45,
        duration: 10
    },
    {
        id: 2,
        name: "노홍철",
        link: "videos/v1h2.mp4",
        start: 10,
        duration: 8
    },
    {
        id: 3,
        name: "문호준",
        link: "videos/v2h2.mp4",
        start: 85,
        duration: 10
    },
    {
        id: 4,
        name: "안세영",
        link: "videos/v2h1.mp4",
        start: 50,
        duration: 10
    },
    {
        id: 5,
        name: "후덕죽",
        link: "videos/v2h0.mp4",
        start: 10,
        duration: 10
    },
]