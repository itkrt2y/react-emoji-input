import { forwardRef, InputHTMLAttributes, useRef } from "react";
import { EmojiPicker } from "./EmojiPicker";
import mergeRefs from "react-merge-refs";

export const EmojiInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ position: "relative" }}>
      <input
        {...props}
        type="text"
        ref={mergeRefs([ref, inputRef])}
        style={{ position: "absolute", width: "100%" }}
      />

      <div style={{ position: "absolute", right: 0 }}>
        <EmojiPicker inputRef={inputRef} />
      </div>
    </div>
  );
});
EmojiInput.displayName = "EmojiInput";
