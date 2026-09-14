import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  "docs/OPERGRID-PRODUCT.md",
  "docs/APPLICATION-ARCHITECTURE.md",
  "docs/FEATURE-ARCHITECTURE.md",
  "docs/ROUTING-CONTRACT.md",
  "docs/FEATURE-RULES.md",
  "docs/AI-CODING-PROTOCOL.md",
  "docs/DEFINITION-OF-DONE.md",
  "docs/DESIGN-SYSTEM.md",
  "docs/UI-PRIMITIVES.md",
  "docs/APP-SHELL.md",
  "docs/UI-LABORATORY.md",
  "docs/DEVELOPMENT-REQUIREMENTS.md",
  "docs/DEPENDENCY-POLICY.md",
  "docs/GIT-WORKFLOW.md",
  "docs/templates/FEATURE-README.md",
];

const failures = [];

for (const relativePath of requiredFiles) {
  const fullPath = path.join(root, relativePath);

  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing required contract: ${relativePath}`);

    continue;
  }

  const stat = fs.statSync(fullPath);

  if (!stat.isFile() || stat.size === 0) {
    failures.push(`Invalid or empty contract: ${relativePath}`);
  }
}

const agentsPath = path.join(root, "AGENTS.md");
const productPath = path.join(root, "docs", "OPERGRID-PRODUCT.md");
const designSystemPath = path.join(root, "docs", "DESIGN-SYSTEM.md");

if (fs.existsSync(agentsPath)) {
  const agents = fs.readFileSync(agentsPath, "utf8");

  if (!agents.includes("Global UI, contextual workflow")) {
    failures.push("AGENTS.md is missing the core OPERGRID UI/workflow rule.");
  }

  if (!agents.includes("npm run check")) {
    failures.push("AGENTS.md is missing the mandatory quality gate.");
  }
}

if (fs.existsSync(productPath)) {
  const product = fs.readFileSync(productPath, "utf8");

  if (!product.includes("operational web platform")) {
    failures.push("OPERGRID-PRODUCT.md is missing product identity.");
  }

  if (!product.includes("It is not:")) {
    failures.push("OPERGRID-PRODUCT.md is missing non-goals.");
  }
}

if (fs.existsSync(designSystemPath)) {
  const designSystem = fs.readFileSync(designSystemPath, "utf8");

  if (!designSystem.includes("Industrial Precision + Enterprise Clarity")) {
    failures.push("DESIGN-SYSTEM.md is missing the OPERGRID design philosophy.");
  }

  if (!designSystem.includes("Global UI, contextual workflow")) {
    failures.push("DESIGN-SYSTEM.md is missing the global UI rule.");
  }
}

if (failures.length > 0) {
  console.error("");
  console.error("OPERGRID contract validation failed:");
  console.error("");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  console.error("");
  process.exit(1);
}

console.log("OPERGRID product/AI contract check: PASS");
