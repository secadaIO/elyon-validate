"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const orchestrator_js_1 = require("./engine/orchestrator.js");
const score_js_1 = require("./validator/score.js");
const compare_js_1 = require("./validator/compare.js");
const consensus_js_1 = require("./validator/consensus.js");
const report_js_1 = require("./output/report.js");
const program = new commander_1.Command();
program
    .command("validate")
    .requiredOption("-i, --input <file>")
    .option("-m, --models <models>", "chatgpt,grok")
    .action(async (opts) => {
    const content = fs_1.default.readFileSync(opts.input, "utf-8");
    const models = opts.models.split(",");
    const responses = await (0, orchestrator_js_1.orchestrate)({
        content,
        mode: "public-public",
        models
    });
    const score = (0, score_js_1.agreementScore)(responses[0].content, responses[1].content);
    const result = {
        agreementScore: score,
        conflicts: (0, compare_js_1.findConflicts)(responses[0].content, responses[1].content),
        consensus: (0, consensus_js_1.determineConsensus)(score)
    };
    const report = (0, report_js_1.generateReport)(responses, result);
    console.log(JSON.stringify(report, null, 2));
});
program.parse();
