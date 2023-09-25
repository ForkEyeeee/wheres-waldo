import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import GameEndModal from "../components/GameEndModal";
import { BrowserRouter } from "react-router-dom";

describe("GameEndModal", () => {
  it("renders GameEndModal Component", async () => {
    const handleClick: any = vi.fn();
    render(
      <BrowserRouter>
        <GameEndModal
          handleClick={handleClick}
          handleAddScore={handleClick}
          onClose={handleClick}
          gameState={handleClick}
          highScore={handleClick}
          setGameState={handleClick}
        />
      </BrowserRouter>
    );
    expect(screen.getByTestId("game-end-modal")).toBeInTheDocument();
    expect(screen.getByTestId("game-end-modal")).toBeVisible();
  });
});
