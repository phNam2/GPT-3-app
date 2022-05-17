// Submit a prompt to get the respone from OpenAI
async function getResponse(prompt) {
  const data = {prompt};
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  };
  const response = await fetch('/completions', options);
  let result = await response.json();
    console.log(result);

  return result;
}

// Submitting a prompt to the OpenAI and return it to the search page
async function enter () {
  let prompt = document.getElementById("prompt").value;
  document.getElementById("prompt").value = "";
  let result = await getResponse(prompt);

  // Create the response View in Seaarch page
  const res = document.getElementById("response");
  let group = document.createElement('div');
  let prompting = document.createElement('div');
  let prompTitle = document.createElement('h3');
  let promtDescription = document.createElement('p');
  let responding = document.createElement('div');
  let responseTitle = document.createElement('h3');
  let responseDes = document.createElement('p');

  prompTitle.innerHTML = "Prompt:";
  promtDescription.innerHTML = result.prompt;
  prompting.appendChild(prompTitle);
  prompting.appendChild(promtDescription);
  responseTitle.innerHTML = "Response: ";
  responseDes.innerHTML = result.output;
  responding.appendChild(responseTitle);
  responding.appendChild(responseDes);

  group.appendChild(prompting);
  group.appendChild(responding);


  if (res.firstChild == null) {
      res.appendChild(group);
  } else{
      res.insertBefore(group, res.firstChild);
  }

  // Add the search result to the local storage
  addToLocalStorage(result.prompt, result.output);

}


// Add the search result to the local storage
function addToLocalStorage(prompt, output) {
  let newKey = (Math.random() + 1).toString(36).substring(7);
  const searchResult = JSON.stringify({prompt: prompt, output: output});

  // Making the list of keys for the response
  let keys = localStorage.getItem("keys");
  if (keys==null) {
    localStorage.setItem("keys", JSON.stringify([newKey]));
  } else {
    let keysList = JSON.parse(keys);
    let test = false;
    while (test==false) {
      let breakup = true;
      for (i=0; i<keysList.length; i++) {
        if (keysList[i]==newKey) {
          newKey = (Math.random() + 1).toString(36).substring(7);
          breakup = false;
        }
      }
      if (breakup == true) {
        test = true;
      }
    }
    keysList.push(newKey);
    localStorage.setItem("keys", JSON.stringify(keysList));
  }
  // Add response to the local storage
  localStorage.setItem(newKey, searchResult);
}

// Function print out the search history
function openSearchHistory() {
  let keys = localStorage.getItem("keys");
  const container = document.getElementById("historyContainer");
  console.log(keys);

  // Create new Child node for search history
  if (keys==null) {

  } else {
    let keysList = JSON.parse(keys);
    for (i=0; i<keysList.length; i++) {
      let x = localStorage.getItem(keysList[i]);
      let hist = JSON.parse(x);

      let resCon = document.createElement('div');
      resCon.id = keysList[i];
      let trashouter = document.createElement('div');
      let trash = document.createElement('i');
      trash.classList.add('fa-solid');
      trash.classList.add('fa-trash');
      trash.classList.add('trash');
      let prompt = document.createElement('div');
      prompt.classList.add("collapsible");
      let response = document.createElement('div');
      response.classList.add("content");
      let content = document.createElement('p');

      if (hist.prompt == "") {
        prompt.innerHTML = `"No question from human"`
      } else {
        prompt.innerHTML = hist.prompt;
      }
      
      content.innerHTML = hist.output;

      // Add the click function for delete button
      trashouter.addEventListener('click', function() {
        deleteHistory(this.parentNode);
      });

      // trash.style="float: right; padding: 5px;";
      trashouter.appendChild(trash);
      response.appendChild(content);
      resCon.appendChild(trashouter);
      resCon.appendChild(prompt);
      resCon.appendChild(response);

      // container.appendChild(resCon);
      if (container.firstChild == null) {
        container.appendChild(resCon);
      } else{
        container.insertBefore(resCon, container.firstChild);
      }
    }
  }
}

