import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DeathImage from "../components/DeathImage";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("DeathImage", () => {
  it("renders DeathImage Component", async () => {
    const allCharacters = ["Waldo", "Sonic The Hedgehog", "Death"];
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <App>
          <DeathImage
            setCurrentCharacter={handleClick}
            allCharacters={allCharacters}
          />{" "}
        </App>
      </BrowserRouter>
    );
    const deathImage = await screen.findByTestId("death-image");
    expect(deathImage).toBeInTheDocument();
    expect(deathImage).toHaveAttribute("src", "/assets/images/death.jpg");
  });
});
