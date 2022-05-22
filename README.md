# GPT-3-app
[Link](https://openai-search-app.herokuapp.com) to the web page on heroku

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

### Create .env file in the _GPT-3-app_ folder for API variable. In the file, write:
```bash
OPENAI_API='Your openAI key'
```

### Run
```bash
cd GPT-3-app
node index.js
```