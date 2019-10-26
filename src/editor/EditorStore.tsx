import { createConnectedStore } from "undux";

type Location = {
  line: number;
  offset: number;
};

type Selection = {
  anchor: Location;
};

type State = {
  text: string;
  selection: Selection | null;
};

let initialState: State = {
  text: `// Type your code here, or load an example.
inline int square(int num) {
    return num*num*num*num*num*num*num*num;
}

int foo(int n, int num) {
    int res = 0;
    for(int i = 0; i < n; i++)
        res += square(num);
    return res;
}`,
  selection: null
};

export default createConnectedStore(initialState);
