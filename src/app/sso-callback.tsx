import { Redirect } from "expo-router"

// Target of the OAuth redirect (sneeva://sso-callback). If the deep
// link reaches the router, go to "/": the auth guards in _layout show
// home when signed in and send the user to sign-in otherwise.
export default function SSOCallback() {
  return <Redirect href="/" />
}
