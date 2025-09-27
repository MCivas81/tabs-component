# Tabs Component

A reusable, accessible **Tabs** component built with React and TypeScript.  
It allows switching between multiple panels of content while supporting **keyboard navigation**, **ARIA roles**, and **badges**.

---

## ✨ Features

- **Accessible Tablist**  
  Built following accessibility best practices for tabs ([WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)).

- **Keyboard Navigation**  
  - `ArrowRight` → moves focus to the next tab (loops to the first at the end).  
  - `ArrowLeft` → moves focus to the previous tab (loops to the last at the beginning).  
  - `Enter` / `Space` → selects the currently focused tab.

- **Customizable Variants**  
  - `variant` prop allows different visual styles (`"underline"`, `"pill"`).

- **Dynamic Tab Content**  
  - Each tab can render **any React content** via the `content` field.

- **Badges**  
  - Optional `badge` on each tab to display a count or status.  

- **SCSS Styling**  
  - Uses `Tabs.scss` with BEM-style class names:  
    - `tabs__list`, `tabs__panel`, `tab--underline`, `tab--selected`, etc.

- **Fully Type-Safe**  
  - Built with TypeScript and strongly typed props (`TabsProps`).

- **Storybook Integration**  
  - A dedicated Storybook story (`Tabs.stories.tsx`) has been created to showcase the component in isolation and demonstrate different variants and use cases.

- **Unit Tests**  
  - Unit tests have been implemented with Vitest to ensure reliability and maintain accessibility and keyboard navigation behavior (100% coverage).

---