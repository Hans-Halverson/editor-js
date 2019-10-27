export type Location = {
  line: number;
  offset: number;
};

type Selection = {
  anchor: Location;
};

export default Selection;
