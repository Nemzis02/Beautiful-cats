import gql from 'graphql-tag';

const getAppState = gql`
  query {
    state @client {
      appState {
        isDarkModeEnabled
      }
    }
  }
`;

export default (getState, writeState) => {
  return {
    Mutation: {
      updateAppState(_, appState) {
        const state = getState(getAppState);
        console.log(state);
        const newState = {
          ...state,
          appState: Object.assign({}, state.appState, appState)
        };

        writeState(newState);
        return newState;
      }
    }
  };
};
