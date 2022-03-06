import { Picker } from "emoji-picker-element";
import { EmojiClickEvent } from "emoji-picker-element/shared";
import {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react";

type EmojiPickerProps = {
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>;
};

export const EmojiPicker: VFC<EmojiPickerProps> = ({ inputRef }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow(!show)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <EmojiHappyIcon />
      </button>

      {show && (
        <div style={{ position: "absolute", right: 0 }}>
          <EmojiPalette inputRef={inputRef} />
        </div>
      )}
    </div>
  );
};

const EmojiPalette: VFC<EmojiPickerProps> = ({ inputRef }) => {
  const pickerRef = useRef<Picker>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onEmojiClick = useCallback(
    (e: EmojiClickEvent) => {
      const input = inputRef.current;
      if (!input) return;

      const { unicode } = e.detail;
      if (!unicode) return;

      const { selectionStart, selectionEnd } = input;
      if (typeof selectionStart === "number") {
        input.value =
          input.value.slice(0, selectionStart) +
          unicode +
          input.value.slice(selectionEnd ? selectionEnd : selectionStart);

        const position = selectionStart + unicode.length;
        input.focus();
        input.setSelectionRange(position, position);
      } else {
        input.value = input.value + unicode;
      }
    },
    [inputRef]
  );

  useEffect(() => {
    pickerRef.current = new Picker();
    const wrapper = wrapperRef.current;
    wrapper?.appendChild(pickerRef.current as HTMLElement);
    return () => {
      wrapper?.removeChild(pickerRef.current as HTMLElement);
    };
  }, []);

  useEffect(() => {
    const picker = pickerRef.current;
    picker?.addEventListener("emoji-click", onEmojiClick);
    return () => picker?.removeEventListener("emoji-click", onEmojiClick);
  }, [onEmojiClick]);

  return <div ref={wrapperRef} />;
};

const EmojiHappyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    height="1rem"
    width="1rem"
    style={{ marginTop: 1.2 }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
