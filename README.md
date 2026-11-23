# React + Vite


# Lab 4 Guide Questions

## 1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?
`searchText` holds exactly what the user is typing, so the input updates instantly on every keystroke. `debouncedSearch` holds the value actually used for filtering, and it only updates after the user pauses for 300 ms. If we used one state, either the input would feel laggy (if we delayed it) or the list would re-filter on every keystroke (if we didn't). Two states let the input stay responsive while the filtering waits.

## 2. What would happen if the debounce effect did not return a cleanup function?
Each keystroke would start a new timer without cancelling the old one. Every timer would eventually fire and call `setDebouncedSearch`, so the list would still update once per keystroke, just delayed by 300 ms. Old timers could also fire with outdated values, and one could run after the component unmounts. The cleanup (`clearTimeout`) cancels the previous timer so only the last pause in typing triggers an update.

## 3. What is the purpose of the dependency array?
The dependency array tells React when to re-run an effect: only after a render where one of the listed values has changed.
- **Empty (`[]`):** the effect runs only once, after the first render. For the debounce effect, this would mean the timer never restarts when the user types, so `debouncedSearch` would only ever be set once and search would not work.
- **Left out completely:** the effect runs after every render. For the debounce effect, it would restart its timer on every render, including renders caused by unrelated state changes like clicking Add to Cart, and for effects that set state it could cause an infinite loop.

## 4. Why should we avoid sorting the original products array directly?
`.sort()` changes the array in place. Sorting the original would permanently change `products`, so "Default" order could never be restored, and the mutation could affect other parts of the app that use the same array. React also expects data not to be mutated directly. Copying first (`[...filteredProducts]`) keeps the original safe and lets the order go back to default.

## 5. Should the filtered list be stored in state or calculated during rendering?
It should be calculated during rendering. The filtered list depends entirely on `debouncedSearch`, `category`, `sortOrder`, and the products data, so it is derived data. Storing it in its own state would duplicate information and require extra effects or setters to keep it in sync, which can lead to bugs where the list and the filters disagree. Calculating it each render keeps a single source of truth, and the list always matches the current filters automatically.










This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
