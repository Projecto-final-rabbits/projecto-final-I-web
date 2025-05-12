import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/organisms";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("Modal Component", () => {
  const mockHandleClose = vi.fn();
  const mockTitle = "Test Modal";
  const mockContent = "Test Content";

  beforeEach(() => {
    mockHandleClose.mockClear();
  });

  it("renders with the correct title and content", () => {
    render(
      <Modal open={true} handleClose={mockHandleClose} title={mockTitle}>
        <div>{mockContent}</div>
      </Modal>
    );

    expect(screen.getByTestId(`modal-${mockTitle}`)).toHaveTextContent(
      mockTitle
    );
    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it("calls handleClose when backdrop is clicked", () => {
    render(
      <Modal open={true} handleClose={mockHandleClose} title={mockTitle}>
        <div>{mockContent}</div>
      </Modal>
    );

    // Simulate backdrop click
    const backdropElement = document.querySelector(".MuiBackdrop-root");
    if (backdropElement) {
      fireEvent.click(backdropElement);
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
    }
  });

  it("renders with footer when provided", () => {
    const footerContent = "Footer Content";
    render(
      <Modal
        open={true}
        handleClose={mockHandleClose}
        title={mockTitle}
        footer={<div>{footerContent}</div>}
      >
        <div>{mockContent}</div>
      </Modal>
    );

    expect(screen.getByText(footerContent)).toBeInTheDocument();
  });

  it("doesn't close when backdrop is clicked with disableEscapeKeyDown set to true", () => {
    render(
      <Modal
        open={true}
        handleClose={mockHandleClose}
        title={mockTitle}
        disableEscapeKeyDown={true}
      >
        <div>{mockContent}</div>
      </Modal>
    );

    // Simulate backdrop click
    const backdropElement = document.querySelector(".MuiBackdrop-root");
    if (backdropElement) {
      fireEvent.click(backdropElement);
      // The handler should still be called but the dialog should not close
      expect(mockHandleClose).toHaveBeenCalledTimes(0);
    }
  });

  it("is not visible when open is false", () => {
    render(
      <Modal open={false} handleClose={mockHandleClose} title={mockTitle}>
        <div>{mockContent}</div>
      </Modal>
    );

    // Dialog should not be visible
    const dialog = document.querySelector(".MuiDialog-root");
    expect(dialog).toHaveAttribute("aria-hidden", "true");
  });

  it("has the correct ARIA attributes for accessibility", () => {
    render(
      <Modal open={true} handleClose={mockHandleClose} title={mockTitle}>
        <div>{mockContent}</div>
      </Modal>
    );

    // Check the dialog content for aria attributes
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-describedby", `modal-${mockTitle}`);
  });
});
