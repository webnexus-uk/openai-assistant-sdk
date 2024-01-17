const OpenAI = require("openai");
require("dotenv").config();

class ThreadManager {
  constructor() {
    this.openai = new OpenAI();
  }

  async createThread() {
    try {
      const emptyThread = await this.openai.beta.threads.create();
      return emptyThread.id;
    } catch (error) {
      throw new Error("Unable to create thread: " + error.message);
    }
  }

  async addMessageToThread(thread_id, message) {
    try {
      await this.openai.beta.threads.messages.create(thread_id, {
        role: "user",
        content: message,
      });
    } catch (error) {
      throw new Error("Unable to add message to thread: " + error.message);
    }
  }
}

module.exports = ThreadManager;
