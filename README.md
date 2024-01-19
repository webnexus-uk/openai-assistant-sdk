# openai-assistant-sdk

`openai-assistant-sdk` is a Node.js package designed to simplify interactions with OpenAI's Assistant API, particularly for managing conversations (threads) and processing responses with OpenAI's GPT models. This SDK handles thread creation, message sending, and response processing in a structured and easy-to-use manner.

## Features

- Easy to set up and integrate.
- Manages conversation threads with OpenAI's API.
- Simplifies sending messages and handling responses.

## Installation

Install the package using npm:

```bash
npm install openai-assistant-sdk
```

## Usage

### Response

```javascript
{
  message: "Absolutely, I'd love to help! What's the issue you're experiencing?",
  timestamp: 1705522107522,
  thread_id: 'thread_xxxxxxxxxxxxx'
}
```

### Basic Usage

To start using the SDK, you'll need to set up your OpenAI API key in your environment variables. Then, you can create an instance of OpenAIAssistant and interact with OpenAI's API.

Here's a basic example:

```javascript
const OpenAIAssistant = require("openai-assistant-sdk");
require("dotenv").config();

async function main() {
  try {
    const assistant = new OpenAIAssistant(process.env.ASSISTANT_ID);
    const reply = await assistant.addMessageToThread(
      "Can you help me with an issue?"
    );
    console.log(reply);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

main();
```

### Continuing a Conversation

If you have an existing thread and you want to continue the conversation, you can pass the thread_id as a second parameter to OpenAIAssistant.

```javascript
const OpenAIAssistant = require("openai-assistant-sdk");
require("dotenv").config();

async function main() {
  try {
    const assistant = new OpenAIAssistant(
      process.env.ASSISTANT_ID,
      "thread_xxxxxxxxxxxxxxx"
    );
    const reply = await assistant.addMessageToThread(
      "Remember the issue, what if we changed line 10?"
    );
    console.log(reply);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

main();
```

## Configuration

Before you start, make sure you have the following:

- An API key from OpenAI.
- The ASSISTANT_ID of your OpenAI model.

Store these in your environment variables for security, an example environment file has been provided.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

Coding Nexus - @CodingNexus
