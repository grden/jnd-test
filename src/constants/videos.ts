export type Video = {
    id: number;
    name?: string;
    link: string;
    start: number;
}

export const videos: Video[] = [
    {
        id: 1,
        link: "videos/go.mp4",
        start: 171
    },
]