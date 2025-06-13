import { TLImageShape } from "@/editor/schema/TLImage";
import {
  Geometry2d,
  RecordProps,
  Rectangle2d,
  resizeBox,
  ShapeUtil,
  T,
  TLResizeInfo,
} from "tldraw";
import { filterTerminals, getShapeFromBindigs } from "../../shared";
import { generateAIImage } from "@/app/actions/ai/image";

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
      const startShapes = getShapeFromBindigs(
        startTerminals,
        this.editor
      ) as TLImageShape[];
      const endShapes = getShapeFromBindigs(
        endTerminals,
        this.editor
      ) as TLImageShape[];

      if (startShapes.length === 0 || endShapes.length === 0) return;

      const shapeInfo = startShapes.map((shape) => ({
        type: shape.type,
        prompt: shape.props.prompt,
      }));
      const prompt = shapeInfo.map((s) => s.prompt).join("\n");

      const response = await generateAIImage(prompt);
      this.editor.updateShape({
        id: shape.id,
        type: shape.type,
        props: {
          ...shape.props,
          prompt,
        },
      });
      //   const result = await generateAIImage(prompt);
    };
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
