"use client";

import dynamic from 'next/dynamic';

// Importar Canvas dinámicamente para evitar problemas de serialización durante prerendering
const DynamicCanvas = dynamic(() => import('./Canvas').then(mod => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => <div className="fixed inset-0 flex items-center justify-center">Loading...</div>
});

export default DynamicCanvas;
