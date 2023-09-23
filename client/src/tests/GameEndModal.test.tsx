import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import GameEndModal from "../components/GameEndModal";
import { BrowserRouter } from "react-router-dom";

describe("GameEndModal", () => {
  it("renders GameEndModal Component", async () => {
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <GameEndModal
          handleClick={handleClick}
          handleAddScore={handleClick}
          onClose={handleClick}
          gameState={handleClick}
          elapsedTime={handleClick}
        />
      </BrowserRouter>
    );
    expect(screen.getByTestId("game-end-modal")).toBeInTheDocument();
    expect(screen.getByTestId("game-end-modal")).toBeVisible();
  });
});
