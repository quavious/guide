export default function HomeHeader() {
  return (
    <>
      <header>
        <h1 className="text-4xl sm:text-6xl font-bold headerTitle">Guide.</h1>
        <h2 className="text-xl mt-4 font-semibold">
          인터넷으로 수익 창출하고 싶은 사람들을 위한 가이드
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
