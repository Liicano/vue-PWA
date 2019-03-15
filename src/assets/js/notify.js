export default (
  notifyFunc,
  {
    message = '',
    icon = 'add_alert',
    horizontalAlign = 'right',
    verticalAlign = 'top',
    type = 'info'
  }
) => {
  notifyFunc({
    message,
    icon,
    horizontalAlign,
    verticalAlign,
    type
  });
};
