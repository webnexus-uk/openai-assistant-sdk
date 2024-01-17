const OpenAI = require("openai");
const MessageManager = require("./MessageManager");
require("dotenv").config();

class RunManager {
  constructor(assistant_id) {
    this.assistant_id = assistant_id;
    this.openai = new OpenAI();
    this.messageManager = new MessageManager();
  }

  async runThread(thread_id) {
    try {
      const run = await this.openai.beta.threads.runs.create(thread_id, {
        assistant_id: this.assistant_id,
      });

      this.run_id = run.id;
      return await this.getRun(thread_id, this.run_id);
    } catch (error) {
      throw new Error("Unable to run assistant: " + error.message);
    }
  }

  async getRun(thread_id, run_id) {
    try {
      let run;
      do {
        run = await this.openai.beta.threads.runs.retrieve(thread_id, run_id);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } while (run.status !== "completed");
      return await this.getRunThread(thread_id, run_id);
    } catch (error) {
      throw new Error("Unable to get run: " + error.message);
    }
  }

  async getRunThread(thread_id, run_id) {
    try {
      const runStep = await this.openai.beta.threads.runs.steps.list(
        thread_id,
        run_id
      );
      this.step_id = runStep.body.last_id;
      return await this.getMessageId(thread_id, run_id, this.step_id);
    } catch (error) {
      throw new Error("Unable to get run thread: " + error.message);
    }
  }

  async getMessageId(thread_id, run_id, step_id) {
    try {
      const runStep = await this.openai.beta.threads.runs.steps.retrieve(
        thread_id,
        run_id,
        step_id
      );
      this.message_id = runStep.step_details.message_creation.message_id;
      return await this.messageManager.getMessageContents(
        thread_id,
        this.message_id
      );
    } catch (error) {
      throw new Error("Unable to get message id: " + error.message);
    }
  }
}

module.exports = RunManager;
