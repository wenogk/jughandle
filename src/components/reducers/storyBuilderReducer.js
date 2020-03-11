let initialState = {
  "root" : {
    title: "Start Root Path",
    text: "",
    options: [],
    video: ""
  }
}

 function storyBuilderReducer(state = initialState, action) {
  let newState = {...state}
  console.log("new reducer action: " + action.type);
  switch (action.type) {
    case "add-option" :
      let newOption = {
        pathID : action.newOptionID,
        text : action.text
      }
      newState[action.pathID] = {
        title : state[action.pathID].title,
        text : state[action.pathID].text,
        options : [...state[action.pathID].options, newOption],
        video : state[action.pathID].video
      };
      newState[action.newOptionID] = {
        title : action.text,
        text : "",
        options: [],
        video: ""
      }
      console.log(JSON.stringify(newState));
      return newState;
    case "delete-option" :
      let index = newState[action.parentID].options.findIndex(x => x.pathID === action.pathID);
      newState[action.parentID].options.splice(index, 1)
      delete newState[action.pathID];
      console.log("delete-option" + JSON.stringify(action));
      console.log("delete-option" + JSON.stringify(newState));
      return cleanPathState(newState);
    case "change-path-text":
      newState[action.pathID] = {
        title : state[action.pathID].title,
        text : action.text,
        video : state[action.pathID].video,
        options : [...state[action.pathID].options],
      };
      console.log(JSON.stringify(newState));
      return newState;

    case "change-option-text":
      for(var path in newState) {
        if(path == action.pathID) {
          newState[path].title = action.text;
        }
        for(let x = 0; x < newState[path].options.length ; x++) {
          let option = newState[path].options[x]
          if(option.pathID == action.pathID) {
            option.text = action.text;
          }
        }
      }

      console.log(JSON.stringify(newState));
      return newState;
    case "add-video" :
      newState[action.pathID] = {
        title : state[action.pathID].title,
        text : state[action.pathID].text,
        video : action.url,
        options : [...state[action.pathID].options],
      };
      return newState;
    case "edit-video":
      newState[action.pathID] = {
        title : state[action.pathID].title,
        text : state[action.pathID].text,
        video : action.url,
        options : [...state[action.pathID].options],
      };
      return newState;
    case "delete-video":
      newState[action.pathID] = {
        title : state[action.pathID].title,
        text : state[action.pathID].text,
        options : [...state[action.pathID].options],
      };
      return newState;
    case "add-image":
      return;
    default:
      return state;
  }
}
function cleanPathState(state) {
  let memoizationMap = {} //memoization for doesPathIDExistInOptions function
  function doesPathIDExistInOptions(pathID) {
      if(memoizationMap[pathID]===true) {
        return true;
      } else if(memoizationMap[pathID]===false) {
        return false;
      }
      for(let pathID in newState) {
        for(let optionIndex in newState[pathID].options) {
          if(newState[pathID].options[optionIndex].pathID === pathID) {
            memoizationMap[pathID] = true;
            return true;
          }
        }
      }
      memoizationMap[pathID] = false;
      return false;
  }
  //takes in the paths state and checks if there are path ids that are not options and then deletes that path if not an option
  let newState = {...state}
  let cleanPaths = true;
  do {
    for(let pathID in newState) {
      if(!doesPathIDExistInOptions(pathID)) {
        delete newState[pathID];
        cleanPaths = false;
      }
    }
    cleanPaths = true;
  } while(!cleanPaths);
  return state;
}

export default storyBuilderReducer;
