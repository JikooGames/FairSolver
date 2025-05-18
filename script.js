// JavaScript implementation of the PHP FairSolver

// Default values (used only for Node.js environment)
const DEFAULT_MIN_NUMBER = 1;
const DEFAULT_MAX_NUMBER = 6;
const DEFAULT_HASH_CODE = "JXRMUsadp9soYdokALhS1x9kRpLPTYmx4e";
const DEFAULT_HASH_KEY = "26ea40931f7aa41d4de80d3e7764017169cd8be8d2981668176f6e3a57963da5";

// This hashCode and hashKey should always return number 2 if minNumber is 1 and maxNumber is 6

// Function to create SHA-256 hash
async function generateNumber(hashCodeParam, hashKeyParam, minNumberParam, maxNumberParam) {
    // Use provided parameters or default values
    const hashCode = hashCodeParam || DEFAULT_HASH_CODE;
    const hashKey = hashKeyParam || DEFAULT_HASH_KEY;
    const minNumber = minNumberParam !== undefined ? minNumberParam : DEFAULT_MIN_NUMBER;
    const maxNumber = maxNumberParam || DEFAULT_MAX_NUMBER;

    // Create the hash using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(hashKey + hashCode);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Convert hex to BigInt (equivalent to gmp_init in PHP)
    const num = BigInt('0x' + hashHex);

    // Calculate modulo and add minNumber (equivalent to PHP's gmp_mod and gmp_intval)
    const range = BigInt(maxNumber - minNumber + 1);
    const generatedNumber = Number(num % range) + minNumber;

    // Display the result
    document.getElementById('result').innerHTML = 
        `<h1>Generated number with this hash code and hash key: ${generatedNumber}</h1>
         <p>Range: ${minNumber} to ${maxNumber}</p>`;

    console.log(`Generated number: ${generatedNumber}`);
    return generatedNumber;
}

// For Node.js environment (if not running in browser)
if (typeof window === 'undefined') {
    const crypto = require('crypto');

    // Alternative implementation for Node.js
    function generateNumberNode(hashCode = DEFAULT_HASH_CODE, hashKey = DEFAULT_HASH_KEY, 
                               minNumber = undefined, maxNumber = DEFAULT_MAX_NUMBER) {
        // Handle minNumber separately to allow 0 as a valid input
        minNumber = minNumber !== undefined ? minNumber : DEFAULT_MIN_NUMBER;
        const hash = crypto.createHash('sha256').update(hashKey + hashCode).digest('hex');
        const num = BigInt('0x' + hash);
        const range = BigInt(maxNumber - minNumber + 1);
        const generatedNumber = Number(num % range) + minNumber;

        console.log(`Generated number with this hash code and hash key: ${generatedNumber}`);
        console.log(`Range: ${minNumber} to ${maxNumber}`);
        return generatedNumber;
    }

    generateNumberNode();
}
