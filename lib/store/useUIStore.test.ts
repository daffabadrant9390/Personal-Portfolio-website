import { beforeEach, describe, expect, it } from "vitest";
import { useUIStore } from "./useUIStore";

beforeEach(() => {
  useUIStore.setState({ isMobileMenuOpen: false });
});

describe("useUIStore", () => {
  it("starts with the mobile menu closed", () => {
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
  });

  it("opens and closes the menu explicitly", () => {
    useUIStore.getState().setMobileMenuOpen(true);
    expect(useUIStore.getState().isMobileMenuOpen).toBe(true);

    useUIStore.getState().setMobileMenuOpen(false);
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
  });

  it("toggles the menu", () => {
    useUIStore.getState().toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(true);

    useUIStore.getState().toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
  });
});
