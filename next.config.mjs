import fs from 'fs';
import path from 'path';

const directories = [
  'public/1floor/height',
  'public/2floor/height',
  'public/3floor/height',
  'public/4floor/height',
  'public/5floor/height',
  'public/6floor/height',
  'public/1floor/width',
  'public/2floor/width',
  'public/3floor/width',
  'public/4floor/width',
  'public/5floor/width',
  'public/6floor/width',
  // 다른 폴더들을 계속 추가할 수 있습니다.
];

export default {
  webpack: (config, { isServer }) => {
    if (isServer) {
      let allFiles = {};
      for (const dir of directories) {
        const directoryPath = path.join(process.cwd(), dir);
        const files = fs.readdirSync(directoryPath);
        const filePaths = files.map(file => path.join(dir, file));
        allFiles[dir] = filePaths;
      }

      fs.writeFileSync(
        path.join(process.cwd(), 'public', 'fileList.json'),
        JSON.stringify(allFiles)
      );
    }
    return config;
  },
};
