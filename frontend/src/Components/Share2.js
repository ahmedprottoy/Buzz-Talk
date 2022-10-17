import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default function Share2() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `hellooo...`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html);
    },
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}
