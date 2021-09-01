export class CommentPostDto {
  article_id: string;
  user_id: string;
  content: string;
}

export class secondCommentDto extends CommentPostDto {
  reply_content: string;
  reply_to_user_id: string;
  commit_id: string;
}

export type removeTwoCommentProps = {
  commmnetId: string;
  curId: string;
  state: number;
};

export type auditTwoCommentProps = {
  curId: string;
  article_id: string;
};
