"use client";
import React from "react";
import { Tldraw, TldrawEditorProps } from "tldraw";
import { TldrawContent } from "./TldrawContent";
import { InputShapeUtil, InputTool } from "@/editor/lib";

const myCustomShapes = [InputShapeUtil];
const myCustomTools = [InputTool];

export const Canvas = () => {
  const defaultProps: TldrawEditorProps = {
    initialState: "input",
    shapeUtils: myCustomShapes,
    tools: myCustomTools,
    onMount: (editor) => {
      editor.user.updateUserPreferences({
        isSnapMode: true,
      });
    },
  };
  return (
    <Tldraw
      hideUi
      //persistenceKey="tldraw-canvas"
      {...defaultProps}
    >
      <TldrawContent />
    </Tldraw>
  );
};
