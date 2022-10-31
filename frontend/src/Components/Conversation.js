import classes from "../Styles/conversation.module.css"

export default function Conversation() {
  return (
    <div className={classes.conversation}>
        <img className={classes.conversationImg} src="https://i.pinimg.com/564x/7c/9e/8c/7c9e8c53c1432a3c996ce709b57867f6.jpg" alt=""/>
        <span className={classes.conversationName}>John Doe</span>
    </div>
  )
}
