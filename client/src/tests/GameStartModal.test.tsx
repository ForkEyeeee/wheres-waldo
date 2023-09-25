import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import GameStartModal from "../components/GameStartModal";
import { BrowserRouter } from "react-router-dom";

describe("GameEndModal", () => {
  it("renders GameStartModal Component", async () => {
    const handleClick: any = vi.fn();
    render(
      <BrowserRouter>
        <GameStartModal
          handleClick={handleClick}
          onClose={handleClick}
          gameState={handleClick}
          setGameState={handleClick}
          setName={handleClick}
          setStartTime={handleClick}
        />
      </BrowserRouter>
    );
    expect(screen.getByTestId("game-start-modal")).toBeInTheDocument();
    expect(screen.getByTestId("game-start-modal")).toBeVisible();
  });
});
