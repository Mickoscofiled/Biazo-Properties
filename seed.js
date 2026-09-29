const { execSync } = require('child_process');
const crypto = require('crypto');

const namespaceId = '707ed79462584c2c96f1fc5ffc72f5e6';

const run = (cmd) => {
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed: ${e.message}`);
  }
};

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const owner1Pass = 'Biazo2026!';
const owner1Hash = hashPassword(owner1Pass);
const owner2Pass = 'LuxuryDubai!';
const owner2Hash = hashPassword(owner2Pass);

run(`npx wrangler kv key put "creds:owner1" "${owner1Hash}" --namespace-id=${namespaceId} --remote`);
run(`npx wrangler kv key put "name:owner1" "Owner One" --namespace-id=${namespaceId} --remote`);

run(`npx wrangler kv key put "creds:owner2" "${owner2Hash}" --namespace-id=${namespaceId} --remote`);
run(`npx wrangler kv key put "name:owner2" "Owner Two" --namespace-id=${namespaceId} --remote`);

console.log('Seeded owners into remote KV.');
