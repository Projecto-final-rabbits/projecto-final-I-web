import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'; // Importa las utilidades de Testing Library
import App from './App';  // Importa el componente que estás probando

test('increments counter value when button is clicked', () => {
  render(<App />);  // Renderiza el componente App

  // Verifica que el contador comienza en 0
  const countElement = screen.getByText(/count is 0/i);  // Busca el texto que contiene 'count is 0'
  expect(countElement).toBeInTheDocument();  // Asegúrate de que esté en el DOM

  // Haz clic en el botón para incrementar el contador
  const button = screen.getByRole('button');
  fireEvent.click(button);  // Simula un clic en el botón

  // Verifica que el contador ahora es 1
  const updatedCountElement = screen.getByText(/count is 1/i);  // Busca el texto 'count is 1'
  expect(updatedCountElement).toBeInTheDocument();  // Asegúrate de que esté en el DOM
});
