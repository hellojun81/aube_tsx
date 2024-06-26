// ES 모듈 형식의 임포트
import path from 'path';

// 설정 객체를 내보냅니다.
export default {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      };
    }

    // 서버 측 코드에서 파일 접근 경로 설정
    config.resolve.alias['@public'] = path.join(process.cwd(), 'public');

    return config;
  },
};
