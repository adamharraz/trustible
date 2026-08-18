import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

/** Trustible's brand layer on top of Astryx Neutral. */
export const trustibleTheme = defineTheme({
  name: "trustible",
  extends: neutralTheme,
  typography: {
    scale: { base: 15, ratio: 1.22 },
    body: { family: "Figtree", fallbacks: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" },
    heading: { family: "Figtree", fallbacks: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif", weights: { 3: "bold", 4: "bold" } },
  },
  tokens: {
    "--color-accent": ["#344e5c", "#b9d2da"],
    "--color-background-body": ["#f5f8fa", "#17252c"],
    "--color-background-surface": ["#ffffff", "#22343d"],
    "--color-background-muted": ["#edf3f4", "#1d2c33"],
    "--color-text-primary": ["#263b46", "#f0f6f7"],
    "--color-text-secondary": ["#657b85", "#b4c6cc"],
    "--color-border-emphasized": ["#d9e5e8", "#3b525d"],
    "--color-icon-green": ["#2f7d6d", "#85cfbd"],
    "--color-background-green": ["#d8eee8", "#204d45"],
    "--color-background-orange": ["#f6ead0", "#604b21"],
    "--color-background-red": ["#f4dddd", "#5b2c2c"],
    "--radius-container": "18px",
    "--radius-element": "10px",
  },
  components: {
    button: {
      base: { fontWeight: "650", borderRadius: "10px" },
      "variant:primary": { backgroundColor: "#344e5c" },
      "variant:secondary": { borderColor: "#c8dadd", color: "#344e5c" },
      "variant:destructive": { backgroundColor: "#b45757" },
    },
    card: { base: { borderRadius: "18px" } },
    badge: { base: { borderRadius: "999px" } },
  },
});


