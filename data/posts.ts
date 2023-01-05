import { USERS } from './users';

export const POSTS = [
  {
    imageUrl: 'https://i.ibb.co/182bP1y/4k.png',
    user: USERS[0].user,
    likes: 7870,
    caption:
      'Train Ride to Hogwarts. 😂🤖 And again, Train Ride to Hogwarts. 😂🤖',
    profile_picture: USERS[0].image,
    comments: [
      {
        user: 'theqazman',
        comment: 'Wow! This build looks fire. Super excited about this!',
      },
      {
        user: 'amaanath.dev',
        comment: "Once I wake up, I'll finally be ready to code this up!",
      },
    ],
  },
  {
    imageUrl: 'https://i.ibb.co/02vj5cw/Post-Copy.png',
    user: USERS[1].user,
    likes: 7872,
    caption: 'Something awesome! 😂🤖',
    profile_picture: USERS[1].image,
    comments: [
      {
        user: 'cleverqazi',
        comment: 'yo',
      },
      {
        user: 'amaanath.dev',
        comment: "I'M SLEEPING!!!",
      },
    ],
  },
];
