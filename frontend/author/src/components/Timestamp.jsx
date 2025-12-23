import styles from "../styles/Timestamp.module.css";
import { formatDistanceToNow } from "date-fns";

function Timestamp({ dateTime }) {
  const timestampString = formatDistanceToNow(dateTime);
  return <div className={styles.timestamp}>{timestampString} ago</div>;
}

export default Timestamp;
