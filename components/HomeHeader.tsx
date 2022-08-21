import Link from 'next/link';

export default function HomeHeader() {
  return (
    <>
      <header>
        <h1 className="text-4xl sm:text-6xl font-bold headerTitle">Blog.</h1>
        <h2 className="text-xl mt-4 font-semibold">
          새롭게 배운 프로그래밍 지식을 기록하기 위한 블로그입니다.
          <span className="ml-2 bg-blue-600 text-lg px-2 py-1 rounded">
            <Link href={'/me'}>{`🚀 이력서`}</Link>
          </span>
        </h2>
      </header>
      <style jsx>{`
        .headerTitle {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </>
  );
}
