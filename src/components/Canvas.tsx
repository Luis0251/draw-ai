"use client";
import React from "react";
import { Tldraw, TldrawEditorProps } from "tldraw";
import { TldrawContent } from "./TldrawContent";

export const Canvas = () => {
  const defaultProps: TldrawEditorProps = {
    initialState: "select",
    shapeUtils: [],
    tools: [],
    onMount: (editor) => {
      editor.user.updateUserPreferences({
        isSnapMode: true,
      });
    },
  };
  return (
    <Tldraw hideUi persistenceKey="tldraw-canvas" {...defaultProps}>
      <TldrawContent />
    </Tldraw>
  );
};
