import { Timestamp } from 'firebase/firestore';

export type Post = {
  imageUrl: string;
  username: string;
  likes: number;
  caption: string;
  profile_picture: string;
  comments: Comment[];
  createdAt: Timestamp;
  likes_by_users: [];
  owner_uid: string;
};

type Comment = {
  user: string;
  comment: string;
};
