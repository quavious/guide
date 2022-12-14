import * as fs from 'fs/promises';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import path from 'path';
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
import SEO from '@components/head/SEO';
import Script from 'next/script';
import { useEffect, useState } from 'react';

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
        <SEO
          title={post.title}
          description={post.description}
          url={`p/${post.path}`}
          keyword={post.tags}
          image={post.image}
        />
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
        <div className="disqusWrapper mb-16">
          <div id="disqus_thread"></div>
        </div>
        <Script
          id="disqus"
          strategy="afterInteractive"
          async={true}
          dangerouslySetInnerHTML={{
            __html: `
              var disqus_config = function () {
                this.page.url = "https://nwlee.com"; 
                this.page.identifier = "p/${post.path}";
              };
              
              (function() {
                var d = document, s = d.createElement('script');
                s.src = 'https://nw-lee.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
              })();`,
          }}
        />
        <Script
          id="dsq-count-scr"
          src="//nw-lee.disqus.com/count.js"
          async={true}
          strategy="afterInteractive"
        />
      </div>
      <style jsx>{`
        .thumbnail {
          max-width: 32rem;
          width: 100%;
        }
        .disqusWrapper {
          padding: 1rem;
          background-color: white;
        }
      `}</style>
    </>
  );
};

export default PostPage;
