export type Location = {
  line: number;
  offset: number;
};

class Selection {
  anchor: Location;
  focus: Location;

  constructor(anchor: Location, focus: Location) {
    this.anchor = anchor;
    this.focus = focus;
  }

  static point(location: Location): Selection {
    return new Selection(location, location);
  }

  withFocus(focus: Location): Selection {
    return new Selection(this.anchor, focus);
  }

  isCollapsed(): boolean {
    return (
      this.anchor.line === this.focus.line &&
      this.anchor.offset === this.focus.offset
    );
  }

  isBackwards(): boolean {
    if (this.focus.line < this.anchor.line) {
      return true;
    }

    if (this.anchor.line < this.focus.line) {
      return false;
    }

    return this.focus.offset < this.anchor.offset;
  }

  getFirst(): Location {
    return this.isBackwards() ? this.focus : this.anchor;
  }

  getSecond(): Location {
    return this.isBackwards() ? this.anchor : this.focus;
  }
}

export default Selection;
