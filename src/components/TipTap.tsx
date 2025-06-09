"use-client";

import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useQuickReactor } from "tldraw";
import React from "react";

interface TipTapProps {
  content: string;
  onContentChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TipTapComponent: React.FC<TipTapProps> = ({
  content,
  onContentChange,
  placeholder,
  disabled,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "empty-editor",
        emptyNodeClass: "empty-node",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "h-full",
        style: "font-family: tldraw_draw, sans-serif;",
      },
    },
    editable: !disabled,
    immediatelyRender: false,
  });

  useQuickReactor(
    "update-tiktap-content",
    () => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content);
      }
    },
    [content, editor]
  );

  useQuickReactor(
    "update-tiptap-editable",
    () => {
      if (editor) {
        editor.setEditable(!disabled);
      }
    },
    [disabled, editor]
  );

  if (!editor) return null;

  return <EditorContent editor={editor} style={{ height: "100%" }} />;
};

const TipTap = React.memo(TipTapComponent);

export { TipTap };
