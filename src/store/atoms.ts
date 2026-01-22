import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { atomFamily } from 'jotai-family'

export interface TestResult {
    trialIndex: number;
    videoId: string;
    speedA: string;
    speedB: string;
    selectedSpeed: string;
    correct: boolean;
}

export const currentUserIdAtom = atom<string | null>(null);

export const resultsFamily = atomFamily((userId: string) => atomWithStorage<Record<number, TestResult[]>>(`jnd-test-results-${userId}`, {}));

// Go 영상 전용 결과 atom
export const goResultsFamily = atomFamily((userId: string) => atomWithStorage<TestResult[]>(`jnd-go-test-results-${userId}`, []));