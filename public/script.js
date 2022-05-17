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
  addHistory();
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

      // trash.style="float: right; padding: 5px;";

      response.appendChild(content);
      resCon.appendChild(trash);
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