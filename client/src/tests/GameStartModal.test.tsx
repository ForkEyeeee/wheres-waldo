import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import GameStartModal from "../components/GameStartModal";
import { BrowserRouter } from "react-router-dom";

describe("GameEndModal", () => {
  it("renders GameStartModal Component", async () => {
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <GameStartModal
          handleClick={handleClick}
          handleRecordInitialTime={handleClick}
          onClose={handleClick}
          gameState={handleClick}
          setGameState={handleClick}
        />
      </BrowserRouter>
    );
    expect(screen.getByTestId("game-start-modal")).toBeInTheDocument();
    expect(screen.getByTestId("game-start-modal")).toBeVisible();
  });
});
