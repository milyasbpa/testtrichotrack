import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";

export interface MarkdownProps {
  markdown?: string;
}

export const Markdown = ({ markdown = "" }: MarkdownProps) => {
  const markdownComponents: Components = {
    ol: ({ node, ...props }) => (
      <ol className={clsx("list-decimal list-inside ml-4")} {...props} />
    ),
    li: ({ node, ...props }) => (
      <li
        className={clsx("text-[#D8D8D8] text-[1rem] font-normal")}
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        className={clsx("text-[#D8D8D8] text-[1rem] font-normal")}
        {...props}
      />
    ),
  };
  return (
    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  );
};
