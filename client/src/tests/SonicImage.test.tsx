import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("SonicImage", () => {
  it("renders SonicImage Component", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const sonicImage = await screen.findByTestId("sonic-image");
    expect(sonicImage).toBeInTheDocument();
    expect(sonicImage).toHaveAttribute("src", "/assets/images/sonic.webp");
  });
});
