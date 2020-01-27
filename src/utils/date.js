/**
 * 日期工具函数
 */
const DATE = new Date();
module.exports = {
  TIME_FORMAT: 'HH:mm',
  DATA_FORMAT: 'YYYY/MM/DD',
  DATE_COUPON: 'YYYY-MM-DD',
  DATA: 'yyyy-MM-dd',
  TODAY: DATE.toLocaleDateString(),
  PASTDAY: new Date(DATE.getTime() - 6 * 24 * 3600 * 1000).toLocaleDateString(),
  getDateTime: timestamp => timestamp ? new Date(timestamp).toLocaleString('chinese', { hour12: false }) : new Date().toLocaleString('chinese', { hour12: false }),
  getTimestamp: dateTime => dateTime ? new Date(dateTime).getTime() : new Date().getTime(),
};
