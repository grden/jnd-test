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

// Storage validation helper
const createValidatedStorage = <T,>(key: string, initialValue: T) => {
    return atomWithStorage<T>(
        key, 
        initialValue,
        {
            getItem: (key, initialValue) => {
                try {
                    const storedValue = localStorage.getItem(key);
                    if (storedValue === null) {
                        return initialValue;
                    }
                    const parsed = JSON.parse(storedValue);
                    
                    // Validate structure for Record<number, TestResult[]>
                    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
                        return parsed as T;
                    }
                    
                    // Invalid data, return initial value
                    console.warn(`Invalid data in localStorage for key ${key}, resetting to initial value`);
                    localStorage.removeItem(key);
                    return initialValue;
                } catch (error) {
                    console.error(`Error reading from localStorage for key ${key}:`, error);
                    localStorage.removeItem(key);
                    return initialValue;
                }
            },
            setItem: (key, value) => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (error) {
                    console.error(`Error writing to localStorage for key ${key}:`, error);
                }
            },
            removeItem: (key) => {
                try {
                    localStorage.removeItem(key);
                } catch (error) {
                    console.error(`Error removing from localStorage for key ${key}:`, error);
                }
            }
        }
    );
};

export const resultsFamily = atomFamily((userId: string) => 
    createValidatedStorage<Record<number, TestResult[]>>(`jnd-test-results-2-${userId}`, {})
);

// Storage validation helper for arrays
const createValidatedArrayStorage = (key: string) => {
    return atomWithStorage<TestResult[]>(
        key,
        [],
        {
            getItem: (key, initialValue) => {
                try {
                    const storedValue = localStorage.getItem(key);
                    if (storedValue === null) {
                        return initialValue;
                    }
                    const parsed = JSON.parse(storedValue);
                    
                    // Validate structure for TestResult[]
                    if (Array.isArray(parsed)) {
                        return parsed as TestResult[];
                    }
                    
                    // Invalid data, return initial value
                    console.warn(`Invalid data in localStorage for key ${key}, resetting to initial value`);
                    localStorage.removeItem(key);
                    return initialValue;
                } catch (error) {
                    console.error(`Error reading from localStorage for key ${key}:`, error);
                    localStorage.removeItem(key);
                    return initialValue;
                }
            },
            setItem: (key, value) => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (error) {
                    console.error(`Error writing to localStorage for key ${key}:`, error);
                }
            },
            removeItem: (key) => {
                try {
                    localStorage.removeItem(key);
                } catch (error) {
                    console.error(`Error removing from localStorage for key ${key}:`, error);
                }
            }
        }
    );
};

// Go 영상 전용 결과 atom
export const goResultsFamily = atomFamily((userId: string) => 
    createValidatedArrayStorage(`jnd-go-test-results-2-${userId}`)
);