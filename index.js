const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//This is the route the API will call
app.post('/new-message', function(req, res) {
    const { message } = req.body
  
    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
  
    if (!message || message.text.toLowerCase().indexOf('marco') < 0) {
      // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
      return res.end()
    }
  
    axios
      .post(
        'https://api.telegram.org/bot777845702:AAFdPS_taJ3pTecEFv2jXkmbQfeOqVZGER/sendMessage',
        {
          chat_id: message.chat.id,
          text: 'Polo!!'
        }
      )
      .then(response => {
        // We get here if the message was successfully posted
        console.log('Message posted')
        res.end('ok')
      })
      .catch(err => {
        // ...and here if it was not
        console.log('Error :', err)
        res.end('Error :' + err)
      })
  });

  // Finally, start our server
app.listen(3000, function() {
    console.log('Telegram app listening on port 3000!')
  });
    