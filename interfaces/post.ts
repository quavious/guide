export interface PostListModel {
  id: string;
  title: string;
  path?: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt?: string;
  draft: boolean;
  tags: string[];
}

export interface PostContent {
  content: any;
}
