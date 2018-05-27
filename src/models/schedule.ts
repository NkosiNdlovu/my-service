export class Schedule {
  weeklyFrequency: number;
  day: string;
  timeRangeStart: number;
  timeRangeEnd: number;
  validUntil: Date;
  status: string;

  constructor() {
    let nowDate = new Date();
    nowDate.setMonth(nowDate.getMonth() + 6);
    this.validUntil = nowDate;
  }
}
