# Fair Solver (JavaScript Implementation)

A JavaScript implementation of a fair and verifiable random number generator using cryptographic hashing.

## Description

Fair Solver is a tool that generates random numbers in a deterministic and verifiable way. By using cryptographic hashing, it ensures that the generated numbers are fair and can be independently verified by anyone with the same hash code and hash key.

This can be particularly useful for:
- Online games requiring fair random number generation
- Lotteries and raffles
- Any application where transparency in randomness is important

## Features

- Deterministic random number generation
- Verifiable results using SHA-256 hashing
- Customizable range for generated numbers
- Simple and lightweight implementation
- User-friendly web interface
- Works in both browser and Node.js environments

## Requirements

- Modern web browser with JavaScript enabled
- For Node.js: Node.js 12.0 or higher

## Installation

1. Clone this repository:
```bash
git clone https://github.com/JikooGames/FairSolver.git
```

2. Open the index.html file in your web browser or serve it using a web server.

## Usage

### Web Interface

1. Open the index.html file in your web browser
2. Enter your hash code and hash key in the respective input fields
3. Set the minimum and maximum numbers for your desired range
4. Click the "Generate Number" button to see the result

### JavaScript API

You can also use the Fair Solver in your own JavaScript projects:

```javascript
// Browser environment
async function generateRandomNumber(hashCode, hashKey, minNumber, maxNumber) {
    const encoder = new TextEncoder();
    const data = encoder.encode(hashKey + hashCode);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const num = BigInt('0x' + hashHex);
    const range = BigInt(maxNumber - minNumber + 1);
    const generatedNumber = Number(num % range) + minNumber;

    return generatedNumber;
}

// Example usage
generateRandomNumber(
    "JXRMUsadp9soYdokALhS1x9kRpLPTYmx4e",
    "26ea40931f7aa41d4de80d3e7764017169cd8be8d2981668176f6e3a57963da5",
    1,
    6
).then(result => console.log("Generated number:", result));
```

### Node.js Usage

For Node.js environments, you can use the following code:

```javascript
const crypto = require('crypto');

function generateRandomNumber(hashCode, hashKey, minNumber, maxNumber) {
    const hash = crypto.createHash('sha256').update(hashKey + hashCode).digest('hex');
    const num = BigInt('0x' + hash);
    const range = BigInt(maxNumber - minNumber + 1);
    const generatedNumber = Number(num % range) + minNumber;

    return generatedNumber;
}

// Example usage
const result = generateRandomNumber(
    "JXRMUsadp9soYdokALhS1x9kRpLPTYmx4e",
    "26ea40931f7aa41d4de80d3e7764017169cd8be8d2981668176f6e3a57963da5",
    1,
    6
);
console.log("Generated number:", result);
```

## How It Works

1. The system combines a hash key and a hash code
2. It applies the SHA-256 hashing algorithm to this combination
3. The resulting hash is converted to a big integer using JavaScript's BigInt
4. The integer is then mapped to the desired range using modulo arithmetic
5. The final result is a number within the specified range

This method ensures that:
- The same hash code and key will always produce the same number
- The distribution is uniform across the specified range
- The result is cryptographically secure and difficult to predict without knowing both the hash code and key

## Example

With the default values in the code:
- Minimum number: 1
- Maximum number: 6
- Hash code: "JXRMUsadp9soYdokALhS1x9kRpLPTYmx4e"
- Hash key: "26ea40931f7aa41d4de80d3e7764017169cd8be8d2981668176f6e3a57963da5"

The generated number will always be 2.

## Technical Implementation

The JavaScript implementation uses:
- Web Crypto API (crypto.subtle) in browser environments
- Node.js crypto module in Node.js environments
- JavaScript's BigInt for handling large integers
- Modern JavaScript features like async/await for browser implementation
- TextEncoder for encoding strings to byte arrays

## Use Cases

### Gaming

Fair random number generation is crucial for online gaming platforms. Fair Solver can be used to:
- Roll dice in board games
- Draw cards in card games
- Generate random events in role-playing games

### Lotteries

For online lotteries, Fair Solver provides:
- Transparent number generation
- Verifiable results
- Fair distribution of outcomes

### Educational Purposes

This tool can be used to demonstrate:
- Cryptographic hashing
- Deterministic random number generation
- Modular arithmetic
- Web Crypto API usage
- BigInt operations in JavaScript

## Browser Compatibility

This implementation uses modern JavaScript features and APIs:
- Web Crypto API (supported in all modern browsers)
- BigInt (supported in all modern browsers)
- TextEncoder (supported in all modern browsers)

For older browsers, you may need to use polyfills or alternative implementations.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
