export type FileType = {
  id: string;
  file: {
    downloadURL: string;
    fileName: string;
    size: number;
    type: string;
  };
  timestamp: Date;
  user: {
    fullName: string;
    id: string;
    profileImg: string;
  };
};
