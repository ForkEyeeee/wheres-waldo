import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TimerCounter from "../components/TimeCounter";

describe("TimeCounter", () => {
  it("renders TimeCounter Component", async () => {
    const handleClick: any = vi.fn();
    const { container } = render(
      <TimerCounter
        gameState={handleClick}
        startTime={handleClick}
        timeElapsed={handleClick}
        setTimeElapsed={handleClick}
      />
    );
    console.log(container.textContent);
    expect(container.textContent).toContain("min");
    expect(container.textContent).toContain("s");
  });
});
