#!/usr/bin/env node

import { orchestrate } from "../engine/orchestrator.js";
import type { Mode } from "../types";


function parseArgs() {
  const args = process.argv.slice(2);
  const contentParts: string[] = [];

  let mode: Mode = "public-public";
  let models = ["chatgpt", "grok"];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--mode") {
      mode = args[++i] as Mode;
    } else if (args[i] === "--models") {
      models = args[++i].split(",");
    } else {
      contentParts.push(args[i]);
    }
  }

  return { content: contentParts.join(" "), mode, models };
}

async function main() {
  const { content, mode, models } = parseArgs();

  if (!content) {
    console.error("Usage: elyon-validate [--mode public-public] [--models chatgpt,grok] <text>");
    process.exit(1);
  }

  const result = await orchestrate({ content, mode, models });
  console.log(JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});




