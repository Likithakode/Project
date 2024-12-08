import { LANGUAGE_TO_JUDGE0_ID } from "./constants";

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = "9fe202d363msh1b055d9d6305041p113c4djsna85bb8178fb2";

export async function submitCode(code: string, language: string, input: string = "") {
  // Submit the code
  const submission = await fetch(`${JUDGE0_API_URL}/submissions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": JUDGE0_API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_code: code,
      language_id: LANGUAGE_TO_JUDGE0_ID[language],
      stdin: input,
    }),
  });

  const { token } = await submission.json();

  // Poll for results
  let result;
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const response = await fetch(
      `${JUDGE0_API_URL}/submissions/${token}?fields=status_id,stdout,stderr,compile_output,message,time,memory`,
      {
        headers: {
          "X-RapidAPI-Key": JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    result = await response.json();

    if (result.status_id !== 1 && result.status_id !== 2) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    attempts++;
  }

  return result;
}