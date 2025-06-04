"use client";
// import Link from "next/link";
import React from "react";
import { useEditorComponents } from "tldraw";

export const TldrawContent = () => {
  const { Canvas } = useEditorComponents();
  return (
    <>
      {Canvas ? <Canvas /> : null}
      {/* <div className='absolute top-0 left-0'>
        <Link href={'/'}>
        <Button>
            <ArrowLeftIcon />
        </Button>
        </Link>
    </div> */}
    </>
  );
};
