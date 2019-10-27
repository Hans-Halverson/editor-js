import { Store, createConnectedStore } from "undux";

import Selection from "./Selection";

const INITIAL_TEXT = `// Type your code here, or load an example.
inline int square(int num) {
    return num*num*num*num*num*num*num*num;
}

int foo(int n, int num) {
    int res = 0;
    for(int i = 0; i < n; i++)
        res += square(num);
    return res;
}`;

type State = {
  lines: Array<string>;
  selection: Selection | null;
};

let initialState: State = {
  lines: INITIAL_TEXT.split("\n"),
  selection: null
};

export type EditorStore = Store<State>;

export default createConnectedStore(initialState);
