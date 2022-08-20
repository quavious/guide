import PostTag from './PostTag';

export interface PostTagListProps {
  tags: string[];
  colorMap: Record<string, string>;
}

export default function PostTagList({ tags, colorMap }: PostTagListProps) {
  return (
    <>
      <div className="flex overflow-x-scroll noScroll">
        {tags.map((tag) => (
          <PostTag text={tag} color={colorMap[tag]} key={tag} />
        ))}
      </div>
      <style jsx>{`
        .noScroll::-webkit-scrollbar {
          display: none;
        }

        .noScroll {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </>
  );
}
