var messages = document.getElementById('messages');
var roomNameInput = document.getElementById('roomname-input');
var sendButton = document.getElementById('send-btn');

//по нажатию на кнопку отправить - отправить на сервер nickname:message 
sendButton.addEventListener('click', sendUserMessage); 

start();
    
//каждые 500 милисек забирать сообщение
function start(){
    getMessagesFromServer();
    setInterval(getMessagesFromServer, 3000 );  
}
var lastMessage = [];
//шаг 1:
//получить сообщение с сервера
async function getMessagesFromServer() {
    
    //получаем название комнаты
    var roomname = roomNameInput.value;
    //получить асинхронный ответ
 var response = await fetch(`https://fchatiavi.herokuapp.com/get/${roomname}/?offset=0&limit=10000000`);
    //декодируем из строки в жс
 response = await response.json();
    
    if(response == null) {
     messages.innerHTML = 'No messages';
        return;
    }
    
    //сформировать хтмл меседжей
    var messagesHTML = fromMessagesHTML(response);
    
     //добавить в меседж врапер письма
     messages.innerHTML = messagesHTML;
    
    //если сообщение больше чем прошлый раз проскролить вниз
    if (lastMessages.length < response.length) {
        scrollToEnd();
    }
    //запомнить сообщение
   lastMessages = response;
}


async function sendUserMessage() {
//получить что написал пользователь в поле nickname

var userNickname = document.getElementById('nickname-input').value;
    //получить что написал пользователь в поле message
var userMessage = document.getElementById('message-input').value;
    
    if (userNickname.length === 0){
    alert("Ты должен ввести имя!");
    return;
    
} 
    if (userMessage.length === 0){
    alert("Ты должен ввести сообщение!");
    return;
}
     var roomname = roomNameInput.value;
     await fetch(`https://fchatiavi.herokuapp.com/send/${roomname}/`,     {
         method: 'POST',
         body: JSON.stringify({
             Name: userNickname,
             Message: userMessage
         })
     });
    
    getMessagesFromServer();
}
    
    //сформировать html меседжей
    function fromMessagesHTML(messages){
        console.log(messages);
    var allMessagesHTML = '';
    for (var i = 0; i < messages.length; i++){
       var messageData = messages[i];
        //создать верстку меседжа   
       var message = `
        <div class="message">
         <div class="message-nickname"> ${messageData.Name}</div>
         <div class="message-text"> ${messageData.Message} </div>
       </div>
    `
        
     allMessagesHTML = allMessagesHTML + message;
        
    }
    return allMessagesHTML;
    }
    //добавить в messages-wrapper письма

     
        


function scrollToEnd(){
    messages.scrollTop = messages.scrollHeight;
    
}
