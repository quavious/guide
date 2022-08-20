import * as fs from 'fs/promises';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';
import remarkRehype from 'remark-rehype';
import { format } from 'date-fns';
import { PostContent, PostListModel } from '@interfaces/post';
import ko from 'date-fns/locale/ko';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import PageHeader from '@components/PageHeader';
import BackLink from '@components/BackLink';
import LinkComponent from '@components/mdx/LinkComponent';

export const getStaticProps: GetStaticProps = async (context) => {
  let slug = context.params?.slug;
  if (typeof slug !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const blob = await fs.readFile(
    path.join(process.cwd(), 'posts', slug + '.mdx'),
  );
  const { data: _data, content: raw } = matter(blob);
  const data = _data as PostListModel;
  data.path = slug;
  const source = await serialize(raw, {
    mdxOptions: {
      remarkPlugins: [remarkPrism, remarkGfm],
    },
  });

  return {
    props: {
      post: {
        ...data,
        content: source,
        createdAt: format(
          new Date(data.createdAt),
          'yyyy년 MMMM do HH시 mm분',
          {
            locale: ko,
          },
        ),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const files = await fs.readdir(path.join(process.cwd(), 'posts'));
  return {
    paths: files.map((path) => ({
      params: {
        slug: path.replace('.mdx', ''),
      },
    })),
    fallback: false,
  };
};

const PostPage: NextPage<{ post: PostListModel & PostContent }> = (props) => {
  const components = {
    a: (props: any) => <LinkComponent {...props} />,
    table: (props: any) => (
      <div style={{ overflowX: 'scroll', width: '100%', whiteSpace: 'nowrap' }}>
        <table {...props} />
      </div>
    ),
  };
  const { post } = props;
  if (!post) {
    return (
      <div className="w-full flex justify-center pt-4">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto w-full px-4">
        <PageHeader />
        <h1 className="text-2xl sm:text-4xl font-bold">{post.title}</h1>
        <div className="mt-2 flex items-center">
          <h5 className="text-base font-light text-gray-700 dark:text-gray-300">
            {post.createdAt}
          </h5>
        </div>
        <picture>
          <img
            src={post.image || '/preview.png'}
            alt={post.title}
            className="thumbnail object-fit mt-4"
          />
        </picture>
        <article className="prose prose-slate dark:prose-invert sm:prose-xl max-w-full mt-4">
          <MDXRemote {...post.content} components={components} />
        </article>
        <BackLink />
        <div className="w-full max-w-full h-1 bg-gray-200 my-4" />
      </div>
      <style jsx>{`
        .thumbnail {
          max-width: 32rem;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default PostPage;
