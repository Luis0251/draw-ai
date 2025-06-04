"use client";
import React from "react";
import { Tldraw, TldrawEditorProps } from "tldraw";
import { TldrawContent } from "./TldrawContent";
import { InputShapeUtil } from "@/editor/lib";

const myCustomShapes = [InputShapeUtil];

export const Canvas = () => {
  const defaultProps: TldrawEditorProps = {
    initialState: "select",
    shapeUtils: myCustomShapes,
    tools: [],
    onMount: (editor) => {
      editor.user.updateUserPreferences({
        isSnapMode: true,
      });
      editor.createShape({
        type: "input",
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
