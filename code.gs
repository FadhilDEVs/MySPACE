/**
 * MySPACE - code.gs
 * Backend API Google Apps Script (Mode B: JSON API + CORS untuk GitHub Pages)
 * Author: By - Fadhil
 */

function doGet(e) {
  return handleRequest_(e);
}

function doPost(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  var output;
  try {
    var req = parseRequest_(e);
    output = routeAction_(req);
  } catch (err) {
    output = {
      ok: false,
      message: String(err && err.message ? err.message : err)
    };
  }
  return jsonResponse_(output, e);
}

function parseRequest_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // Jika string URL-encoded atau text biasa
      return { action: '', payload: {} };
    }
  }
  var p = (e && e.parameter) || {};
  var payload = {};
  if (p.payload) {
    try {
      payload = JSON.parse(p.payload);
    } catch (err) {
      payload = {};
    }
  }
  return {
    action: p.action || '',
    payload: payload,
    token: p.token || ''
  };
}

function jsonResponse_(obj, e) {
  var text = JSON.stringify(obj);
  var cb = e && e.parameter && e.parameter.callback;
  if (cb && /^[A-Za-z_$][\w$.]*$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + text + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet_() {
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  throw new Error('Spreadsheet tidak ditemukan. Buka dari Spreadsheet (Extensions > Apps Script) atau isi Script Property SPREADSHEET_ID.');
}

function routeAction_(req) {
  var action = req.action;
  var p = req.payload || {};

  switch (action) {
    case 'ping':
      return { ok: true, data: { status: 'online', app: 'MySPACE', time: new Date().toISOString() } };

    case 'register':
      return registerUser_(p.username, p.password);

    case 'login':
      return loginUser_(p.username, p.password);

    case 'changeUsername':
      return changeUsername_(p.oldUsername, p.newUsername, p.password);

    case 'changePassword':
      return changePassword_(p.username, p.oldPassword, p.newPassword);

    case 'getInitialData':
      return getInitialData_(p.username);

    case 'saveTransaction':
      return saveTransaction_(p);

    case 'deleteTransaction':
      return deleteTransaction_(p.id, p.username);

    case 'saveNote':
      return saveNote_(p);

    case 'deleteNote':
      return deleteNote_(p.id, p.username);

    case 'togglePinNote':
      return togglePinNote_(p.id, p.username);

    case 'saveTodo':
      return saveTodo_(p);

    case 'toggleTodo':
      return toggleTodo_(p.id, p.username, p.is_completed);

    case 'deleteTodo':
      return deleteTodo_(p.id, p.username);

    case 'saveBudget':
      return saveBudget_(p.username, p.month_year, p.budget_amount);

    default:
      return { ok: false, message: 'Action tidak dikenal: ' + action };
  }
}

/* ==========================================================================
   AUTHENTICATION & PROFILE (Plain text password as requested by USER)
   ========================================================================== */

function registerUser_(username, password) {
  if (!username || !password) {
    return { ok: false, message: 'Username dan Password wajib diisi.' };
  }
  username = String(username).trim();
  password = String(password).trim();

  if (username.length < 3) {
    return { ok: false, message: 'Username minimal 3 karakter.' };
  }
  if (password.length < 4) {
    return { ok: false, message: 'Password minimal 4 karakter.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('users');
    if (!sh) throw new Error('Sheet users belum disiapkan.');

    var data = sh.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]).toLowerCase() === username.toLowerCase()) {
        return { ok: false, message: 'Username sudah digunakan. Silakan gunakan username lain.' };
      }
    }

    var id = Utilities.getUuid();
    var now = new Date();
    // Simpan password plain text sesuai permintaan user
    sh.appendRow([id, username, password, now, now]);

    return {
      ok: true,
      data: {
        id: id,
        username: username,
        token: id + '_' + Utilities.base64Encode(username)
      }
    };
  } finally {
    lock.releaseLock();
  }
}

