export default function ChatMessage(props) {
  const { displayName, text, photoURL, createdAt } = props.message;
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
      <div className="message container-fluid border p-2">
        <div className="row">
          <div className="pic-container col-2">
            <img
              classNameName="profile-pic"
              src={photoURL}
              referrerPolicy="no-referrer"
              alt={`of ${displayName}`}
            />
          </div>
          <div className="col-10">
            <div className="d-flex flex-row justify-content-start align-items-center">
              <div className="text-muted">{displayName}</div>
              <small className="ps-3 text-muted">{created}</small>
            </div>
            <div className="row">
              <div className="col-12 lead">{text}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
