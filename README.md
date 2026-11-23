# React + Vite



# Lab 3 Guide Questions

## 1. What is the difference between props and state?
Props are data passed into a component from its parent, and the component only reads them. State is data a component owns and manages itself, and it can change over time using a setter like `setCount`. When state changes, the component re-renders.

## 2. Why can a child component not modify the props it receives?
Props are read-only so data flows in one direction, from parent to child. If a child could change its props, the parent's data would change unexpectedly and the app would be hard to predict and debug. Only the component that owns the data (the parent, through its state) should change it.

## 3. How does the onAddToCart callback allow data to flow from child to parent?
The parent defines a function (`handleAddToCart`) and passes it down as a prop. When the button is clicked, the child calls that function and passes the product title as an argument. The function runs in the parent, so it can update the parent's state with the data the child sent. The data moves up through the function's argument, while the prop itself still only flows downward.

## 4. Why is the key prop required when rendering a list with .map()?
React uses the key to identify which item is which between renders. With a unique key, it can update, add, or remove only the items that changed. If the key is missing or duplicated, React shows a warning and may re-render the wrong items, mix up their state, or update the list incorrectly, especially when items are reordered or removed.

## 5. What does the children prop allow you to do that a normal prop does not?
The children prop lets you put content between a component's opening and closing tags, such as `<ProductCard><span>New</span></ProductCard>`. This lets the parent pass in any JSX (elements, text, or other components) rather than just a value like a string or number. It makes the component more flexible, since the card can show a badge only when one is given.















This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.



