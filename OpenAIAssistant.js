const ThreadManager = require("./utils/ThreadManager");
const RunManager = require("./utils/RunManager");

class OpenAIAssistant {
  constructor(assistant_id) {
    this.assistant_id = assistant_id;
    this.threadManager = new ThreadManager();
    this.runManager = new RunManager(this.assistant_id);
  }

  async addMessageToThread(message, thread_id = "") {
    try {
      this.thread_id = thread_id || (await this.threadManager.createThread());
      console.log("thread_id", this.thread_id);
      await this.threadManager.addMessageToThread(this.thread_id, message);
      return await this.runManager.runThread(this.thread_id);
    } catch (error) {
      throw new Error("Unable to add message to thread: " + error.message);
    }
  }
}

module.exports = OpenAIAssistant;
