
//Пример организации структуры данных

let rightsList = [
  /*"manage content", 
  "play games", 
  "delete users", 
  "view site"*/
];

let groupList  = {
  /*"admin": [rightsList[2]],
	"manager": [rightsList[0]],
	"basic": [rightsList[1], rightsList[3]]*/
}

let userList = [
  /*{
    username: "Admin",
    password: "Admin",
    groups: [
      groupList.admin, 
      groupList.manager,
      groupList.basic
    ]
  }*/
]

let activeUser = undefined;

//-------------------------------
// Вспомогательные функции

function isBadArgument(argument, type) {
  
  return (typeof argument != type || !(!!argument));

}

function seekGroupKey(group) {
  
  for (key in groupList) {
    if (groupList[key] === group) {
      return key;
    }
  }

  return -1; 

}

//-------------------------------

// Возвращает массив всех пользователей.
function users() {
  return userList;
}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password) {

  if (isBadArgument(name, "string") || isBadArgument(password, "string")) {
    throw new Error('Неверные данные');
  }

  let newUser = {};
  newUser.username = name;
  newUser.password = password;
  newUser.groups = [];
  userList.push(newUser);
  
  return userList[userList.length - 1];

}

// Удаляет пользователя user
function deleteUser(user) {
  
  if (isBadArgument(user, "object")) {
    throw new Error('Неверные данные');
  }

  let userIndex = userList.indexOf(user);
  
  if (userIndex !== -1) {
    userList.splice(userIndex, 1);
  } else {
    throw new Error('Пользователь не найден');
  };

}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {

  let userIndex = userList.indexOf(user);
  
  if (userIndex !== -1) {
    return user.groups;
  } else {
    throw new Error('Пользователь не найден');
  };

}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {

  if (isBadArgument(user, "object") || isBadArgument(group, "object")) {
    throw new Error('Неверные данные');
  };

  let userIndex = userList.indexOf(user);
  let groupIndex = seekGroupKey(group);

  if (userIndex !== -1) {
    if (groupIndex !== -1) {
      user.groups.push(groupList[groupIndex]);
    } else {
      throw new Error('Группа не найдена');
    }
  } else {
    throw new Error('Пользователь не найден');
  }

}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {

  if (isBadArgument(user, "object") || isBadArgument(group, "object")) {
    throw new Error('Неверные данные');
  };

  let cleanUp = arguments[2];
  let userIndex = userList.indexOf(user);
  let groupIndex = userList[userIndex].groups.indexOf(group);

  if (userIndex !== -1) {
    if (groupIndex !== -1) {
      user.groups.splice(groupIndex, 1);
    } else if (cleanUp !== true) {
      throw new Error("Пользователь не состоит в группе");
    }
  } else {
    throw new Error("Пользователь не найден");
  }
}

// Возвращает массив прав
function rights() {

  return rightsList;

}

// Создает новое право с именем name и возвращает его
function createRight(name) {

  if (isBadArgument(name, "string")) {
    throw new Error("Неверные данные");
  }

  rightsList.push(name);
  
  return rightsList[rightsList.length - 1];

}

// Удаляет право right
function deleteRight(right) {

  if (isBadArgument(right, "string")) {
    throw new Error("Неверные данные");
  }

  let rightIndex = rightsList.indexOf(right);

  if (rightIndex != -1) {
    for (group in groupList) {
      removeRightFromGroup(right, groupList[group], true);
    };
    rightsList.splice(rightIndex, 1);
  } else {
    throw new Error("Право не найдено");  
  }

}

// Возвращает массив групп
function groups() {

  let groupsArr = [];

  for (key in groupList) {
    groupsArr.push(groupList[key]);
  }
  
  return groupsArr;

}

// Создает новую группу и возвращает её.
function createGroup(name) {

  if (isBadArgument(name, "string")) {
    throw new Error("Неверные данные");
  }

  if (name != "" && groupList[name] === undefined) {
    groupList[name] = [];

    return groupList[name];

  } else {
    throw new Error("Группа уже существует или имя группы задано неверно");
  }

}

// Удаляет группу group
function deleteGroup(group) {

  if (isBadArgument(group, "object")) {
    throw new Error("Неверные данные");
  }

  if (seekGroupKey(group) != -1) {
    for (user in userList) {
      removeUserFromGroup(userList[user], group, true);
    };
    delete groupList[seekGroupKey(group)];
  } else {
    throw new Error("Группа не найдена");
  }

}

// Возвращает массив прав, которые принадлежат группе group
function groupRights() {

  let group = arguments[0];

  if (isBadArgument(group, "object")) {
    throw new Error("Неверные данные");
  }

  if (seekGroupKey(group) !== -1) {
    return group;
  } else {
    throw new Error("Группа не найдена");
  }

}

// Добавляет право right к группе group
function addRightToGroup() {
  
  let right = arguments[0];
  let group = arguments[1];

  if (isBadArgument(group, "object") || isBadArgument(right, "string")) {
    throw new Error("Неверные данные");
  }
  
  let rightIndex = rightsList.indexOf(right);
  let groupIndex = seekGroupKey(group);

  if (groupIndex != -1) {
    if (rightIndex != -1) {
      group.push(rightsList[rightIndex]);
    } else {
      throw new Error("Право не найдено");
    }
  } else {
    throw new Error("Группа не найдена");
  }

}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup() {

  let right = arguments[0];
  let group = arguments[1];
  
  if (isBadArgument(group, "object") || isBadArgument(right, "string")) {
    throw new Error("Неверные данные");
  }

  let cleanUp = arguments[2];
  let groupIndex = seekGroupKey(group);
  let rightIndex = groupList[groupIndex].indexOf(right);

  if (groupIndex != -1) {
    if (rightIndex != -1) {
      groupList[groupIndex].splice(rightIndex, 1);
    } else if (cleanUp !== true){
      throw new Error("Право не найдено в группе");
    }
  } else {
    throw new Error("Группа не найдена");
  }

}

function login(username, password) {

  if (!!activeUser) {
    return false;
  }

  if (isBadArgument(username, "string") || isBadArgument(password, "string")) {
    throw new Error("Неверные данные");
  }  

  for (user in userList) {
    if (userList[user].username === username && userList[user].password === password) {
      activeUser = userList[user];
      return true;
    }
  }

  return false;

}

function currentUser() {
  return activeUser;
}

function logout() {
  activeUser = undefined;
}

function isAuthorized(user, right) {

  if (isBadArgument(user, "object") || isBadArgument(right, "string")) {
    throw new Error("Неверные данные");
  }  

  let userIndex = userList.indexOf(user);
  let rightIndex = rightsList.indexOf(right);

  if (userIndex != -1 && rightIndex != -1) {
    
    for (group in user.groups) {
      for (userRight in user.groups[group]) {
        if (user.groups[group][userRight] === right) {
          return true;
        }
      }
    }
  
    return false;

  } else {
    throw new Error('Пользователя или права не существует');
  }

}