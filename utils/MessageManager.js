const OpenAI = require("openai");
require("dotenv").config();

class MessageManager {
  constructor() {
    this.openai = new OpenAI();
  }

  async getMessageContents(thread_id, message_id) {
    try {
      const message = await this.openai.beta.threads.messages.retrieve(
        thread_id,
        message_id
      );

      if (
        message &&
        message.content &&
        message.content[0] &&
        message.content[0].text
      ) {
        return {
          message: message.content[0].text.value,
          timestamp: Date.now(),
          thread_id: thread_id,
        };
      } else {
        throw new Error("Error: Unexpected message structure");
      }
    } catch (error) {
      throw new Error("Unable to get message contents: " + error.message);
    }
  }
}

module.exports = MessageManager;
