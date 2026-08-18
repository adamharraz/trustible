# Astryx migration notes

Trustible's UI now uses Astryx Core 0.4.3 with the neutral theme package and StyleX peer dependency.

## Adopted Astryx surface

- Theme provider in app/layout.tsx
- Astryx Button, Card, Badge, Heading, and Text primitives in app/components.tsx
- Astryx reset/theme CSS imports before the Trustible brand layer
- Trustible blue-grey token overrides: #344E5C, #5E7D8A, #F5F8FA, #D6A756, #2F7D6D, #B45757

## Intentional custom layer

The custom CSS is limited to Trustible brand expression and product-specific layouts: hero, contractor cover treatments, inspiration cards, milestone timeline, project ledger, and responsive shell. The component semantics and interaction primitives remain Astryx-aligned.

## Source

Astryx is the public Meta design system repository: https://github.com/facebook/astryx

## Validation

npm run build completes successfully and exports 26 static routes.
