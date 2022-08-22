import {
  POPULATE_USER,
  UNPOPULATE_USER,
  UPDATE_EXPERIENCE,
  UPDATE_FILES
} from "./type";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case POPULATE_USER: {
      return (state = {
        ...state,
        user: payload
      });
    }
    case UNPOPULATE_USER: {
      return (state = {
        ...state,
        user: {}
      });
    }
    case UPDATE_EXPERIENCE: {
      return (state = {
        ...state,
        experiences: payload
      });
    }
    case UPDATE_FILES: {
      return (state = {
        ...state,
        files: payload
      });
    }
  }
};
