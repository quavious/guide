import * as fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PostListModel } from '@interfaces/post';

const colorMap: Record<string, string> = {};

const getRandomColor = () => {
  return (
    '#' +
    Array.from({ length: 3 })
      .map(() => {
        const value = Math.floor(Math.random() * 128);
        const filtered = value === 128 ? 0 : value;
        return filtered.toString(16);
      })
      .reduce(
        (acc, val) =>
          (acc.length === 1 ? `0${acc}` : acc) +
          (val.length === 1 ? `0${val}` : val),
      )
  );
};

const initColorMap = async () => {
  const files = await fs.readdir(path.join(process.cwd(), 'posts'), {
    withFileTypes: true,
  });
  const tags = (
    await Promise.all(
      files.map(async (file) => {
        const blob = await fs.readFile(
          path.join(process.cwd(), 'posts', file.name),
        );
        const data = matter(blob).data as PostListModel;
        data.path = file.name.replace('.mdx', '');
        return data.tags;
      }),
    )
  ).flatMap((array) => [...array]);
  tags.forEach((tag) => {
    colorMap[tag] = getRandomColor();
  });
};

initColorMap();

export { colorMap };
