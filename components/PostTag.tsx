import Link from 'next/link';

export interface PostTagProps {
  text: string;
  color: string;
}

export default function PostTag(props: PostTagProps) {
  const { text, color } = props;
  return (
    <>
      <h6
        className="text-sm text-white px-1 py-0.5 mt-2 font-medium rounded inline-flex mr-2 tagColor whitespace-nowrap"
        style={{
          backgroundColor: color,
        }}
      >
        <Link href={`/t/${text}`}>{text}</Link>
      </h6>
      <style jsx>{`
        .tagColor {
          background-color: ${color};
        }
      `}</style>
    </>
  );
}
