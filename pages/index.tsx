import { GetStaticProps, NextPage } from 'next';
import * as fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { format } from 'date-fns';
import { PostListModel } from '@interfaces/post';
import ko from 'date-fns/locale/ko';
import Link from 'next/link';
import { colorMap } from '@utils/color';
import HomeHeader from '@components/HomeHeader';
import ViewListIcon from '@components/icons/ViewList';
import { useRouter } from 'next/router';
import PostTag from '@components/PostTag';
import PostTagList from '@components/PostTagList';

export const getStaticProps: GetStaticProps = async (context) => {
  const files = await fs.readdir(path.join(process.cwd(), 'posts'), {
    withFileTypes: true,
  });
  let posts: PostListModel[] = await Promise.all(
    files.map(async (file) => {
      const blob = await fs.readFile(
        path.join(process.cwd(), 'posts', file.name),
      );
      const data = matter(blob).data as PostListModel;
      data.path = file.name.replace('.mdx', '');
      return data;
    }),
  );
  posts = posts
    .filter((post) => {
      if (process.env.NODE_ENV !== 'production') {
        return post.path !== '이력서';
      }
      return !post.draft && post.path !== '이력서';
    })
    .sort(
      (p, q) =>
        new Date(q.createdAt).getTime() - new Date(p.createdAt).getTime(),
    );
  posts = posts.map((post) => ({
    ...post,
    createdAt: format(new Date(post.createdAt), 'yyyy년 MMMM do', {
      locale: ko,
    }),
  }));

  return {
    props: {
      posts: posts.slice(0, 12),
      colorMap,
    },
  };
};

export interface PageProps {
  posts: PostListModel[];
  colorMap: Record<string, string>;
}

const Page: NextPage<PageProps> = ({ posts, colorMap }) => {
  const router = useRouter();
  return (
    <>
      <div className="m-4">
        <HomeHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-12 mt-4">
          {posts.map((post, index) => (
            <div key={post.path + index.toString()}>
              <picture>
                <img
                  src={post.image || '/preview.png'}
                  alt={post.title}
                  className="rounded sm:rounded-xl w-full"
                />
              </picture>
              <PostTagList tags={post.tags} colorMap={colorMap} />
              <h5 className="text-xl sm:text-2xl font-semibold mt-1">
                <Link href={`/p/${post.path}`}>{post.title}</Link>
              </h5>
              <p className="text-base mt-1 font-medium">{post.description}</p>
              <small className="createdAt font-semibold text-gray-700 dark:text-gray-300">
                {post.createdAt}
              </small>
            </div>
          ))}
        </div>
        <h5 className="text-white bg-red-600 dark:bg-red-400 px-2 py-1 mt-4 font-semibold rounded inline-flex">
          <ViewListIcon
            onClick={() => {
              router.push('/posts');
            }}
            className="cursor-pointer mr-1"
          />
          <Link href={'/posts'}>{'게시물 더 보기'}</Link>
        </h5>
      </div>
      <style jsx>{`
        .createdAt {
          font-size: 0.875rem;
        }
      `}</style>
    </>
  );
};

export default Page;
