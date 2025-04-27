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
});
