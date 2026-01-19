/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useAtom, useStore } from "jotai";
import { currentUserIdAtom, resultsFamily } from "../../store/atoms";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [_, setUserId] = useAtom(currentUserIdAtom);
    const store = useStore();

    const navigate = useNavigate();

    const handleStart = () => {
        const name = inputValue.trim();
        if (name) {
            store.set(resultsFamily(name), []);
            setUserId(name);
            navigate('/test');
        }
    };

    return (
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h3 css={{
                marginBottom: '16px',
                fontSize: '24px',
                fontWeight: '500',
            }}>이름을 입력하세요.</h3>
            <input
                type="text"
                // placeholder="이름을 입력하세요."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                css={{
                    marginBottom: '8px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #b6b6b6',
                    width: '100%',
                    maxWidth: '300px',
                    fontSize: '16px',
                }}
            />
            <button onClick={handleStart} css={{
                padding: '10px 28px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '8px',
                backgroundColor: 'black',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
            }}>시작</button>
            <ol css={{
                marginTop: '16px',
                fontSize: '14px',
                color: '#888',
                paddingLeft: '20px',
            }}>
                <li>새로고침 시 처음으로 돌아가니 주의해주세요.</li>
                <li>시작 전 영상 관련 확장 프로그램(e.g. Video Speed<br/>Controller)을 반드시 전부 꺼주세요.</li>
            </ol>
        </div>
    );
};

export default StartPage;