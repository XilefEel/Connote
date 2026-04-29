import { useEditorState, type Editor } from "@tiptap/react";
import ToolbarButton from "./ToolbarButton";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  TextQuote,
  Underline,
  Undo,
} from "lucide-react";

export default function Toolbar({ editor }: { editor: Editor }) {
  const {
    isBold,
    isItalic,
    isUnderline,
    isStrike,
    isCode,
    isH1,
    isH2,
    isH3,
    isBlockquote,
    isBulletList,
    isOrderedList,
  } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isCode: ctx.editor.isActive("codeBlock"),
      isH1: ctx.editor.isActive("heading", { level: 1 }),
      isH2: ctx.editor.isActive("heading", { level: 2 }),
      isH3: ctx.editor.isActive("heading", { level: 3 }),
      isBlockquote: ctx.editor.isActive("blockquote"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
      isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
      isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
      isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
    }),
  });

  return (
    <div className="flex flex-wrap gap-1 rounded bg-zinc-900 px-3 py-2 text-xs text-zinc-400">
      <div className="flex gap-1.5 border-r border-zinc-700 pr-2 last:border-none last:pr-0">
        <ToolbarButton
          Icon={Undo}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          Icon={Redo}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      <div className="flex gap-1.5 border-r border-zinc-700 pr-2 last:border-none last:pr-0">
        <ToolbarButton
          Icon={Heading1}
          active={isH1}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <ToolbarButton
          Icon={Heading2}
          active={isH2}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          Icon={Heading3}
          active={isH3}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
        <ToolbarButton
          Icon={List}
          active={isBulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          Icon={ListOrdered}
          active={isOrderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          Icon={TextQuote}
          active={isBlockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
      </div>

      <div className="flex gap-1.5 border-r border-zinc-700 pr-2 last:border-none last:pr-0">
        <ToolbarButton
          Icon={Bold}
          active={isBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          Icon={Italic}
          active={isItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          Icon={Underline}
          active={isUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          Icon={Strikethrough}
          active={isStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolbarButton
          Icon={Code2}
          active={isCode}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
      </div>
    </div>
  );
}
