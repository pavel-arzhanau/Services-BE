export interface IComment {
  id: number;
  userId: number;
  adId: number;
  content: string;
  likes: null | number;
}

export interface CreateCommentDto {
  userId: number;
  adId: number;
  content: string;
}

export interface UpdateCommentDto {
  id: number;
  content: string;
}
