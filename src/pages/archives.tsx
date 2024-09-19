// pages/archive.js
import { posts } from './api/archives';
import Link from 'next/link';

const ArchivePage = () => {
  return (
    <div>
      <h1>Archive</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/archive/${post.id}`}>
              <a>{post.title} - {post.date}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ArchivePage;
