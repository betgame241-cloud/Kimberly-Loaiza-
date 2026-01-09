export interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  caption: string;
  isPinned?: boolean;
  type: 'image' | 'video';
}

export interface Highlight {
  id: string;
  title: string;
  coverUrl: string;
}

export interface ProfileData {
  username: string;
  isVerified: boolean;
  displayName: string;
  flag: string; // Emoji
  postsCount: number;
  followersCount: string;
  followingCount: number;
  category: string;
  bio: string;
  linkText: string;
  linkUrl: string;
  mutualFollowers: {
    avatarUrls: string[];
    text: string;
  };
  profilePicUrl: string;
  highlights: Highlight[];
  posts: Post[];
  reels: Post[];
  tagged: Post[];
}

export enum GeminiModel {
  FLASH_IMAGE = 'gemini-2.5-flash-image',
  FLASH_SEARCH = 'gemini-3-flash-preview',
}