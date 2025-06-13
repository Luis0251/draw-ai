"use client";
// import Link from "next/link";
import React from "react";
import { useEditorComponents } from "tldraw";
import { Controls } from "./Controls";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const TldrawContent = () => {
  const { Canvas } = useEditorComponents();
  return (
    <>
      {Canvas ? <Canvas /> : null}
      <Controls />
      <div className="absolute top-0 left-0">
        <Link href={"/"}>
          <Button>
            <ArrowLeftIcon />
          </Button>
        </Link>
      </div>
    </>
  );
};
