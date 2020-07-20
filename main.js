var messages = document.getElementById('messages');
var sendButton = document.getElementById('send-btn')

//по нажатию на кнопку отправить - отправить на сервер nickname:message 
sendButton.addEventListener('click', sendUserMessage); 

getMessagesFromServer();

//шаг 1:
//получить сообщение с сервера
async function getMessagesFromServer() {    
 var response = await fetch('https://fchatiavi.herokuapp.com/get/artem/?offset=0&limit=10000000');
 response = await response.json();
    
    var allMessagesHTML = '';
    for (var i = 0; i < response.length; i++){
       var messageData = response[i];
        //создать верстку меседжа   
       var message = `
        <div class="message">
         <div class="message-nickname"> ${messageData.Name}</div>
         <div class="message-text"> ${messageData.Message} </div>
       </div>
    `
        
     allMessagesHTML = allMessagesHTML + message;
        
    }
     messages.innerHTML = allMessagesHTML;
    
    
   
    
    
}

//добавить в messages-wrapper письма
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
    
     await fetch('https://fchatiavi.herokuapp.com/send/artem/',     {
         method: 'POST',
         body: JSON.stringify({
             Name: userNickname,
             Message: userMessage
         })
     });
    
    getMessagesFromServer();
    
        
}

