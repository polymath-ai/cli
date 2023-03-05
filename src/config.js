import fs from "fs";
import os from "os";
import path from "path";

import { Base } from "./base.js";

export class Config extends Base {
  constructor(debug) {
    super(debug);
  }

  // Hunt around the filesystem for a config file
  load(configOption) {
    let rawConfig;
    const { debug, error } = this.say;

    // if there is a configOption:
    if (configOption) {
      // try to load it as a filename
      try {
        const filename = path.resolve(configOption);
        debug(`Looking for config at: ${filename}`);

        const config = fs.readFileSync(filename, "utf8");
        rawConfig = JSON.parse(config);
      } catch (e) {
        // if that fails, try to load ~/.polymath/config/<configOption>.json
        try {
          const homeDir = os.homedir();
          const configPath = path.join(
            homeDir,
            ".polymath",
            "config",
            `${configOption}.json`
          );
          debug(`Now, looking for config at: ${configPath}`);

          const config = fs.readFileSync(configPath, "utf8");
          rawConfig = JSON.parse(config);
        } catch (e) {
          error("No config file at that location.", e);
          process.exit(1);
        }
      }
    } else {
      // if that fails, try to load ~/.polymath/config/default.json
      const homeDir = os.homedir();
      const configPath = path.join(
        homeDir,
        ".polymath",
        "config",
        "default.json"
      );

      debug(`Now, looking for a default config at ${configPath}`);

      const config = fs.readFileSync(configPath, "utf8");
      rawConfig = JSON.parse(config);
    }

    return rawConfig;
  }
}
