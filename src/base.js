import chalk from "chalk";

const error = (...args) => console.error(chalk.red("ERROR:", ...args));

// Base class with all the useful infrastructure.
export class Base {
  constructor(isDebug) {
    this.isDebug = isDebug;
    this.say = {
      debug: this.#debug.bind(this),
      error,
    }
  }

  #debug(...args) {
    if (this.isDebug) {
      console.log(chalk.blue("DEBUG:", ...args));
    }
  }
}
