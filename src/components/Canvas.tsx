"use client";
import React from "react";
import { Tldraw, TldrawEditorProps } from "tldraw";
import { TldrawContent } from "./TldrawContent";
import { InputShapeUtil, ImageShapeUtil } from "@/editor/lib";
import { InputTool, ImageTool } from "@/editor/lib/clientTools";

const myCustomShapes = [InputShapeUtil, ImageShapeUtil];
const myCustomTools = [InputTool, ImageTool];

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
      hideUi //persistenceKey="tldraw-canvas"
      {...defaultProps}
    >
      <TldrawContent />
    </Tldraw>
  );
};
