import "@styles/global.css";
import Pages from "@components/pages";
console.log(import.meta.env.REACT_APP_BASE_URL);

export function App() {
  return (
    <>
      <Pages />
    </>
  );
}
