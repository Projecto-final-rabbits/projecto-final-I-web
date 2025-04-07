import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/organisms";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("Modal Component", () => {
  const mockProps = {
    open: true,
    handleClose: vi.fn(),
    title: "Test Modal",
    children: <div>Modal Content</div>,
  };

  it("renders correctly when open is true", () => {
    const BODY = "Modal Content";
    const TITLE = "Test Modal";
    render(<Modal {...mockProps} />);
    const title = screen.getByText(TITLE);
    expect(title.textContent).toBe("Test Modal");
    const body = screen.getByText(BODY);
    expect(body.textContent).toBe("Modal Content");
  });

  it("calls handleClose when clicking outside if not disableEscapeKeyDown", () => {
    render(<Modal {...mockProps} />);
    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockProps.handleClose).toHaveBeenCalled();
    }
  });
});
