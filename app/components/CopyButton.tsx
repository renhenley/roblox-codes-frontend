"use client";

import { useState } from "react";

export default function CopyButton({
  code,
}: {
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}