import { ProfileData } from './types';

export const INITIAL_PROFILE: ProfileData = {
  username: "kimberly.loaiza",
  isVerified: true,
  displayName: "KIM LOAIZA",
  flag: "🇲🇽",
  postsCount: 675,
  followersCount: "37.5 mill.",
  followingCount: 4214,
  category: "Figura pública",
  bio: "✨ @jukilopstore ✨\nX SIEMPRE LINDURAS\nVer traducción",
  linkText: "jukilopstore.com",
  linkUrl: "https://jukilopstore.com",
  mutualFollowers: {
    avatarUrls: [
      "https://picsum.photos/id/1011/50/50",
      "https://picsum.photos/id/1027/50/50",
      "https://picsum.photos/id/1012/50/50"
    ],
    text: "agentechang1104, cieloanais y 30 personas más siguen esta cuenta"
  },
  profilePicUrl: "https://picsum.photos/id/64/200/200", // Placeholder for Kim
  highlights: [
    { id: '1', title: 'Juanito 🦁', coverUrl: 'https://picsum.photos/id/1062/100/100' },
    { id: '2', title: 'K I M A x2 🦋', coverUrl: 'https://picsum.photos/id/1074/100/100' },
    { id: '3', title: 'K I M A 🦋', coverUrl: 'https://picsum.photos/id/1084/100/100' },
    { id: '4', title: '#NoSeasCelo', coverUrl: 'https://picsum.photos/id/237/100/100' },
  ],
  posts: [
    { id: 'p1', type: 'image', isPinned: true, likes: 120000, caption: "Concert vibe", imageUrl: "https://picsum.photos/id/129/400/600" },
    { id: 'p2', type: 'image', isPinned: true, likes: 340000, caption: "Stage moment", imageUrl: "https://picsum.photos/id/338/400/600" },
    { id: 'p3', type: 'image', isPinned: false, likes: 98000, caption: "Family", imageUrl: "https://picsum.photos/id/453/400/600" },
    { id: 'p4', type: 'image', isPinned: false, likes: 55000, caption: "Car selfie", imageUrl: "https://picsum.photos/id/655/400/400" },
    { id: 'p5', type: 'image', isPinned: false, likes: 21000, caption: "Studio", imageUrl: "https://picsum.photos/id/349/400/400" },
    { id: 'p6', type: 'image', isPinned: false, likes: 11000, caption: "Aesthetic", imageUrl: "https://picsum.photos/id/22/400/400" },
    { id: 'p7', type: 'image', isPinned: false, likes: 12000, caption: "Travel", imageUrl: "https://picsum.photos/id/48/400/400" },
    { id: 'p8', type: 'image', isPinned: false, likes: 45000, caption: "Music", imageUrl: "https://picsum.photos/id/43/400/400" },
    { id: 'p9', type: 'image', isPinned: false, likes: 89000, caption: "Love", imageUrl: "https://picsum.photos/id/64/400/400" },
    { id: 'p10', type: 'video', isPinned: false, likes: 150000, caption: "New video", imageUrl: "https://picsum.photos/id/96/400/600" },
    { id: 'p11', type: 'image', isPinned: false, likes: 32000, caption: "Mood", imageUrl: "https://picsum.photos/id/111/400/400" },
    { id: 'p12', type: 'image', isPinned: false, likes: 67000, caption: "Style", imageUrl: "https://picsum.photos/id/12/400/400" },
  ],
  reels: [
    { id: 'r1', type: 'video', likes: 50000, caption: "Dance trend", imageUrl: "https://picsum.photos/id/15/300/533" },
    { id: 'r2', type: 'video', likes: 60000, caption: "Vlog", imageUrl: "https://picsum.photos/id/28/300/533" },
    { id: 'r3', type: 'video', likes: 70000, caption: "Funny", imageUrl: "https://picsum.photos/id/35/300/533" },
    { id: 'r4', type: 'video', likes: 80000, caption: "BTS", imageUrl: "https://picsum.photos/id/42/300/533" },
    { id: 'r5', type: 'video', likes: 90000, caption: "Music video", imageUrl: "https://picsum.photos/id/55/300/533" },
    { id: 'r6', type: 'video', likes: 10000, caption: "Life update", imageUrl: "https://picsum.photos/id/68/300/533" },
    { id: 'r7', type: 'video', likes: 12000, caption: "Challenge", imageUrl: "https://picsum.photos/id/76/300/533" },
    { id: 'r8', type: 'video', likes: 45000, caption: "Behind scenes", imageUrl: "https://picsum.photos/id/82/300/533" },
    { id: 'r9', type: 'video', likes: 33000, caption: "Travel vlog", imageUrl: "https://picsum.photos/id/91/300/533" },
    { id: 'r10', type: 'video', likes: 67000, caption: "GRWM", imageUrl: "https://picsum.photos/id/103/300/533" },
    { id: 'r11', type: 'video', likes: 89000, caption: "Concert", imageUrl: "https://picsum.photos/id/145/300/533" },
    { id: 'r12', type: 'video', likes: 11000, caption: "Q&A", imageUrl: "https://picsum.photos/id/158/300/533" },
  ],
  tagged: [
    { id: 't1', type: 'image', likes: 1200, caption: "With fans", imageUrl: "https://picsum.photos/id/76/400/400" },
    { id: 't2', type: 'image', likes: 1500, caption: "Event", imageUrl: "https://picsum.photos/id/88/400/400" },
    { id: 't3', type: 'image', likes: 1800, caption: "Friends", imageUrl: "https://picsum.photos/id/99/400/400" },
    { id: 't4', type: 'image', likes: 2000, caption: "Concert", imageUrl: "https://picsum.photos/id/102/400/400" },
    { id: 't5', type: 'image', likes: 2500, caption: "Fan art", imageUrl: "https://picsum.photos/id/115/400/400" },
    { id: 't6', type: 'image', likes: 3000, caption: "Street style", imageUrl: "https://picsum.photos/id/129/400/400" },
    { id: 't7', type: 'image', likes: 4500, caption: "Fan meetup", imageUrl: "https://picsum.photos/id/200/400/400" },
    { id: 't8', type: 'image', likes: 1200, caption: "Selfie", imageUrl: "https://picsum.photos/id/201/400/400" },
    { id: 't9', type: 'image', likes: 6700, caption: "Show", imageUrl: "https://picsum.photos/id/202/400/400" },
    { id: 't10', type: 'image', likes: 9800, caption: "Art", imageUrl: "https://picsum.photos/id/203/400/400" },
    { id: 't11', type: 'image', likes: 3400, caption: "Drawing", imageUrl: "https://picsum.photos/id/204/400/400" },
    { id: 't12', type: 'image', likes: 5600, caption: "Edit", imageUrl: "https://picsum.photos/id/206/400/400" },
  ]
};