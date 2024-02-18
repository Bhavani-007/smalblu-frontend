import React, {useState} from "react";


const SendNotification = () => {

    const [text, setText] = useState('');
    const [adminMessage,setAdminMessage] = useState('');

    const onTextChange = (event) => {
        setText(event.target.value);
      }

    const onSubmitNotification = () => {
        fetch('https://smalblu-backend.onrender.com/admin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
        
      })
    }).then(response => response.json())
      .then(notificationSent => {
        setAdminMessage(notificationSent.message);
        
      }).catch(console.log)
    }
    

      return(
        <div >
            <label>
                Notification:
                <input type="text" value={text} onChange={onTextChange}/>
            </label>
            <button onClick={onSubmitNotification}>Save</button>

            {adminMessage && <p className="login-error-message">{adminMessage}</p>}

        </div>
      );
}

export default SendNotification;