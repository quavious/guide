import Head from 'next/head';

export interface SEOProps {
  title?: string;
  description?: string;
  keyword?: string[];
  url?: string;
  image?: string;
}

export const baseURL = 'https://nwlee.com';

export default function SEO(props: SEOProps) {
  const { title, description, keyword, url, image } = props;
  return (
    <Head>
      <title>{!!title ? `${title} - nw.lee` : `nw.lee`}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no"
      />
      <meta
        name="description"
        content={
          !!description
            ? `${description} - 이노원 프론트엔드 개발자 블로그`
            : '이노원 프론트엔드 개발자 블로그입니다.'
        }
      />
      <meta
        name="keywords"
        content={keyword
          ?.concat(['이노원', '프론트엔드', '개발자', '블로그'])
          ?.join(',')}
      />
      <meta name="url" content={url ? `${baseURL}/${url}` : baseURL} />
      <meta
        property="og:title"
        content={!title ? `${title} - nw.lee` : `nw.lee`}
      />
      <meta
        property="og:description"
        content={
          !!description
            ? `${description} - 이노원 프론트엔드 개발자 블로그`
            : '이노원 프론트엔드 개발자 블로그입니다.'
        }
      />
      <meta property="og:url" content={url ? `${baseURL}/${url}` : baseURL} />
      <meta
        property="og:image"
        content={image || 'https://nwlee.com/preview.png'}
      />
      <meta property="og:type" content="article" />
      <meta
        name="twitter:card"
        content={image || 'https://nwlee.com/preview.png'}
      />
      <meta
        name="twitter:title"
        content={!title ? `${title} - nw.lee` : `nw.lee`}
      />
      <meta
        name="twitter:description"
        content={
          !!description
            ? `${description} - 이노원 프론트엔드 개발자 블로그`
            : '이노원 프론트엔드 개발자 블로그입니다.'
        }
      />
      <meta
        name="twitter:image"
        content={image || 'https://nwlee.com/preview.png'}
      />
    </Head>
  );
}
