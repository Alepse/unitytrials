import { Suspense } from "react";
import FindTrialsClient from "../../components/find-trials-client";

export default function FindTrialsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindTrialsClient />
    </Suspense>
  );
}