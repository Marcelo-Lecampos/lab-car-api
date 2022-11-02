export class AgeValidator {
  public date(data: string) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const birth = new Date(data);
    const birthDay = birth.getDate();
    const birthMonth = birth.getMonth();
    const birthYear = birth.getFullYear();
    if (year - birthYear > 18) {
      return true;
    } else if (
      year - birthYear === 18 &&
      month - birthMonth >= 0 &&
      day - birthDay >= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
