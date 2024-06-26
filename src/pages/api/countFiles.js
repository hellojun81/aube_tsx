import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // 폴더 경로를 요청에서 받거나 기본값 지정
  const folderPath = req.query.folder || 'public/images';

  // 절대 경로 계산
  const dir = path.join(process.cwd(), folderPath);

  try {
    // 동기적으로 폴더 내 파일 목록 읽기
    const files = fs.readdirSync(dir);

    // 파일 수 계산
    const fileCount = files.length;

    // 응답으로 파일 수 반환
    res.status(200).json({ fileCount });
  } catch (error) {
    // 오류 처리
    res.status(500).json({ error: error.message });
  }
}
