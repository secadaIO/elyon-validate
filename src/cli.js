import { Command } from "commander";
import fs from "fs";
import { orchestrate } from "./engine/orchestrator.js";
import { agreementScore } from "./validator/score.js";
import { findConflicts } from "./validator/compare.js";
import { determineConsensus } from "./validator/consensus.js";
import { generateReport } from "./output/report.js";

const program = new Command();

program
  .command("validate")
  .requiredOption("-i, --input <file>")
  .option("-m, --models <models>", "chatgpt,grok")
  .action(async (opts) => {
    const content = fs.readFileSync(opts.input, "utf-8");
    const models = opts.models.split(",");

    const responses = await orchestrate({
      content,
      mode: "public-public",
      models
    });

    const score = agreementScore(
      responses[0].content,
      responses[1].content
    );

    const result = {
      agreementScore: score,
      conflicts: findConflicts(
        responses[0].content,
        responses[1].content
      ),
      consensus: determineConsensus(score)
    };

    const report = generateReport(responses, result);
    console.log(JSON.stringify(report, null, 2));
  });

program.parse();
