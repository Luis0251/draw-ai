import { TLBaseShape } from "tldraw";

export interface TlInputProps {
    w: number;
    h: number;
    text: string;
    name: string;
}

export type TlInputShape = TLBaseShape<"input", TlInputProps>;