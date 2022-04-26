import { auth } from "../Firebase";

export default function ChatMessage(props) {
  const { displayName, text, uid, photoURL, createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  console.log(JSON.stringify(props.message, null, 3));

  let created;
  if (createdAt !== null) {
    created = new Date(createdAt.seconds * 1000).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <div class="container-fluid border p-2">
        <div class="row">
          <div class="col-3 col-sm-2 col-xl-1">
            <img
              className="profile-pic"
              src={photoURL}
              referrerPolicy="no-referrer"
              alt={`of ${displayName}`}
            />
          </div>
          <div class="col-9 col-sm-10 col-xl-11">
            <div class="row">
              <div class="col-12 text-muted">{displayName}</div>
            </div>
            <div class="row">
              <div class="col-12 lead">{text}</div>
            </div>
          </div>
        </div>
      </div>

      {/*         <div className="text-center col-md-2 col-4">
          <img className="profile-pic" src={photoURL} referrerPolicy="no-referrer" alt={`of ${displayName}`} />
        </div>
        <div className="col-md-10 col-8">
          <p>{text}</p>
          <div className="row border">
            <div className="col-md-6 border">Posted By: {displayName}</div>
            <div className="col-md-6 border">At: {created}</div>
          </div>
        </div>
      </div> */}
    </>
  );
}
