export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();

  // 月は0から始まるため、+1する
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
