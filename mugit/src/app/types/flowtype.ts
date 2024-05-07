export type FlowType = {
  id: number;
  user: {
    id: number;
    nickName: string;
    profileImagePath: string;
  };
  title: string;
  authority: string;
  musicPath: string;
  coverPath: string;
  createdAt: string;
};

export type FlowDetailType = {
  id: number;
  user: {
    id: number;
    nickName: string;
    profileImagePath: string;
  };
  title: string;
  message: string;
  authority: string;
  musicPath: string;
  coverPath: string;
  likes: number;
  likePressed: boolean;
  record: {
    id: number;
    message: string;
    isOpen: boolean;
    sources: [
      {
        id: number;
        name: string;
        path: string;
        // name: string | null;
        // path: string | null;
      }
    ];
  };
  hashtags: string[];
  createdAt: string;
};
