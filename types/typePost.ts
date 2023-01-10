import { Timestamp } from 'firebase/firestore';

export type Post = {
  id: string;
  imageUrl: string;
  username: string;
  likes: number;
  caption: string;
  profile_picture: string;
  comments: Comment[];
  createdAt: Timestamp;
  likes_by_users: string[];
  owner_uid: string;
  owner_email: string;
};

type Comment = {
  user: string;
  comment: string;
};