function loginUser_(username, password) {
  if (!username || !password) {
    return { ok: false, message: 'Username dan Password wajib diisi.' };
  }
  username = String(username).trim();
  password = String(password).trim();

  var ss = getSpreadsheet_();
  var sh = ss.getSheetByName('users');
  if (!sh) throw new Error('Sheet users belum disiapkan.');

  var data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var rowUser = String(data[i][1]).trim();
    var rowPass = String(data[i][2]).trim();

    if (rowUser.toLowerCase() === username.toLowerCase()) {
      if (rowPass === password) {
        var id = data[i][0];
        return {
          ok: true,
          data: {
            id: id,
            username: rowUser,
            token: id + '_' + Utilities.base64Encode(rowUser)
          }
        };
      } else {
        return { ok: false, message: 'Password salah.' };
      }
    }
  }
  return { ok: false, message: 'Username tidak ditemukan.' };
}

function changeUsername_(oldUsername, newUsername, password) {
  if (!oldUsername || !newUsername || !password) {
    return { ok: false, message: 'Semua kolom wajib diisi.' };
  }
  oldUsername = String(oldUsername).trim();
  newUsername = String(newUsername).trim();
  password = String(password).trim();

  if (newUsername.length < 3) {
    return { ok: false, message: 'Username baru minimal 3 karakter.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var shUsers = ss.getSheetByName('users');
    var usersData = shUsers.getDataRange().getValues();
    var userRowIdx = -1;

    for (var i = 1; i < usersData.length; i++) {
      if (String(usersData[i][1]).toLowerCase() === newUsername.toLowerCase() &&
          String(usersData[i][1]).toLowerCase() !== oldUsername.toLowerCase()) {
        return { ok: false, message: 'Username baru sudah digunakan.' };
      }
      if (String(usersData[i][1]).toLowerCase() === oldUsername.toLowerCase()) {
        if (String(usersData[i][2]).trim() !== password) {
          return { ok: false, message: 'Password salah.' };
        }
        userRowIdx = i + 1;
      }
    }

    if (userRowIdx === -1) {
      return { ok: false, message: 'Akun tidak ditemukan.' };
    }

    // Update username di sheet users
    shUsers.getRange(userRowIdx, 2).setValue(newUsername);
    shUsers.getRange(userRowIdx, 5).setValue(new Date());

    // Cascade update username di seluruh sheet terkait
    var sheetsToCascade = ['transactions', 'notes', 'todos', 'budgets'];
    sheetsToCascade.forEach(function (sheetName) {
      var sh = ss.getSheetByName(sheetName);
      if (sh && sh.getLastRow() > 1) {
        var values = sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues();
        var modified = false;
        for (var j = 0; j < values.length; j++) {
          if (String(values[j][0]).toLowerCase() === oldUsername.toLowerCase()) {
            values[j][0] = newUsername;
            modified = true;
          }
        }
        if (modified) {
          sh.getRange(2, 2, values.length, 1).setValues(values);
        }
      }
    });

    return { ok: true, data: { username: newUsername } };
  } finally {
    lock.releaseLock();
  }
}

function changePassword_(username, oldPassword, newPassword) {
  if (!username || !oldPassword || !newPassword) {
    return { ok: false, message: 'Semua kolom wajib diisi.' };
  }
  username = String(username).trim();
  oldPassword = String(oldPassword).trim();
  newPassword = String(newPassword).trim();

  if (newPassword.length < 4) {
    return { ok: false, message: 'Password baru minimal 4 karakter.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('users');
    var data = sh.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]).toLowerCase() === username.toLowerCase()) {
        if (String(data[i][2]).trim() !== oldPassword) {
          return { ok: false, message: 'Password lama salah.' };
        }
        sh.getRange(i + 1, 3).setValue(newPassword);
        sh.getRange(i + 1, 5).setValue(new Date());
        return { ok: true, data: { message: 'Password berhasil diubah.' } };
      }
    }
    return { ok: false, message: 'Pengguna tidak ditemukan.' };
  } finally {
    lock.releaseLock();
  }
}

/* ==========================================================================
   INITIAL DATA RETRIEVAL (Multi-user Isolation)
   ========================================================================== */

