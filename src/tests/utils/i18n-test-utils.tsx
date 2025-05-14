import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18n instance for testing
i18n.use(initReactI18next).init({
  lng: "es", // Default to Spanish for tests
  fallbackLng: "es",
  resources: {
    en: {
      translation: {
        common: {
          loading: "Loading...",
          errorLoading: "Error loading {{resource}}",
          or: "or",
        },
        products: {
          product: "Product",
          products: "products",
          warehouse: "Warehouse",
          category: "Category",
        },
        providers: {
          manufacturer: "Manufacturer",
          providers: "providers",
          country: "Country",
        },
        login: {
          title: "Login",
          welcome: "Welcome, login to view your products",
          googleSignIn: "Sign in with Google",
          email: "Email",
          password: "Password",
          continue: "Continue",
        },
        users: {
          fullName: "Full Name",
          email: "Email",
          role: "Role",
        },
      },
    },
    es: {
      translation: {
        common: {
          loading: "Cargando...",
          errorLoading: "Error al cargar {{resource}}",
          or: "o",
        },
        products: {
          product: "Producto",
          products: "productos",
          warehouse: "Bodega",
          category: "Categoría",
        },
        providers: {
          manufacturer: "Fabricante",
          providers: "proveedores",
          country: "Pais",
        },
        login: {
          title: "Inicio de sesión",
          welcome: "Bienvenido, inicia sesión para ver tus productos",
          googleSignIn: "Iniciar sesión con Google",
          email: "Email",
          password: "Contraseña",
          continue: "Continuar",
        },
        users: {
          fullName: "Nombre completo",
          email: "Correo electrónico",
          role: "Rol",
        },
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// i18n wrapper for tests
export const I18nTestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;

// Helper to switch language for specific tests
export const switchLanguage = (language: "en" | "es") => {
  return i18n.changeLanguage(language);
};

export default i18n;
