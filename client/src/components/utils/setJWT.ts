import { v4 as uuidv4 } from "uuid";

const setJWT = async (e: React.FormEvent<HTMLFormElement>) => {
  try {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: uuidv4() }),
    });
    const { data, success } = await response.json();
    if (!response.ok) {
      throw new Error(await response.text());
    } else if (success) {
      localStorage.setItem("jwt", data.token);
      return data.startTime;
    }
  } catch (error) {
    console.error(error);
  }
};

export default setJWT;
