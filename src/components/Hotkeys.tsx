"use client";

import { useEditor } from "tldraw";
import { useHotkeys } from "react-hotkeys-hook";

export function GlobalHotkeys() {
  const editor = useEditor();

  const handleDelete = () => {
    const activeElement = document.activeElement;
    const isEditing =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      activeElement?.getAttribute("contenteditable") === "true" ||
      activeElement?.closest(".PromiseMirror") !== null;

    if (!isEditing && editor.getSelectedShapeIds().length > 0) {
      editor.deleteShapes(editor.getSelectedShapeIds());
    }
  };

  const handleToolChange = (toolName: string) => {
    editor.setCurrentTool(toolName);
  };

  const handleDuplicate = () => {
    if (editor.getSelectedShapeIds().length === 0) return;
    editor.duplicateShapes(editor.getSelectedShapeIds());
    editor.nudgeShapes(editor.getSelectedShapeIds(), { x: 20, y: 20 });
  };

  useHotkeys("delete", handleDelete, { preventDefault: true });
  useHotkeys("backspace", handleDelete, { preventDefault: true });

  useHotkeys("t", handleToolChange.bind(null, "text"), {
    preventDefault: true,
  });
  useHotkeys("a", handleToolChange.bind(null, "arrow"), {
    preventDefault: true,
  });
  useHotkeys("g", handleToolChange.bind(null, "geo"), { preventDefault: true });
  useHotkeys("d", handleToolChange.bind(null, "draw"), {
    preventDefault: true,
  });
  useHotkeys("e", handleToolChange.bind(null, "eraser"), {
    preventDefault: true,
  });
  useHotkeys("i", handleToolChange.bind(null, "input"), {
    preventDefault: true,
  });
  useHotkeys("m", handleToolChange.bind(null, "image"), {
    preventDefault: true,
  });

  useHotkeys("s", handleToolChange.bind(null, "select"), {
    preventDefault: true,
  });

  useHotkeys("ctrl+z", editor.undo, { preventDefault: true });
  useHotkeys("ctrl+d", handleDuplicate, { preventDefault: true });

  return null;
}
