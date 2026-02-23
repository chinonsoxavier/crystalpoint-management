import { Suspense } from "react";
import SignUpClient from "./signUpClient";


export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <SignUpClient />
    </Suspense>
  );
}