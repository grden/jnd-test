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