import { formatDistanceToNow } from "date-fns";

function Timestamp({ dateTime }) {
  const timestampString = formatDistanceToNow(dateTime);
  return <div>{timestampString} ago</div>;
}

export default Timestamp;
