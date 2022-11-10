import "../Styles/message.css";
import { useLocation } from "react-router-dom";

// export default function Message(message,setMessage) {
export default function Message(props) {
  const location = useLocation();
  const userID = location.state.id;

  const { message } = props;
  // console.log(message);
  // let own = false;

  if (message) {
    return message.map((msg, index) => {
      return (
        <div key={index}>
          {msg.messageText === "dont_show" ? (
            <div></div>
          ) : (
            <div
              className={
                msg.messageFrom == localStorage.getItem("id")
                  ? "message own"
                  : "message"
              }
            >
              <div className="messageTop">
                <>
                  <img
                    className="messageImg"
                    src={`http://localhost:3003/auth/images/${msg.senderImg}`}
                    alt="hi"
                  />
                </>
                <>
                  <p className="messageText">{msg.messageText}</p>
                </>
              </div>
            </div>
          )}
        </div>
      );
    });
  }
}
