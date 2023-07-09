'use client';
import { useCallback, useState } from "react";

type InputElement = { target: { value: React.SetStateAction<string>; }; };

export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const onclick = useCallback(async () => {
    const body = {
      user_name: userName,
      password,
    }
    console.log(body);
    const ret = await (await fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json'} },
      )).json();
    console.log(ret);
  }, [userName, password]);

  const changeUserName = useCallback((e: InputElement) => { setUserName(e.target.value)}, [ setUserName ]);
  const changePassword = useCallback((e: InputElement) => { setPassword(e.target.value)}, [ setPassword ]);
  return <div>
    <div>
      <label>ユーザー名</label>
      <input value={userName} type='input' onChange={changeUserName} />
    </div>
    <div>
      <label>パスワード</label>
      <input value={password} type='password' onChange={changePassword} />
    </div>
    <button onClick={onclick}>送信</button>
  </div>;
}