function getInitialData_(username) {
  if (!username) {
    return { ok: false, message: 'Username tidak valid.' };
  }
  username = String(username).toLowerCase().trim();

  var ss = getSpreadsheet_();

  var txList = readSheetData_(ss, 'transactions', function (row) {
    return String(row.username).toLowerCase().trim() === username;
  });

  var notesList = readSheetData_(ss, 'notes', function (row) {
    return String(row.username).toLowerCase().trim() === username;
  });

  var todosList = readSheetData_(ss, 'todos', function (row) {
    return String(row.username).toLowerCase().trim() === username;
  });

  var budgetsList = readSheetData_(ss, 'budgets', function (row) {
    return String(row.username).toLowerCase().trim() === username;
  });

  return {
    ok: true,
    data: {
      transactions: txList,
      notes: notesList,
      todos: todosList,
      budgets: budgetsList
    }
  };
}

function readSheetData_(ss, sheetName, filterFn) {
  var sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() <= 1) return [];

  var values = sh.getDataRange().getValues();
  var headers = values[0];
  var list = [];

  for (var i = 1; i < values.length; i++) {
    var obj = {};
    for (var h = 0; h < headers.length; h++) {
      var val = values[i][h];
      if (val instanceof Date) {
        val = Utilities.formatDate(val, Session.getScriptTimeZone() || 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ss");
      }
      obj[headers[h]] = val;
    }
    if (!filterFn || filterFn(obj)) {
      list.push(obj);
    }
  }
  return list;
}

/* ==========================================================================
   TRANSACTIONS CRUD
   ========================================================================== */

function saveTransaction_(p) {
  if (!p.username || !p.type || !p.amount || !p.category || !p.date) {
    return { ok: false, message: 'Data transaksi tidak lengkap.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('transactions');
    var id = p.id || Utilities.getUuid();
    var now = new Date();
    var dateVal = new Date(p.date);

    if (p.id) {
      // Update existing
      var data = sh.getDataRange().getValues();
      var foundRow = -1;
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(p.id) &&
            String(data[i][1]).toLowerCase() === String(p.username).toLowerCase()) {
          foundRow = i + 1;
          break;
        }
      }
      if (foundRow !== -1) {
        sh.getRange(foundRow, 3, 1, 5).setValues([[
          p.type,
          Number(p.amount),
          p.category,
          dateVal,
          p.notes || ''
        ]]);
        return { ok: true, data: { id: p.id, updated: true } };
      }
    }

    // Insert new row
    sh.appendRow([
      id,
      String(p.username).trim(),
      p.type,
      Number(p.amount),
      p.category,
      dateVal,
      p.notes || '',
      now
    ]);

    return { ok: true, data: { id: id, created: true } };
  } finally {
    lock.releaseLock();
  }
}

function deleteTransaction_(id, username) {
  if (!id || !username) return { ok: false, message: 'ID dan username wajib diisi.' };

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('transactions');
    var data = sh.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id) &&
          String(data[i][1]).toLowerCase() === String(username).toLowerCase()) {
        sh.deleteRow(i + 1);
        return { ok: true, data: { id: id } };
      }
    }
    return { ok: false, message: 'Transaksi tidak ditemukan.' };
  } finally {
    lock.releaseLock();
  }
}

/* ==========================================================================
   NOTES CRUD
   ========================================================================== */

function saveNote_(p) {
  if (!p.username || (!p.title && !p.content)) {
    return { ok: false, message: 'Judul atau isi catatan wajib diisi.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('notes');
    var id = p.id || Utilities.getUuid();
    var now = new Date();

    if (p.id) {
      var data = sh.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(p.id) &&
            String(data[i][1]).toLowerCase() === String(p.username).toLowerCase()) {
          sh.getRange(i + 1, 3, 1, 6).setValues([[
            p.title || '',
            p.content || '',
            p.color || 'emerald',
            Boolean(p.is_pinned),
            data[i][6],
            now
          ]]);
          return { ok: true, data: { id: p.id, updated: true } };
        }
      }
    }

    sh.appendRow([
      id,
      String(p.username).trim(),
      p.title || '',
      p.content || '',
      p.color || 'emerald',
      Boolean(p.is_pinned),
      now,
      now
    ]);
    return { ok: true, data: { id: id, created: true } };
  } finally {
    lock.releaseLock();
  }
}

