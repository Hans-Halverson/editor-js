type LocationArgs = { line: number; offset: number };

export class Location {
  line: number;
  offset: number;

  constructor({ line, offset }: LocationArgs) {
    this.line = line;
    this.offset = offset;
  }

  static start(): Location {
    return new Location({ line: 0, offset: 0 });
  }

  withLine(line: number): Location {
    return new Location({ line, offset: this.offset });
  }

  withOffset(offset: number): Location {
    return new Location({ line: this.line, offset });
  }

  up(offset: number = 1): Location {
    return this.withLine(this.line - offset);
  }

  down(offset: number = 1): Location {
    return this.withLine(this.line + offset);
  }

  left(offset: number = 1): Location {
    return this.withOffset(this.offset - offset);
  }

  right(offset: number = 1): Location {
    return this.withOffset(this.offset + offset);
  }
}

class Selection {
  anchor: Location;
  focus: Location;

  constructor(anchor: LocationArgs, focus: LocationArgs) {
    this.anchor = new Location(anchor);
    this.focus = new Location(focus);
  }

  static point(location: LocationArgs): Selection {
    return new Selection(location, location);
  }

  withFocus(focus: LocationArgs): Selection {
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
