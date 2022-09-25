# GPT-3-app
[Link](https://openai-search-app.herokuapp.com) to the web page on heroku<br />
__Notice: The API key to OpenAI for this website is already expired, so the website won't be responsive for any request. Please set up your own OpenAI key and follow the step below to test the functionality__

## OpenAI website
[Link](https://openai.com/api/)

## How to run the app from local:
### Installation
```shell
git clone https://github.com/phNam2/GPT-3-app.git
npm install
```
### Make sure you have node.js install
```bash
node -v
```
<p>If not, go to (https://nodejs.org/en/) to get the latest version</p>

### Create ".env" file in the "_GPT-3-app_" folder for API variable. In the file, write:
```bash
OPENAI_API='Your openAI key'
```

### Run
```bash
cd GPT-3-app
node index.js
```