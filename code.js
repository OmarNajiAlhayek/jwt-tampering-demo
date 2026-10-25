const jwt = require('jsonwebtoken');

// In production, always use environment variables (e.g., process.env.JWT_SECRET)
const SERVER_SECRET = 'my_super_secret_key_12345';

const userPayload = {
  userId: 101,
  username: 'ahmad',
  role: 'user' 
};

/**
 * Generates a signed JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, SERVER_SECRET, { expiresIn: '1h' });
};

/**
 * Verifies a JWT token against the server secret
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SERVER_SECRET);
    console.log('✅ Verification successful! Payload data:');
    console.log(`   User: ${decoded.username} | Role: ${decoded.role}`);
    return decoded;
  } catch (error) {
    console.log(`🛑 Token validation failed: ${error.name} - ${error.message}`);
    return null;
  }
};

/**
 * Simulates a client-side tampering attempt
 */
const tamperToken = (token) => {
  const [header, payload, signature] = token.split('.');
  
  // Decode payload, modify the role, and re-encode to Base64
  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  decodedPayload.role = 'admin'; // <-- The tampering happens here

  // Use base64url to match JWT standards
  const tamperedPayloadBase64 = Buffer.from(JSON.stringify(decodedPayload)).toString('base64url');
  
  return `${header}.${tamperedPayloadBase64}.${signature}`;
};

// ==========================================
// Execution Flow
// ==========================================

console.log('--- 1. Generating Original Token ---');
const originalToken = generateToken(userPayload);
console.log(originalToken);

console.log('\n--- 2. Testing Valid Token ---');
verifyToken(originalToken);

console.log('\n--- 3. Testing Tampered Token (Role changed to admin) ---');
const tamperedToken = tamperToken(originalToken);
verifyToken(tamperedToken);
