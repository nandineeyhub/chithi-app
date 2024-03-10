import { useState } from "react"
import Login from "./Login"
import Registration from "./Registration"

const Auth = () => {
  const [account, setAccount] = useState(false)
  return account ? <Login setAccount={setAccount}/> : <Registration setAccount={setAccount}/>
}

export default Auth