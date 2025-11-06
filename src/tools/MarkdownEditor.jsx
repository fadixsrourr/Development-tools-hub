import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownEditor() {
  const [md, setMd] = useState(
`# Hello, Markdown!
\`\`\`js
console.log("Hi Fadi!");
\`\`\`
`);

  return (
    <div className="tool grid-2">
      <div>
        <label className="label">Markdown</label>
        <textarea
          className="textarea mono"
          rows={12}
          value={md}
          onChange={(e) => setMd(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Preview</label>
        <div className="preview">
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                if (!inline && match) {
                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {md}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
