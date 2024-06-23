// pages/index.tsx
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';

type Props = {
    fileCount: number;
};
// const directoryPath = path.join(process.cwd(), 'public', '/1floor/height'); // 폴더 경로 설정
const Home = ({ fileCount }: Props) => {
    
    let fC = 0;

    // try {
    //     const files = fs.readdirSync(directoryPath);
    //     fC = files.length;
    // } catch (error) {
    //     console.error('Error reading directory:', error);
    // }

    console.log('fC', fC)

    return (
        <div>
            <h1>File Count in Directory</h1>
            <p>There are {fileCount} files in the directory.</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const directoryPath = path.join(process.cwd(), 'public', '/1floor/height'); // 폴더 경로 설정

    let fileCount = 0;

    try {
        const files = fs.readdirSync(directoryPath);
        fileCount = files.length;
    } catch (error) {
        console.error('Error reading directory:', error);
    }

    return {
        props: {
            fileCount,
        },
    };
};

export default Home;
