import { GlobalCss } from "./global-css.tsx";

function App({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalCss></GlobalCss>
      {children}
    </>
  );
}

export default App;
