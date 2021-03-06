const sessionToken = 'REGISTERED_USER';

function registerUser(userInfo) {
  if ('empName' in userInfo) {
    localStorage.setItem(
      sessionToken,
      JSON.stringify({
        user: { ...userInfo },
      })
    );
    return true;
  } else {
    return false;
  }
}

function saveTestState(testState) {
  const oldSession = JSON.parse(localStorage.getItem(sessionToken));
  const newSession = {
    ...oldSession,
    testState: testState,
  };
  localStorage.setItem(sessionToken, JSON.stringify(newSession));
}
function saveLevel(skillLevel) {
  const oldSession = JSON.parse(localStorage.getItem(sessionToken));
  const newSession = {
    ...oldSession,
    level: skillLevel,
  };
  localStorage.setItem(sessionToken, JSON.stringify(newSession));
}

function getSelectedLevel() {
  const oldSession = JSON.parse(localStorage.getItem(sessionToken));
  return oldSession['level'];
}

function removeTheme() {
  localStorage.removeItem('darkTheme');
}

const isRegistered = () => {
  const tokenInfo = JSON.parse(localStorage.getItem(sessionToken));
  if (tokenInfo) {
    return true;
  } else {
    return false;
  }
};

function cleanSession() {
  localStorage.removeItem(sessionToken);
}

function getUserInfo() {
  const user_object = JSON.parse(localStorage.getItem(sessionToken));
  return user_object ? user_object['user'] : null;
}

function getTestState() {
  const oldSession = JSON.parse(localStorage.getItem(sessionToken));
  return oldSession ? oldSession['testState'] : false;
}

export {
  isRegistered,
  getUserInfo,
  registerUser,
  cleanSession,
  getTestState,
  saveTestState,
  saveLevel,
  getSelectedLevel,
  removeTheme,
};
