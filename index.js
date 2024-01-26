const { SignJWT } = require("jose");
const { createPrivateKey } = require("crypto");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const {
  TEAM_ID,
  PRIVATE_KEY,
  CLIENT_ID,
  KEY_ID,
  EXPIRES_IN = 86400 * 180,
} = process.env;

/**
 * How long is the secret valid in seconds.
 * @default 15780000
 */

(async () => {
  console.log(`
Apple client secret generated. Valid until:
${await new SignJWT({})
  .setAudience("https://appleid.apple.com")
  .setIssuer(TEAM_ID)
  .setIssuedAt()
  .setSubject(CLIENT_ID)
  .setProtectedHeader({ alg: "ES256", kid: KEY_ID })
  .sign(createPrivateKey(PRIVATE_KEY.replace(/\\n/g, "\n")))}`);
})();
