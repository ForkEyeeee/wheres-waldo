import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import WaldoImage from "../components/WaldoImage";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("WaldoImage", () => {
  it("renders WaldoImage Component", async () => {
    const chosenCharacters = ["Waldo", "Sonic The Hedgehog", "Death"];
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    render(
      <WaldoImage
        setCurrentCharacter={handleClick}
        chosenCharacters={chosenCharacters}
      />
    );
    const sonicImage = await screen.findByTestId("waldo-image");
    expect(sonicImage).toBeInTheDocument();
    expect(sonicImage).toHaveAttribute("src", "/assets/images/waldo.png");
  });
});
