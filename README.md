# Blockchain Todo List

A decentralized Todo List application built with React.js and Ethereum Smart Contracts. This application allows users to create, manage, and track tasks on the blockchain.

## 🚀 Features

- **Create new tasks**
- **Toggle task completion status**
- **Persistent storage on blockchain**
- **Real-time updates**
- **Ethereum wallet integration**
- **Smart contract interaction**

## 📋 Prerequisites

To get started, ensure you have the following installed:

- Node.js (v14+ recommended)
- npm (Node Package Manager)
- Ganache
- Truffle Framework
- MetaMask or another Web3 wallet
- Git

## 🛠 Installation & Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd blockchain-todo-list
   npm install
   ```

2. **Install and Setup Ganache:**
   - Download and install Ganache from [Truffle Suite](https://trufflesuite.com/ganache/).
   - Launch Ganache and create a new workspace.
   - Ensure Ganache is running on `HTTP://127.0.0.1:7545`.

3. **Deploy Smart Contracts:**

   Run the following commands in your terminal:

   ```bash
   # Compile smart contracts
   truffle compile

   # Deploy contracts to local blockchain
   truffle migrate
   ```

4. **Enter Truffle Console:**

   ```bash
   truffle console
   ```

5. **Configure Contract in Console:**

   In the Truffle console, run:

   ```javascript
   // Create contract instance
   const todoList = await ToDoList.deployed();

   // Get contract address (copy this address)
   todoList.address;
   ```

6. **Frontend Configuration:**

   Create/update `config.js` in your frontend directory and add the contract address and ABI:

   ```javascript
   export const TODO_LIST_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
   export const TODO_LIST_ABI = [...]; // Copy ABI from build/contracts/TodoList.json
   ```

7. **Start the Application:**

   ```bash
   npm run dev
   ```

## 🔧 Smart Contract Functions

The smart contract includes the following main functions:

- **Create Task:**

   ```solidity
   function createTask(string memory _content) public;
   ```

   - Adds a new task to the blockchain.
   - Increments the task counter.
   - Emits `TaskCreated` event.

- **Toggle Task:**

   ```solidity
   function toggleCompleted(uint _id) public;
   ```

   - Toggles the completion status of a task.
   - Updates task status by ID.
   - Emits `TaskCompleted` event.

- **Fetch Task:**

   ```solidity
   function tasks(uint) public view returns (Task memory);
   ```

   - Returns task details using the task ID.
   - View function (doesn't modify state).

## 📝 Usage

1. Connect your Web3 wallet (MetaMask) to the application.
2. Ensure you're connected to the correct network (Ganache).
3. Create new tasks using the input field.
4. Toggle task completion status by clicking the status button.
5. All actions will require transaction confirmation through your wallet.

## 🔍 Smart Contract Details

The smart contract is deployed on the local Ganache blockchain and includes:

- Task mapping
- Task counter
- Event emission for task creation and completion
- Task struct with ID, content, and completion status

## 💡 Important Notes

- Ensure Ganache is running before starting the application.
- Keep your contract address and ABI updated in `config.js`.
- Each transaction (create/toggle task) requires gas fees.
- Always backup your Ganache workspace.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## ⚖️ License

This project is MIT licensed.





