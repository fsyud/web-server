export class awhilePostDto {
  user_id: string;
  content: string;
  tag: number;
}

export class secondawhileDto extends awhilePostDto {
  reply_content: string;
  reply_to_user_id: string;
  awhile_id: string;
}

export class auditTwoAwhileProps {
  curId: string;
  parent_awhile_id: string;
}
