import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { BsTextWrap } from "react-icons/bs";
import {
  FaBold,
  FaItalic,
  FaLink,
  FaCode,
  FaList,
  FaListOl,
  FaTrash,
} from "react-icons/fa";
import { useCallback, useEffect, useRef } from "react";

const RichTextEditor = ({
  value,
  onChange,
  label = "Content",
  error = null,
  minHeight = "120px",
  autoFocus = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        history: false, // Disable history in StarterKit to avoid conflicts
      }),
      ListItem,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "editor-link",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      TextStyle,
      HardBreak.configure({
        // Configure hard break to work with Shift+Enter for line breaks
        // and regular Enter for paragraph breaks
        HTMLAttributes: {
          class: "hard-break",
        },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base focus:outline-none cursor-text min-h-[120px] [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4 [&_li]:mb-1 [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:hover:underline [&_a]:transition-colors [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-base [&_h4]:font-bold [&_h4]:mb-2 [&_h5]:text-sm [&_h5]:font-bold [&_h5]:mb-2 [&_h6]:text-xs [&_h6]:font-bold [&_h6]:mb-2",
      },
    },
  });

  const editorRef = useRef(editor);
  const isInitializedRef = useRef(false);

  // Update editor reference when editor changes
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // Handle content updates with proper timing
  const updateContent = useCallback((newValue) => {
    const currentEditor = editorRef.current;
    if (!currentEditor) return;

    const currentContent = currentEditor.getHTML();
    const normalizedNewValue = newValue || "";

    // Only update if content is actually different to prevent infinite loops
    if (currentContent !== normalizedNewValue) {
      try {
        currentEditor.commands.setContent(normalizedNewValue);
      } catch (error) {
        console.warn("Failed to update editor content:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (editor && value !== undefined) {
      updateContent(value);

      // Auto-focus if requested and editor is ready
      if (autoFocus && !isInitializedRef.current) {
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.commands.focus("end");
          }
        }, 100);
        isInitializedRef.current = true;
      }
    }
  }, [value, editor, updateContent, autoFocus]);

  const setLink = useCallback(() => {
    const currentEditor = editorRef.current;
    if (!currentEditor) return;

    const previousUrl = currentEditor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      currentEditor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Validate and format URL
    let formattedUrl = url.trim();

    // Add protocol if missing
    if (
      formattedUrl &&
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    // update link
    currentEditor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: formattedUrl })
      .run();
  }, []);

  const handleListToggle = useCallback((listType) => {
    const currentEditor = editorRef.current;
    if (!currentEditor) return;

    const { state } = currentEditor.view;
    const { selection } = state;

    if (selection.empty) {
      // No selection, just toggle the current paragraph
      if (listType === "bullet") {
        currentEditor.chain().focus().toggleBulletList().run();
      } else {
        currentEditor.chain().focus().toggleOrderedList().run();
      }
    } else {
      // There's a selection - be more precise about what gets converted
      const { from, to } = selection;

      // Get the text content of the selection
      const selectedText = state.doc.textBetween(from, to, "\n");
      const lines = selectedText.split("\n").filter((line) => line.trim());

      if (lines.length > 1) {
        // Multiple lines selected - convert each line to a separate list item
        // First, ensure we're working with paragraph boundaries
        currentEditor
          .chain()
          .focus()
          .setTextSelection({ from, to })
          .splitListItem("listItem")
          .run();

        // Then apply the list formatting
        if (listType === "bullet") {
          currentEditor.chain().focus().toggleBulletList().run();
        } else {
          currentEditor.chain().focus().toggleOrderedList().run();
        }
      } else {
        // Single line or partial line selected - use standard toggle
        if (listType === "bullet") {
          currentEditor.chain().focus().toggleBulletList().run();
        } else {
          currentEditor.chain().focus().toggleOrderedList().run();
        }
      }
    }
  }, []);

  const handleHeadingToggle = useCallback((level) => {
    const currentEditor = editorRef.current;
    if (!currentEditor) return;

    // If already at the same level, convert to paragraph
    if (currentEditor.isActive("heading", { level })) {
      currentEditor.chain().focus().setParagraph().run();
    } else {
      currentEditor.chain().focus().toggleHeading({ level }).run();
    }
  }, []);

  const handleHardBreak = useCallback(() => {
    const currentEditor = editorRef.current;
    if (!currentEditor) return;

    currentEditor.chain().focus().setHardBreak().run();
  }, []);

  const clearFormatting = useCallback(() => {
    const currentEditor = editorRef.current;
    if (!currentEditor) return;

    currentEditor.chain().focus().clearNodes().unsetAllMarks().run();
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      const currentEditor = editorRef.current;
      if (!currentEditor) return;

      // Handle Enter key for line breaks
      if (event.key === "Enter") {
        if (event.shiftKey) {
          // Shift+Enter should create a line break
          event.preventDefault();
          handleHardBreak();
          return;
        }
        // Regular Enter creates a paragraph break (default behavior)
      }

      // Handle keyboard shortcuts
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "b":
            event.preventDefault();
            currentEditor.chain().focus().toggleBold().run();
            break;
          case "i":
            event.preventDefault();
            currentEditor.chain().focus().toggleItalic().run();
            break;
          case "k":
            event.preventDefault();
            setLink();
            break;
          case "z":
            event.preventDefault();
            currentEditor.chain().focus().undo().run();
            break;
          case "y":
            event.preventDefault();
            currentEditor.chain().focus().redo().run();
            break;
          case "l":
            event.preventDefault();
            // Ctrl+L for bullet list
            handleListToggle("bullet");
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
            event.preventDefault();
            // Ctrl+1-6 for headings H1-H6
            const level = parseInt(event.key);
            handleHeadingToggle(level);
            break;
        }
      }

      // Handle Ctrl+Shift+L for ordered list
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "L"
      ) {
        event.preventDefault();
        handleListToggle("ordered");
      }
    },
    [setLink, handleListToggle, handleHeadingToggle, handleHardBreak]
  );

  // Helper function to safely check if a mark is active
  const isMarkActive = (mark) => {
    try {
      return editor.isActive(mark);
    } catch (error) {
      console.warn(`Error checking active state for ${mark}:`, error);
      return false;
    }
  };

  // Helper function to check if a heading level is active
  const isHeadingActive = (level) => {
    try {
      return editor.isActive("heading", { level });
    } catch (error) {
      console.warn(`Error checking active state for heading ${level}:`, error);
      return false;
    }
  };

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {label && (
          <label className="block text-sm font-medium text-gray-700 px-3 pt-2 pb-1">
            {label}
          </label>
        )}
        <div className="px-3 py-2 min-h-30 bg-gray-50 rounded">
          <div className="text-gray-500 text-sm">Loading editor...</div>
        </div>
        {error && <p className="text-red-500 text-sm px-3 py-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 px-3 pt-2 pb-1">
          {label}
        </label>
      )}

      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 px-2 py-1 flex flex-wrap gap-1">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded transition-all duration-200 border ${
            isMarkActive("bold")
              ? "bg-blue-100 border-blue-300 text-blue-800 shadow-sm"
              : "border-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-600"
          }`}
          title="Bold (Ctrl+B)"
        >
          <FaBold
            className={`w-4 h-4 transition-colors ${
              isMarkActive("bold") ? "text-blue-800" : "text-gray-600"
            }`}
          />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded transition-all duration-200 border ${
            isMarkActive("italic")
              ? "bg-blue-100 border-blue-300 text-blue-800 shadow-sm"
              : "border-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-600"
          }`}
          title="Italic (Ctrl+I)"
        >
          <FaItalic
            className={`w-4 h-4 transition-colors ${
              isMarkActive("italic") ? "text-blue-800" : "text-gray-600"
            }`}
          />
        </button>

        {/* Lists */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => handleListToggle("bullet")}
            className={`p-1 rounded transition-all duration-200 border ${
              editor.isActive("bulletList")
                ? "bg-blue-100 border-blue-300 text-blue-800 shadow-sm"
                : "border-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-600"
            }`}
            title="Bulleted List (Ctrl+L)"
          >
            <FaList
              className={`w-4 h-4 transition-colors ${
                editor.isActive("bulletList")
                  ? "text-blue-800"
                  : "text-gray-600"
              }`}
            />
          </button>
          <button
            type="button"
            onClick={() => handleListToggle("ordered")}
            className={`p-1 rounded transition-all duration-200 border ${
              editor.isActive("orderedList")
                ? "bg-blue-100 border-blue-300 text-blue-800 shadow-sm"
                : "border-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-600"
            }`}
            title="Numbered List (Ctrl+Shift+L)"
          >
            <FaListOl
              className={`w-4 h-4 transition-colors ${
                editor.isActive("orderedList")
                  ? "text-blue-800"
                  : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-l border-gray-300 pl-1">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleHeadingToggle(level)}
              className={`px-2 py-1 rounded transition-all duration-200 border text-xs font-semibold ${
                isHeadingActive(level)
                  ? "bg-blue-100 border-blue-300 text-blue-800 shadow-sm"
                  : "border-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-600"
              }`}
              title={`Heading ${level} (Ctrl+${level})`}
            >
              H{level}
            </button>
          ))}
        </div>

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          className={`p-1 rounded transition-all duration-200 border ${
            isMarkActive("link")
              ? "bg-blue-100 border-blue-300 text-blue-600 shadow-sm"
              : "border-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-600"
          }`}
          title="Insert Link (Ctrl+K)"
        >
          <FaLink
            className={`w-4 h-4 transition-colors ${
              isMarkActive("link") ? "text-blue-600" : "text-gray-600"
            }`}
          />
        </button>

        {/* Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-1 rounded transition-all duration-200 border ${
            isMarkActive("code")
              ? "bg-blue-100 border-blue-300 text-blue-800 shadow-sm"
              : "border-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-600"
          }`}
          title="Code"
        >
          <FaCode
            className={`w-4 h-4 transition-colors ${
              isMarkActive("code") ? "text-blue-800" : "text-gray-600"
            }`}
          />
        </button>

        {/* Hard Break */}
        <button
          type="button"
          onClick={handleHardBreak}
          className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-300"
          title="Line Break (Shift+Enter)"
        >
          <BsTextWrap className="w-4 h-4" />
        </button>

        {/* Clear Formatting */}
        <button
          type="button"
          onClick={clearFormatting}
          className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-300"
          title="Clear Formatting"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
      {/* Editor */}
      <EditorContent
        editor={editor}
        className="px-3 py-2 min-h-30 max-h-100 overflow-auto cursor-text prose prose-sm sm:prose-base [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4 [&_li]:mb-1 [&_ul]:pl-4 [&_ol]:pl-4 [&_ul_li]:list-disc [&_ol_li]:list-decimal [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:hover:underline [&_a]:transition-colors [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-base [&_h4]:font-bold [&_h4]:mb-2 [&_h5]:text-sm [&_h5]:font-bold [&_h5]:mb-2 [&_h6]:text-xs [&_h6]:font-bold [&_h6]:mb-2"
        style={{
          minHeight: minHeight,
          userSelect: "text",
          WebkitUserSelect: "text",
          MozUserSelect: "text",
          msUserSelect: "text",
        }}
        onKeyDown={handleKeyDown}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm px-3 py-1">{error}</p>}
    </div>
  );
};

export default RichTextEditor;
