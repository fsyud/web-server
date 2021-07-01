import * as crypto from 'crypto';

export const MD5_SUFFIX = 'starryskystar.space*&^%$#';

export const md5 = (pwd: string): string => {
  const md5 = crypto.createHash('md5');
  return md5.update(pwd).digest('hex');
};
