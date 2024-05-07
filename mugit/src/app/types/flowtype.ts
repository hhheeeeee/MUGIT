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
