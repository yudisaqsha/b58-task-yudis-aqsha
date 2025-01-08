export interface User {
    id: number;
      username: string;
      fullName: string;
      bio: string;
      avatar: string;
      coverPic: string;
     
      _count: {
        followers: number;
        following: number;
      };
  }