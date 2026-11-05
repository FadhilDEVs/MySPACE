/**
 * MySPACE - setup.gs
 * Database Setup & Sheet Formatter untuk Google Spreadsheet
 * Author: By - Fadhil
 */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Setup Database')
    .addItem('Buat / Perbarui Database', 'setupApp')
    .addItem('Rapikan Spreadsheet', 'rapikanSpreadsheet')
    .addToUi();
}

function getDbSchema_() {
  return {
    'users': [
      { name: 'id', type: 'id' },
      { name: 'username', type: 'text' },
      { name: 'password', type: 'text' },
      { name: 'created_at', type: 'datetime' },
      { name: 'updated_at', type: 'datetime' }
    ],
    'transactions': [
      { name: 'id', type: 'id' },
      { name: 'username', type: 'text' },
      { name: 'type', type: 'text' },
      { name: 'amount', type: 'currency' },
      { name: 'category', type: 'text' },
      { name: 'date', type: 'date' },
      { name: 'notes', type: 'longtext' },
      { name: 'created_at', type: 'datetime' }
    ],
    'notes': [
      { name: 'id', type: 'id' },
      { name: 'username', type: 'text' },
      { name: 'title', type: 'text' },
      { name: 'content', type: 'longtext' },
      { name: 'color', type: 'text' },
      { name: 'is_pinned', type: 'boolean' },
      { name: 'created_at', type: 'datetime' },
      { name: 'updated_at', type: 'datetime' }
    ],
    'todos': [
      { name: 'id', type: 'id' },
      { name: 'username', type: 'text' },
      { name: 'task', type: 'text' },
      { name: 'deadline', type: 'datetime' },
      { name: 'priority', type: 'text' },
      { name: 'is_completed', type: 'boolean' },
      { name: 'created_at', type: 'datetime' }
    ],
    'budgets': [
      { name: 'id', type: 'id' },
      { name: 'username', type: 'text' },
      { name: 'month_year', type: 'text' },
      { name: 'budget_amount', type: 'currency' },
      { name: 'updated_at', type: 'datetime' }
    ]
  };
}

function setupApp() {
  try {
    var ss = getSpreadsheet_();
    var schema = getDbSchema_();
    var names = Object.keys(schema);
    var lines = [];

    names.forEach(function (name, idx) {
      var cols = schema[name];
      var sh = ss.getSheetByName(name);
      var status = 'SUDAH ADA';
      if (!sh) {
        sh = ss.insertSheet(name);
        status = 'DIBUAT BARU';
      }
      var headers = cols.map(function (c) { return c.name; });
      if (sh.getLastRow() === 0) {
        sh.getRange(1, 1, 1, headers.length).setValues([headers]);
        if (status === 'SUDAH ADA') status = 'HEADER DIISI';
      } else {
        // Idempotent column check: tambahkan kolom baru jika belum ada
        var existingHeaders = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
        headers.forEach(function (h) {
          if (existingHeaders.indexOf(h) === -1) {
            sh.getRange(1, existingHeaders.length + 1).setValue(h);
            existingHeaders.push(h);
            status = 'KOLOM DIPERBARUI';
          }
        });
      }
      formatSheet_(sh, cols);
      ss.setActiveSheet(sh);
      ss.moveActiveSheet(idx + 1);
      lines.push('- ' + name + ' [' + status + ']\n   Kolom: ' + headers.join(', '));
    });

    removeDefaultSheets_(ss, names);

    var msg = 'Database MySPACE berhasil disiapkan!\n\nData yang dibuat:\n' + lines.join('\n') +
              '\n\nSemua sheet telah diformat autofit, dibekukan, dan rapi.' +
              '\n\nBy - Fadhil';
    
    Logger.log(msg);
    try {
      SpreadsheetApp.getUi().alert('Setup Database MySPACE', msg, SpreadsheetApp.getUi().ButtonSet.OK);
    } catch (e) {
      try { ss.toast('Database siap. By - Fadhil', 'Setup Database', 10); } catch (e2) {}
    }
    return msg;
  } catch (err) {
    Logger.log('SETUP ERROR: ' + err.message + '\n' + err.stack);
    throw new Error('Setup gagal: ' + err.message);
  }
}

function formatSheet_(sh, cols) {
  var n = cols.length;
  var rows = Math.max(sh.getMaxRows(), 2);
  
  // Header styling: Emerald gelap (#064e3b), text putih tebal, centered
  sh.getRange(1, 1, 1, n)
    .setFontWeight('bold')
    .setBackground('#064e3b')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  
  sh.setRowHeight(1, 34);
  sh.setFrozenRows(1);

  cols.forEach(function (c, i) {
    var r = sh.getRange(2, i + 1, rows - 1, 1).setVerticalAlignment('middle');
    if (c.type === 'date') {
      r.setNumberFormat('yyyy-mm-dd').setHorizontalAlignment('center');
    } else if (c.type === 'datetime') {
      r.setNumberFormat('yyyy-mm-dd hh:mm:ss').setHorizontalAlignment('center');
    } else if (c.type === 'number') {
      r.setNumberFormat('#,##0.##').setHorizontalAlignment('right');
    } else if (c.type === 'currency') {
      r.setNumberFormat('"Rp" #,##0').setHorizontalAlignment('right');
    } else if (c.type === 'boolean') {
      r.setHorizontalAlignment('center');
    } else if (c.type === 'longtext') {
      r.setWrap(true).setHorizontalAlignment('left');
    } else {
      r.setHorizontalAlignment('left');
    }
  });

  if (sh.getFilter()) {
    sh.getFilter().remove();
  }
  sh.getRange(1, 1, Math.max(sh.getLastRow(), 2), n).createFilter();

  sh.autoResizeColumns(1, n);
  for (var i = 1; i <= n; i++) {
    var w = sh.getColumnWidth(i);
    if (w < 100) sh.setColumnWidth(i, 100);
    if (w > 380) sh.setColumnWidth(i, 380);
  }
}

function rapikanSpreadsheet() {
  try {
    var ss = getSpreadsheet_();
    var schema = getDbSchema_();
    Object.keys(schema).forEach(function (name) {
      var sh = ss.getSheetByName(name);
      if (sh) {
        formatSheet_(sh, schema[name]);
      }
    });
    try {
      SpreadsheetApp.getUi().alert('Rapikan Spreadsheet', 'Semua sheet database berhasil dirapikan dan diformat ulang.\n\nBy - Fadhil', SpreadsheetApp.getUi().ButtonSet.OK);
    } catch (e) {
      ss.toast('Spreadsheet rapi. By - Fadhil', 'Rapikan', 5);
    }
  } catch (err) {
    throw new Error('Gagal merapikan spreadsheet: ' + err.message);
  }
}

function removeDefaultSheets_(ss, usedNames) {
  var defaultNames = ['Sheet1', 'Lembar1', 'Sheet 1', 'Lembar 1'];
  defaultNames.forEach(function (dName) {
    if (usedNames.indexOf(dName) === -1) {
      var sh = ss.getSheetByName(dName);
      if (sh && ss.getSheets().length > 1) {
        try {
          ss.deleteSheet(sh);
        } catch (e) {}
      }
    }
  });
}

