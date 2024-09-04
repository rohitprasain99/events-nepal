import { ResponseEnum } from './enums/response.enum';

export function ResponseMessageUtility(
  module: string,
  operation: ResponseEnum,
) {
  switch (operation) {
    case ResponseEnum.ADDED:
      return `${module} added successfully`;
    case ResponseEnum.SENT:
      return `${module} sent successfully`;
    case ResponseEnum.UPDATED:
      return `${module} updated successfully`;
    case ResponseEnum.REMOVED:
      return `${module} removed successfully`;
    default:
      return;
  }
}
