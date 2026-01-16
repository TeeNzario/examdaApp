import { Redirect } from 'expo-router';

export default function Index() {
  const isLoggedIn = true; // replace with real auth later

  return isLoggedIn
    ? <Redirect href="/home" />
    : <Redirect href="/login" />;
}
