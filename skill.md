# Developer Skills & Recipes

## Component Composition (Atomic approach)
When building a complex UI (e.g., a Menu Item for the customer app), construct it by importing base components from `shadcn/ui`.
Example: A `MenuCard` (in `/components/customer/MenuCard.tsx`) should be built using `<Card>`, `<CardContent>`, `<Typography>`, and `<Button>` from `/components/ui/`. DO NOT write raw HTML/Tailwind for buttons or cards if a shadcn component exists.