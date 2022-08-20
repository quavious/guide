import Link from 'next/link';

export interface PageHeaderProps {
  children?: JSX.Element;
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <>
      <header>
        <h5 className="my-4 font-bold text-xl sm:text-2xl headerTitle">
          <Link href={'/'}>Blog.</Link>
        </h5>
        {props.children}
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
