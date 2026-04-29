import {useReducer} from 'react';

type State = {
  email: string;
  password: string;
};

type Action =
  | {type: 'emailChanged'; value: string}
  | {type: 'passwordChanged'; value: string}
  | {type: 'reset'};

const initialState: State = {
  email: '',
  password: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'emailChanged':
      return {...state, email: action.value};
    case 'passwordChanged':
      return {...state, password: action.value};
    case 'reset':
      return initialState;
  }
}

export function LoginFormReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form>
      <input
        type="email"
        value={state.email}
        onChange={(event) =>
          dispatch({type: 'emailChanged', value: event.target.value})
        }
      />
      <input
        type="password"
        value={state.password}
        onChange={(event) =>
          dispatch({type: 'passwordChanged', value: event.target.value})
        }
      />
    </form>
  );
}

