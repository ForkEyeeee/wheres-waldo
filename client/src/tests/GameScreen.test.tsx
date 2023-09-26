import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import WaldoImage from "../components/WaldoImage";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("PopOverMenu", () => {
  it("renders PopOverMenu Component", () => {
    const chosenCharacters = ["Waldo", "Sonic The Hedgehog", "Death"];
    const handleClick: any = vi.fn();
    render(
      <WaldoImage
        setCurrentCharacter={handleClick}
        chosenCharacters={chosenCharacters}
      />
    );
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    handleClick("hello", 1);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("popover-buttons")).toBeInTheDocument();
  });
});
