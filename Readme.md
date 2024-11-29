# Logo Maker

This project generates logos using the Hugging Face API.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Hugging Face API key

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Karsentiz/logo-maker.git
   cd logo-maker
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Hugging Face API key:

   ```env
   HUGGINGFACE_API_KEY=your_hugging_face_api_key
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

## Troubleshooting

- Ensure your Hugging Face API key is correctly set in the `.env` file.
- Check the console for any error messages.

## Firebase Setup

**Install the Firebase CLI:**

```sh
npm install -g firebase-tools
```

**Login to Firebase:**

```sh
firebase login
```

### Firebase Environment Variables

To deploy using Firebase, you need to add your Hugging Face API key as a secret in Firebase:

Set your Hugging Face API key as a secret:

    ```sh
    firebase functions:secrets:set HUGGINGFACE_API_KEY
    ```

### Enable Firebase Experiments

To use the latest Firebase features for web frameworks, you need to enable Firebase experiments:

    ```sh
    firebase experiments:enable webframeworks
    ```

This command enables experimental features in Firebase that support web frameworks, providing better integration and new capabilities for your project.

## Deployment

To deploy this project using Firebase, run this:

```sh
npm run deploy
```

### Automatic Deployment

To set up automatic deployment every time you push to the `main` branch, follow these steps:

1. **Generate a Firebase CI token:**

   ```sh
   firebase login:ci
   ```

   Copy the generated token.

2. **Add the Firebase token as a GitHub secret:**

   1. Go to your repository on GitHub.
   2. Click on `Settings`.
   3. Click on `Secrets` in the left sidebar.
   4. Click on `New repository secret`.
   5. Add a new secret with the name `FIREBASE_TOKEN` and the token you copied as the value.

## License

This project is licensed under the MIT License.
