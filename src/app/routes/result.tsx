/** @jsxImportSource @emotion/react */
import { useAtomValue } from "jotai";
import { currentUserIdAtom, resultsFamily } from "../../store/atoms";
import { Navigate, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResultPage = () => {
    const userId = useAtomValue(currentUserIdAtom);
    const results = useAtomValue(resultsFamily(userId!));

    const navigate = useNavigate();

    if (!userId || !results) {
        return <Navigate to="/" />;
    }

    const downloadCSV = () => {
        if (results.length === 0) {
            alert("저장할 데이터가 없습니다.");
            return;
        }

        // CSV 헤더 만들기
        const headers = ['Trial Index', 'Video', 'Selected', 'Speed A', 'Speed B', 'Timestamp'];

        // 데이터 행 만들기
        const rows = results.map(r => [
            r.trialIndex + 1,
            r.videoId,
            r.selectedSpeed,
            r.speedA,
            r.speedB,
            r.correct ? '1' : '0'
        ]);

        // CSV 문자열 조합
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // 파일 다운로드 트리거
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `jnd-test-results-${userId}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <h3 css={{ marginBottom: '30px', color: 'black' }}>참여자: {userId}</h3>

            <TableContainer component={Paper} css={{ maxWidth: 800, marginBottom: 40 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#fafafa' }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>#</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Speed A</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Speed B</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Video Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row) => (
                            <TableRow
                                key={row.trialIndex}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.trialIndex + 1}
                                </TableCell>
                                <TableCell align="center" sx={{
                                    backgroundColor: row.speedA === row.selectedSpeed && row.correct ? '#7ccf00' : row.speedA === row.selectedSpeed && !row.correct ? '#ff6467' : '',
                                }}>
                                    {row.speedA}
                                </TableCell>
                                <TableCell align="center" sx={{
                                    backgroundColor: row.speedB === row.selectedSpeed && row.correct ? '#7ccf00' : row.speedB === row.selectedSpeed && !row.correct ? '#ff6467' : '',
                                }}>
                                    {row.speedB}
                                </TableCell>
                                <TableCell align="left" sx={{ color: '#888' }}>
                                    {row.videoId}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <span css={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => {
                    downloadCSV();
                }} css={{
                    width: '200px',
                    height: '48px',
                    border: '1px solid #b6b6b6',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                }}>CSV 다운로드</button>
                <button onClick={() => {
                    navigate('/');
                }} css={{
                    width: '200px',
                    height: '48px',
                    border: 'none',
                    borderRadius: '12px',
                    backgroundColor: 'black',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                }}>처음으로</button>
            </span>
        </div>
    );
};

export default ResultPage;