function togglePinNote_(id, username) {
  if (!id || !username) return { ok: false, message: 'ID dan username wajib diisi.' };

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('notes');
    var data = sh.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id) &&
          String(data[i][1]).toLowerCase() === String(username).toLowerCase()) {
        var currentPin = Boolean(data[i][5]);
        sh.getRange(i + 1, 6).setValue(!currentPin);
        sh.getRange(i + 1, 8).setValue(new Date());
        return { ok: true, data: { id: id, is_pinned: !currentPin } };
      }
    }
    return { ok: false, message: 'Catatan tidak ditemukan.' };
  } finally {
    lock.releaseLock();
  }
}

function deleteNote_(id, username) {
  if (!id || !username) return { ok: false, message: 'ID dan username wajib diisi.' };

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('notes');
    var data = sh.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id) &&
          String(data[i][1]).toLowerCase() === String(username).toLowerCase()) {
        sh.deleteRow(i + 1);
        return { ok: true, data: { id: id } };
      }
    }
    return { ok: false, message: 'Catatan tidak ditemukan.' };
  } finally {
    lock.releaseLock();
  }
}

/* ==========================================================================
   TODOS CRUD
   ========================================================================== */

function saveTodo_(p) {
  if (!p.username || !p.task) {
    return { ok: false, message: 'Nama tugas wajib diisi.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('todos');
    var id = p.id || Utilities.getUuid();
    var now = new Date();
    var deadlineVal = p.deadline ? new Date(p.deadline) : '';

    if (p.id) {
      var data = sh.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(p.id) &&
            String(data[i][1]).toLowerCase() === String(p.username).toLowerCase()) {
          sh.getRange(i + 1, 3, 1, 4).setValues([[
            p.task,
            deadlineVal,
            p.priority || 'Sedang',
            Boolean(p.is_completed)
          ]]);
          return { ok: true, data: { id: p.id, updated: true } };
        }
      }
    }

    sh.appendRow([
      id,
      String(p.username).trim(),
      p.task,
      deadlineVal,
      p.priority || 'Sedang',
      Boolean(p.is_completed),
      now
    ]);
    return { ok: true, data: { id: id, created: true } };
  } finally {
    lock.releaseLock();
  }
}

function toggleTodo_(id, username, is_completed) {
  if (!id || !username) return { ok: false, message: 'ID dan username wajib diisi.' };

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('todos');
    var data = sh.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id) &&
          String(data[i][1]).toLowerCase() === String(username).toLowerCase()) {
        sh.getRange(i + 1, 6).setValue(Boolean(is_completed));
        return { ok: true, data: { id: id, is_completed: Boolean(is_completed) } };
      }
    }
    return { ok: false, message: 'Tugas tidak ditemukan.' };
  } finally {
    lock.releaseLock();
  }
}

function deleteTodo_(id, username) {
  if (!id || !username) return { ok: false, message: 'ID dan username wajib diisi.' };

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('todos');
    var data = sh.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id) &&
          String(data[i][1]).toLowerCase() === String(username).toLowerCase()) {
        sh.deleteRow(i + 1);
        return { ok: true, data: { id: id } };
      }
    }
    return { ok: false, message: 'Tugas tidak ditemukan.' };
  } finally {
    lock.releaseLock();
  }
}

/* ==========================================================================
   BUDGETS
   ========================================================================== */

function saveBudget_(username, month_year, budget_amount) {
  if (!username || !month_year) {
    return { ok: false, message: 'Username dan periode bulan wajib diisi.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var ss = getSpreadsheet_();
    var sh = ss.getSheetByName('budgets');
    var data = sh.getDataRange().getValues();
    var now = new Date();
    var amount = Number(budget_amount) || 0;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]).toLowerCase() === String(username).toLowerCase() &&
          String(data[i][2]) === String(month_year)) {
        sh.getRange(i + 1, 4, 1, 2).setValues([[amount, now]]);
        return { ok: true, data: { month_year: month_year, budget_amount: amount, updated: true } };
      }
    }

    var id = Utilities.getUuid();
    sh.appendRow([id, String(username).trim(), String(month_year), amount, now]);
    return { ok: true, data: { id: id, month_year: month_year, budget_amount: amount, created: true } };
  } finally {
    lock.releaseLock();
  }
}
