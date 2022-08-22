import SEO from '@components/head/SEO';
import type { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <div className="m-4">
      <SEO
        title="500 페이지입니다."
        description="블로그에 뭔가 문제가 있어요."
        keyword={['500', '문제', 'Server internal error']}
      />
      <h1 className="text-6xl font-bold">앗, 이런...</h1>
      <p className="text-xl mt-4">블로그가 어딘가 문제가 발생했나봐요.</p>
      <h5 className="hover:text-slate-400 hover:focus:text-slate-600 mt-4">
        <Link href={'/posts'}>메인 페이지로 돌아가기</Link>
      </h5>
    </div>
  );
};

export default NotFound;
