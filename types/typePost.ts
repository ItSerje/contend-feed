export type Post = {
  imageUrl: string;
  user: string;
  likes: number;
  caption: string;
  profile_picture: string;
  comments: Comment[];
};

type Comment = {
  user: string;
  comment: string;
};
