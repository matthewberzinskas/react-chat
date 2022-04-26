import { auth } from "../Firebase";

function ChatMessage(props) {
  const { displayName, text, uid, photoURL, createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  console.log(JSON.stringify(props.message, null, 3));

  let created;
  if (createdAt !== null) {
    console.log(createdAt.seconds);
    created = new Date(createdAt.seconds * 1000).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <div
        className={`message d-flex ${
          messageClass === "sent" ? "flex-row" : "flex-row-reverse"
        } border p-2`}
      >
        <div className="text-center col-md-2 col-3 p-1">
          <img src={photoURL} referrerPolicy="no-referrer" alt={`of ${displayName}`} />
        </div>
        <div className="col-md-10 col-9 p-1">
          <p>{text}</p>
          <div className="row border p-1">
            <div className="col-md-6 border">Posted By: {displayName}</div>
            <div className="col-md-6 border">At: {created}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessage