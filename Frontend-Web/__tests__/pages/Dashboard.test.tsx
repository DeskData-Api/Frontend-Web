import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Dashboard from "../../src/pages/Dashboard";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock dos componentes filhos
vi.mock("../../src/components/layouts/Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock("../../src/components/layouts/Content/Content", () => ({
  default: () => <div data-testid="content">Content</div>,
}));

vi.mock("../../src/components/layouts/Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("../../src/components/ui/ChatbotButton", () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="chatbot-button" onClick={onClick}>Chatbot</button>
  ),
}));

vi.mock("../../src/components/ui/ChatbotModal", () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? <div data-testid="chatbot-modal"><button onClick={onClose}>Fechar</button></div> : null,
}));

describe("Dashboard Page", () => {
  it("deve renderizar o Header, Content e Footer corretamente", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("deve abrir e fechar o Chatbot corretamente", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Verifica se o chatbot começa fechado
    expect(screen.queryByTestId("chatbot-modal")).not.toBeInTheDocument();

    // Clica no botão para abrir o chatbot
    fireEvent.click(screen.getByTestId("chatbot-button"));
    expect(screen.getByTestId("chatbot-modal")).toBeInTheDocument();

    // Clica no botão dentro do chatbot para fechar
    fireEvent.click(screen.getByText("Fechar"));
    expect(screen.queryByTestId("chatbot-modal")).not.toBeInTheDocument();
  });
});
