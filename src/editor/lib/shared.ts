import { Editor, TLArrowBinding, TLBinding } from "tldraw";
import { TlInputShape } from "../schema/TlInput";


export const filterTerminals = (
      bindings: TLBinding[],
      terminalType: "start" | "end"
    ): TLArrowBinding[] => {
      return bindings.filter((binding): binding is TLArrowBinding => {
        return (
          binding.props &&
          "terminal" in binding.props &&
          binding.props.terminal === terminalType
        );
      });
    };

   export  const getShapeFromBindigs = (bindings: TLBinding[], editor:Editor): TlInputShape[]   => {
      return bindings.map((binding) => {
        return editor.getShape(binding.toId);
      }) as TlInputShape[] 
    };