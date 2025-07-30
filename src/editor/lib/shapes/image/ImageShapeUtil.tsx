import { TLImageShape } from "@/editor/schema/TLImage";
import {
  Geometry2d,
  HTMLContainer,
  RecordProps,
  Rectangle2d,
  resizeBox,
  ShapeUtil,
  T,
  TldrawUiButton,
  TLResizeInfo,
} from "tldraw";
import { filterTerminals, getShapeFromBindigs } from "../../shared";
import { cn } from "@/lib/utils";
import { Lock, LockOpen, WandIcon } from "lucide-react";

export class ImageShapeUtil extends ShapeUtil<TLImageShape> {
  static override type = "image" as const;
  static override props: RecordProps<TLImageShape> = {
    w: T.number,
    h: T.number,
    prompt: T.string,
    imageUrl: T.string,
    name: T.string,
  };

  getDefaultProps(): TLImageShape["props"] {
    return {
      w: 300,
      h: 300,
      prompt: "",
      imageUrl: "",
      name: "Imagen",
    };
  }

  getGeometry(shape: TLImageShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  indicator(shape: TLImageShape) {
    return (
      <rect
        width={shape.props.w}
        height={shape.props.h}
        rx={4}
        ry={4}
        strokeWidth={1.5}
        strokeDasharray="8 2"
        stroke="rgba(59, 130, 246, 0.8)"
        fill="none"
      />
    );
  }

  component(shape: TLImageShape) {
    const isLocked = this.editor.getShape(shape)?.isLocked;

    const handleLock = (shape: TLImageShape) => {
      this.editor.updateShape({
        id: shape.id,
        type: shape.type,
        isLocked: !shape.isLocked,
      });
    };
    const handleGenerateImage = async () => {
      const arrowBindings = this.editor.getBindingsInvolvingShape(
        shape.id,
        "arrow"
      );

      const arrowShapes = arrowBindings.map((b) =>
        this.editor.getBindingsFromShape(b.fromId, "arrow")
      );
      const allArrowBindings = arrowShapes.flat();

      const startTerminals = filterTerminals(allArrowBindings, "start");
      const endTerminals = filterTerminals(allArrowBindings, "end");

      const startShapes = getShapeFromBindigs(startTerminals, this.editor);
      const endShapes = getShapeFromBindigs(endTerminals, this.editor);

      if (startShapes.length === 0 || endShapes.length === 0) return;

      const shapeInfo = startShapes.map((shape) => ({
        type: shape.type,
        text: shape.props.text,
      }));
      const prompt = shapeInfo.map((s) => s.text).join("\n");

      this.editor.updateShape({
        id: shape.id,
        type: shape.type,
        props: {
          ...shape.props,
          prompt,
        },
      });

      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!response.ok || !data.base64) {
          console.error(
            "Error generando imagen:",
            data?.error || response.statusText
          );
          return;
        }

        const imageUrl = `data:image/png;base64,${data.base64}`;

        // Actualiza la forma con la imagen generada
        this.editor.updateShape({
          id: shape.id,
          type: shape.type,
          props: {
            ...shape.props,
            imageUrl,
          },
        });
      } catch (error) {
        console.error("Error al generar imagen:", error);
      }
    };
    return (
      <HTMLContainer
        className={cn(
          "flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm",
          `[${shape.props.w}px]`,
          `[${shape.props.h}px]`
        )}
      >
        <div
          className="flex justify-between items-center z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
            borderBottom: "1px solid rgba(59, 130, 246, 0.2)",
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
              className="h-8 w-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleGenerateImage();
              }}
            >
              <WandIcon className="h-4 w-4" />
            </TldrawUiButton>
            <TldrawUiButton
              type="icon"
              className="h-8 w-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleLock(shape);
              }}
            >
              {isLocked ? (
                <Lock className="h-4 w-4" />
              ) : (
                <LockOpen className="h-4 w-4" />
              )}
            </TldrawUiButton>
          </div>
        </div>
        <div className="flex-grow relative">
          {shape.props.imageUrl ? (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${shape.props.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ) : (
            <div className="w-full h-full bg-transparent"></div>
          )}
        </div>
      </HTMLContainer>
    );
  }

  override canBind() {
    return true;
  }
  override canEdit() {
    return true;
  }
  override canResize() {
    return true;
  }
  override isAspectRatioLocked() {
    return true;
  }
  override onResize(shape: TLImageShape, info: TLResizeInfo<TLImageShape>) {
    return resizeBox(shape, info);
  }
}
