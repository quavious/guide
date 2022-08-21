import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { format } from 'date-fns';
import { PostListModel } from '@interfaces/post';
import ko from 'date-fns/locale/ko';
import Link from 'next/link';
import { colorMap } from '@utils/color';
import PageHeader from '@components/PageHeader';
import BackLink from '@components/BackLink';
import PostTag from '@components/PostTag';
import PostTagList from '@components/PostTagList';
import SEO from '@components/head/SEO';

export const getStaticProps: GetStaticProps = async (context) => {
  const tag = context.params?.tag;
  if (typeof tag !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
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
        return post.tags.includes(tag);
      }
      return !post.draft && post.tags.includes(tag);
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
      posts,
      tag,
      colorMap,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const files = await fs.readdir(path.join(process.cwd(), 'posts'), {
    withFileTypes: true,
  });
  const tags = (
    await Promise.all(
      files.map(async (file) => {
        const blob = await fs.readFile(
          path.join(process.cwd(), 'posts', file.name),
        );
        const data = matter(blob).data as PostListModel;
        data.path = file.name.replace('.mdx', '');
        return data.tags;
      }),
    )
  ).flatMap((array) => [...array]);
  return {
    paths: tags.map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
};

export interface PageProps {
  posts: PostListModel[];
  colorMap: Record<string, string>;
  tag: string;
}

const Page: NextPage<PageProps> = ({ posts, colorMap, tag }) => {
  return (
    <>
      <div className="m-4">
        <SEO
          title={`${tag} 태그`}
          description={`${tag} 태그 게시물입니다.`}
          url={`t/${tag}`}
          keyword={[tag]}
        />
        <PageHeader>
          <h6
            className="text-white px-2 text-2xl font-semibold py-1 mt-2 rounded inline-flex"
            style={{
              backgroundColor: colorMap[tag],
            }}
          >
            태그: {tag}
          </h6>
        </PageHeader>
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
        <BackLink />
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
