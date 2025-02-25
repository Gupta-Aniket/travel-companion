//  add 2 stacks, if the user is logged in, show the (tabs) else show the auth stack


import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/auth/login" />;
}
