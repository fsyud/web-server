import * as crypto from 'crypto';
import moment from 'moment';

export const MD5_SUFFIX = 'starryskystar.space*&^%$#';

export const md5 = (pwd: string): string => {
  const md5 = crypto.createHash('md5');
  return md5.update(pwd).digest('hex');
};

export const curData = (): string => {
  const date = new Date();
  const currDate = moment(date.setHours(date.getHours())).format(
    'YYYY-MM-DD HH:mm:ss',
  );
  return currDate;
};
