export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avater: string;
  isFollowing: boolean;
}

export interface UserResult {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: User[];
}
