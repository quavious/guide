export default function LinkComponent(props: any) {
  return (
    <a
      {...props}
      target={'_blank'}
      rel="noreferrer"
      className="no-underline focus:text-slate-400 outline-none"
    />
  );
}
