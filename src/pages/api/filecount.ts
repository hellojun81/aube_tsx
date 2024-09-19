import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// 폴더 내 파일 개수를 반환하는 함수
const getFileCountInFolder = (folderPath: string): number => {
  try {
    const files = fs.readdirSync(folderPath);
    const fileCount = files.filter(file => fs.statSync(path.join(folderPath, file)).isFile()).length;
    return fileCount;
  } catch (error) {
    console.error('Error reading directory:', error);
    return 0;
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS 설정 (필요에 따라 추가)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    // 특정 폴더의 파일 개수를 확인
    const folderPath = path.join(process.cwd(), 'public', '1floor', 'height'); // 실제 경로 설정
    const fileCount = getFileCountInFolder(folderPath);
    
    // 파일 개수 응답
    return res.status(200).json({ fileCount: fileCount });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
