import "../css/editor.css";

import * as React from "react";

import EditorStore from "../model/EditorStore";
import { LINE_HEIGHT } from "../utils/LayoutConstants";
import TextWidth from "../utils/TextWidth";

const EditorSelectionOverlay = (props: {}) => {
  const store = EditorStore.useStore();
  const lines = store.get("lines");
  const selection = store.get("selection");
  if (selection == null) {
    return null;
  }

  const firstLocation = selection.getFirst();
  const secondLocation = selection.getSecond();
  const charWidth = TextWidth.getCharWidth();

  const selectedRanges: ([number, number] | null)[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (i < firstLocation.line || i > secondLocation.line) {
      selectedRanges.push(null);
      continue;
    }

    const line = lines[i];

    if (i === firstLocation.line) {
      if (i === secondLocation.line) {
        if (firstLocation.offset === secondLocation.offset) {
          selectedRanges.push(null);
        } else if (firstLocation.offset < secondLocation.offset) {
          selectedRanges.push([firstLocation.offset, secondLocation.offset]);
        } else {
          selectedRanges.push([secondLocation.offset, firstLocation.offset]);
        }
      } else {
        selectedRanges.push([firstLocation.offset, line.length + 1]);
      }
    } else if (i === secondLocation.line) {
      selectedRanges.push([0, secondLocation.offset]);
    } else {
      selectedRanges.push([0, line.length + 1]);
    }
  }

  return (
    <div className="editor-workspace-overlay">
      {selectedRanges.map((range, i) => {
        if (range === null) {
          return null;
        }

        const prevRange = i > 0 ? selectedRanges[i - 1] : null;
        const nextRange = i < lines.length - 1 ? selectedRanges[i + 1] : null;

        const borders = [];
        const nextBorders: ("top" | "bottom")[] = [];
        const prevBorders: ("top" | "bottom")[] = [];

        if (prevRange == null) {
          borders.push("top-right", "top-left");
        } else {
          if (prevRange[0] > range[0]) {
            borders.push("top-left");
          } else if (prevRange[0] < range[0]) {
            prevBorders.push("top");
          }

          if (prevRange[1] < range[1]) {
            borders.push("top-right");
          } else if (prevRange[1] > range[1]) {
            nextBorders.push("top");
          }
        }

        if (nextRange == null) {
          borders.push("bottom-right", "bottom-left");
        } else {
          if (nextRange[0] > range[0]) {
            borders.push("bottom-left");
          } else if (nextRange[0] < range[0]) {
            prevBorders.push("bottom");
          }

          if (nextRange[1] < range[1]) {
            borders.push("bottom-right");
          } else if (nextRange[1] > range[1]) {
            nextBorders.push("bottom");
          }
        }

        console.log(i, nextBorders);

        const top = `${i * LINE_HEIGHT}px`;

        return (
          <div>
            {prevBorders.length > 0 && (
              <div
                key={`${i}-prev`}
                className={
                  "editor-selection-overlay editor-selection-overlay-prev-border " +
                  prevBorders.join(" ")
                }
                style={{
                  top,
                  left: `${(range[0] - 1) * charWidth}px`,
                  width: `${charWidth}px`
                }}
              >
                <div />
              </div>
            )}
            <div
              key={i}
              className={"editor-selection-overlay " + borders.join(" ")}
              style={{
                top,
                left: `${range[0] * charWidth}px`,
                width: `${(range[1] - range[0]) * charWidth}px`
              }}
            />
            {nextBorders.length > 0 && (
              <div
                key={`${i}-next`}
                className={
                  "editor-selection-overlay editor-selection-overlay-next-border " +
                  nextBorders.join(" ")
                }
                style={{
                  top,
                  left: `${range[1] * charWidth}px`,
                  width: `${charWidth}px`
                }}
              >
                <div />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EditorSelectionOverlay;