// Where function delete a history element
function deleteHistory(currentItem) {
  let key = currentItem.id;

  // Remove the elements from the front-end client side
  parentItem = currentItem.parentNode;
  parentItem.removeChild(currentItem);

  // Delete the key element from the key list
  let keys = localStorage.getItem("keys");
  let keysList = JSON.parse(keys);
  for (i=0; i<keysList.length; i++) {
    console.log(keysList[i]);
    if (key === keysList[i]) {
      keysList.splice(i, 1);
      console.log(keysList[i]);
      break;
    }
  }
  localStorage.setItem("keys", JSON.stringify(keysList)); // Update the key list
  // Delete the key element from local storage
  localStorage.removeItem(key);
}

// Open the chat
function chatBegin() {
  document.getElementById("intro").style = "display:none";
  document.getElementById("conversationContainer").style = "display:block";

  // Get the previous conversation
  let keys = localStorage.getItem("keysChat");
  const converse = document.getElementById("conversation");

  if (keys==null) {

  } else {
    let keysList = JSON.parse(keys);
    for (i=0; i<keysList.length; i++) {
      let x = localStorage.getItem(keysList[i]);
      let consv = JSON.parse(x);

      let human = document.createElement('div');
      human.classList.add('talking');
      human.classList.add('human');
      let humanTalk = document.createElement('p');

      humanTalk.innerHTML = consv.prompt;
      human.appendChild(humanTalk);
      converse.appendChild(human);

      let bot = document.createElement('div');
      bot.classList.add('talking');
      bot.classList.add('bot');
      let botTalk = document.createElement('p');

      botTalk.innerHTML = consv.output;
      bot.appendChild(botTalk);
      converse.appendChild(bot);

      window.scrollTo(0, document.body.scrollHeight);// the page automaticall scoll to the bottom
    }
  }
}

function funChat(x){
  let keys = localStorage.getItem("keysChat");
  if(keys==null) {
    chatBegin();
  } else {
    document.getElementById("chatWelcome").innerHTML = "Oh, you come back. Still want to play with it more, ey?";
    document.getElementById("chatWarning").innerHTML = "Like I said, your conversation will be continued...";
    x.style = "display:none";
    document.getElementById("button2").style = "display:block";
  }
}

// The function that open the chat
async function enterChat () {
  let prompt = document.getElementById("chatPrompt").value;
  document.getElementById("chatPrompt").value = "";

  // Create the response View in Chat page
  let converse = document.getElementById("conversation");
  let human = document.createElement('div');
  human.classList.add('talking');
  human.classList.add('human');
  let humanTalk = document.createElement('p');

  humanTalk.innerHTML = prompt;
  human.appendChild(humanTalk);
  converse.appendChild(human);


  let result = await getResponse(prompt);// Result came in
  let bot = document.createElement('div');
  bot.classList.add('talking');
  bot.classList.add('bot');
  let botTalk = document.createElement('p');

  botTalk.innerHTML = result.output;
  bot.appendChild(botTalk);
  converse.appendChild(bot);

  window.scrollTo(0, document.body.scrollHeight);// the page automaticall scoll to the bottom
  
  // Add the search result to the local storage
  addToLocalStorage2(result.prompt, result.output);
}


// Add the conversation result to the local storage
function addToLocalStorage2(prompt, output) {
  console.log("Chat");
  let newKey = "chat"+(Math.random() + 1).toString(36).substring(7);
  const searchResult = JSON.stringify({prompt: prompt, output: output});

  // Making the list of keys for the response
  let keys = localStorage.getItem("keysChat");
  if (keys==null) {
    localStorage.setItem("keysChat", JSON.stringify([newKey]));
  } else {
    let keysList = JSON.parse(keys);
    let test = false;
    while (test==false) {
      let breakup = true;
      for (i=0; i<keysList.length; i++) {
        if (keysList[i]==newKey) {
          newKey = "chat"+(Math.random() + 1).toString(36).substring(7);
          breakup = false;
        }
      }
      if (breakup == true) {
        test = true;
      }
    }
    keysList.push(newKey);
    localStorage.setItem("keysChat", JSON.stringify(keysList));
  }
  // Add response to the local storage
  localStorage.setItem(newKey, searchResult);
}