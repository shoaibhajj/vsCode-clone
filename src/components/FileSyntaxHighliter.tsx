import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
interface IProp {
  content: string | undefined;
}

const FileSyntaxHighliter = ({ content }: IProp) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={atomDark}
      customStyle={{
        backgroundColor: "transparent",
        width: "100%",
        maxHeight: "100%",
        overflowX: "hidden",
        fontSize: "1rem",
      }}
     showLineNumbers    
    >
      {String(content)}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighliter;
