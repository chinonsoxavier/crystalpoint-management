import { formatDistanceToNow } from "date-fns";

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};


export default formatTimeAgo;