import { parseInt } from 'lodash';

export const transformNumericID = (obj: any) => ({
  ...obj,
  id: parseInt(obj.id),
});
