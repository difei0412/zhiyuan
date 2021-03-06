var hexcase = 0;
var b64pad = "";
var chrsz = 8;

function sha() {
  var _this = {}
  
  _this.hex_sha1 = function(s) {
    return _this.binb2hex(_this.core_sha1(_this.str2binb(s), s.length * chrsz));
  }
  _this.b64_sha1 = function(s) {
    return _this.binb2b64(_this.core_sha1(_this.str2binb(s), s.length * chrsz));
  }
  _this.str_sha1 = function(s) {
    return _this.binb2str(_this.core_sha1(_this.str2binb(s), s.length * chrsz));
  }
  _this.hex_hmac_sha1 = function(key, data) {
    return _this.binb2hex(_this.core_hmac_sha1(key, data));
  }
  _this.str_hmac_sha1 = function(key, data) {
    return _this.binb2str(_this.core_hmac_sha1(key, data));
  }
  _this.sha1_vm_test = function() {
    return _this.hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
  }
  _this.core_sha1 = function(x, len) {
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;

    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      var olde = e;

      for (var j = 0; j < 80; j++) {
        if (j < 16) w[j] = x[i + j];
        else w[j] = _this.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
        var t = _this.safe_add(_this.safe_add(_this.rol(a, 5), _this.sha1_ft(j, b, c, d)),
          _this.safe_add(_this.safe_add(e, w[j]), _this.sha1_kt(j)));
        e = d;
        d = c;
        c = _this.rol(b, 30);
        b = a;
        a = t;
      }

      a = _this.safe_add(a, olda);
      b = _this.safe_add(b, oldb);
      c = _this.safe_add(c, oldc);
      d = _this.safe_add(d, oldd);
      e = _this.safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
  }
  _this.sha1_ft = function(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
  }
  _this.sha1_kt = function(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
  }
  _this.core_hmac_sha1 = function(key, data) {
    var bkey = _this.str2binb(key);
    if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

    var ipad = Array(16),
    opad = Array(16);
    for (var i = 0; i < 16; i++) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = _this.core_sha1(ipad.concat(_this.str2binb(data)), 512 + data.length * chrsz);
    return _this.core_sha1(opad.concat(hash), 512 + 160);
  }
  _this.safe_add = function(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
  _this.rol = function(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  _this.str2binb = function(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    return bin;
  }
  _this.binb2str = function(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
      str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
    return str;
  }
  _this.binb2hex = function(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
  }
  _this.binb2b64 = function(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
      var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
      for (var j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
        else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
      }
    }
    return str;
  }
  return _this
}

module.exports = sha()
