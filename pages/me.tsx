import { GetStaticProps, NextPage } from 'next';
import * as fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PostContent, PostListModel } from '@interfaces/post';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { MDXRemote } from 'next-mdx-remote';
import LinkComponent from '@components/mdx/LinkComponent';
import PageHeader from '@components/PageHeader';
import BackLink from '@components/BackLink';

export const getStaticProps: GetStaticProps = async (context) => {
  const filePath = path.join(process.cwd(), 'posts', '이력서.mdx');
  const fileData = await fs.readFile(filePath);
  const { data: _data, content } = matter(fileData);
  const data = _data as PostListModel;
  data.path = 'me';
  const source = await serialize(content, {
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

const ResumePage: NextPage<{ post: PostListModel & PostContent }> = ({
  post,
}) => {
  const components = {
    a: (props: any) => <LinkComponent {...props} />,
  };
  return (
    <>
      <div className="mx-auto w-full px-4 mb-12">
        <article className="prose prose-slate dark:prose-invert sm:prose-xl max-w-full mt-4">
          <MDXRemote {...post.content} components={components} />
        </article>
        <BackLink />
      </div>
    </>
  );
};

export default ResumePage;
