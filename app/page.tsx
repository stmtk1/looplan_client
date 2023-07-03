import React, { useCallback } from "react";

export default async function Page() {
  const ret = await (await fetch('http://localhost:3000')).json();
  console.log(useCallback);
  const onclick = useCallback(async () => {
    const ret = await (await fetch('http://localhost:3000')).json();
    console.log(ret);
  }, []);
  return <div>
    <h1>{ret['hello']}</h1>
    <button onClick={onclick}>hello world</button>
  </div>;
}
