import { v4 as uuidv4 } from "uuid";

const setJWT = async event => {
  event.preventDefault();
  const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: uuidv4() }),
  });
  const { data, success, message } = await response.json();

  if (success) {
    localStorage.setItem("jwt", data.token);
    return data.startTime; // return the startTime here
  } else {
    // setFormError(message);
    return null; // return null or some error code when not successful
  }
};

export default setJWT;
