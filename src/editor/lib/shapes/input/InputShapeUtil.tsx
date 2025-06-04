import { TlInputProps, TlInputShape } from "@/editor/schema/TlInput";
import { cn } from "@/lib/utils";
import { Lock, LockOpen } from "lucide-react";
import {
  Geometry2d,
  HTMLContainer,
  RecordProps,
  Rectangle2d,
  ShapeUtil,
  T,
  TldrawUiButton,
} from "tldraw";

export class InputShapeUtil extends ShapeUtil<TlInputShape> {
  static type = "input" as const;
  static override props: RecordProps<TlInputShape> = {
    w: T.number,
    h: T.number,
    text: T.string,
    name: T.string,
  };

  getDefaultProps(): TlInputProps {
    return {
      w: 300,
      h: 200,
      text: "",
      name: "Input",
    };
  }
  getGeometry(shape: TlInputShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }
  component(shape: TlInputShape) {
    const isLocked = this.editor.getShape(shape.id)?.isLocked;

    return (
      <HTMLContainer
        className={cn(
          "flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm",
          `w-[${shape.props.w}px] h-[${shape.props.h}px]`
        )}
      >
        <div
          className="flex justify-between items-center"
          style={{
            background:
              "linear-gradient(to right, rgba(147,51,234,0.05), rgba(219,39,119,0.05))",
            borderBottom: "1px solid rgba(147,51,234,0.2)",
          }}
        >
          <div
            className="text-sm ml-2 py-1.5"
            style={{ fontFamily: "tldraw_draw, sans-serif" }}
          >
            {shape.props.name}
          </div>
          <div className="flex gap-1 items-center justify-end">
            <TldrawUiButton
              type="icon"
              className="w-8 h-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onClick={() => console.log("click lock")}
            >
              {isLocked ? (
                <Lock className="w-4 h-4" />
              ) : (
                <LockOpen className="w-4 h-4" />
              )}
            </TldrawUiButton>

            <TldrawUiButton
              type="icon"
              className="w-8 h-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onClick={() => console.log("click lock")}
            >
              {isLocked ? (
                <Lock className="w-4 h-4" />
              ) : (
                <LockOpen className="w-4 h-4" />
              )}
            </TldrawUiButton>
          </div>
        </div>
      </HTMLContainer>
    );
  }
}
