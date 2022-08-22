import SEO from '@components/head/SEO';
import type { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <div className="m-4">
      <SEO
        title="404 페이지입니다."
        description="주소를 잘못 찾으셨어요."
        keyword={['404', '주소', 'Not found']}
      />
      <h1 className="text-6xl font-bold">앗, 이런...</h1>
      <p className="text-xl mt-4">아무래도 페이지를 잘못 찾으신 거 같아요.</p>
      <h5 className="hover:text-slate-400 hover:focus:text-slate-600 mt-4">
        <Link href={'/posts'}>메인 페이지로 돌아가기</Link>
      </h5>
    </div>
  );
};

export default NotFound;
