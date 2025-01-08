export interface Author {
    id:number
    username: string;
    fullName: string;
    avatar:string
  }
  
  export interface Thread {
    id:number
    content: string;
    image:string
    author: Author;
    _count: {
      likes: number;
      comments: number;
    };
    userHasLiked: boolean;
  }
  