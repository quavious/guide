export interface AppLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      <div className="layout w-full mx-auto">{children}</div>
      <style jsx>{`
        .layout {
          max-width: 67.5rem;
          min-width: 15rem;
        }
      `}</style>
    </>
  );
}
