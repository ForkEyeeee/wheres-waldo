import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SonicImage from "../components/SonicImage";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("SonicImage", () => {
  it("renders SonicImage Component", async () => {
    const allCharacters = ["Waldo", "Sonic The Hedgehog", "Death"];
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <App>
          <SonicImage
            setCurrentCharacter={handleClick}
            allCharacters={allCharacters}
          />{" "}
        </App>
      </BrowserRouter>
    );
    const sonicImage = await screen.findByTestId("sonic-image");
    expect(sonicImage).toBeInTheDocument();
    expect(sonicImage).toHaveAttribute("src", "/assets/images/sonic.webp");
  });
});
