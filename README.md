# PDU Game

This is a simple escape room style game built with React and Three.js. The objective is to solve a series of puzzles to repair a rack PDU and escape the data center.

## Development

- `npm run dev` – start the development server.
- `npm run build` – build the client and server for production.
- `npm run start` – run the built server.

## Deployment

The project includes a GitHub Actions workflow that builds the client and
publishes the contents of `dist/public` to GitHub Pages. The base path for the
build is automatically set using the repository name.

## Optimization ideas

- **Reduce bundle size** by removing unused UI components and libraries.
- **Lazy load** heavy assets such as 3D models and sounds only when needed.
- **Use memoization** and `useCallback` to avoid unnecessary re-renders in React components.
- **Code split** larger components with `React.lazy` to speed up initial load.
- **Memoize static geometry** in `Scene3D` to reduce render overhead.
- **Consider WebGL optimizations** in `Scene3D` by minimizing object count and using instancing.

