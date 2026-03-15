"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] border rounded-md p-3 focus:outline-none prose max-w-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // keep external value in sync
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        />

        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        />

        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          label="H2"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="List"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          label="Code"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          label="Undo"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          label="Redo"
        />

        <ToolbarButton
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          label="Link"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-3" />
    </div>
  );
}

function ToolbarButton({
  onClick,
  label,
  active,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded border hover:bg-gray-200 ${
        active ? "bg-gray-300 font-semibold" : ""
      }`}
    >
      {label}
    </button>
  );
}
