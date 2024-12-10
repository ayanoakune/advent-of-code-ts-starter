import hljs from "highlight.js";
import typescript from "highlight.js/lib/languages/typescript";

/**
 * Syntax highlighter for TypeScript, using highlight.js.
 */
export default function () {
  hljs.registerLanguage("typescript", typescript);

  return (value: string) => {
    return hljs.highlight(value, { language: "typescript" }).value;
  };
}
