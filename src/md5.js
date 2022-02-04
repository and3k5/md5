var ttbl = new Uint32Array([-680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426, -1473231341, -45705983, 1770035416, -1958414417, -42063, -1990404162, 1804603682, -40341101, -1502002290, 1236535329, -165796510, -1069501632, 643717713, -373897302, -701558691, 38016083, -660478335, -405537848, 568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784, 1735328473, -1926607734, -378558, -2022574463, 1839030562, -35309556, -1530992060, 1272893353, -155497632, -1094730640, 681279174, -358537222, -722521979, 76029189, -640364487, -421815835, 530742520, -995338651, -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -2054922799, 1873313359, -30611744, -1560198380, 1309151649, -145523070, -1120210379, 718787259, -343485551]);
var stbl = [[7, 12, 17, 22], [5, 9, 14, 20], [4, 11, 16, 23], [6, 10, 15, 21]];
var xtbl = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12,
    5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2,
    0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9]);

function md5(s) {
    // CONSTANTS
    var bin, tmp, i;

    switch (typeof (s)) {
        case "string":
            tmp = new Uint8Array(Math.max(64, Math.pow(2, (Math.ceil(Math.log(s.length) / Math.LN2)))));
            for (i = 0; i < s.length; i++) {
                tmp[i] = s.charCodeAt(i);
            }
            bin = new Uint32Array(tmp.buffer);
            break;
        case "object":
            if ([Uint8Array, Uint32Array, Uint16Array, Int8Array, Int32Array, Int16Array].indexOf(s.constructor) != -1) {
                // Int array

                if (!(s instanceof Uint8Array)) {
                    s = new Uint8Array(s.buffer);
                }

                tmp = new Uint8Array(Math.max(64, Math.pow(2, (Math.ceil(Math.log(s.byteLength) / Math.LN2)))));
                tmp.set(s, 0);
                bin = new Uint32Array(tmp.buffer);
            } else {
                throw "TYPEFAIL Obj - " + typeof (s);
            }
            break;
        default:
            throw "TYPEFAIL " + typeof (s);
    }

    var alone = 2;
    var len = s.length * 8;

    bin[len >> 5] |= 0x80 << ((len) % 32);
    bin[(((len + 64) >>> 9) << 4) + 14] = len;

    var result_ua32 = new Uint32Array([1732584193, -271733879, -1732584194, 271733878]);

    for (i = 0; i < bin.length; i += 16) {
        var olda = result_ua32[0];
        var oldb = result_ua32[1];
        var oldc = result_ua32[2];
        var oldd = result_ua32[3];


        for (var type = 0; type < 4; type++) {
            for (var j = 0; j < 4; j++) {
                var pos = type * 16 + j * 4;
                for (var k = 0; k < 4; k++) {
                    var pos2 = (4 + -k) % 4;

                    var a = result_ua32[pos2];
                    var b = result_ua32[(5 + -k) % 4];
                    var c = result_ua32[(6 + -k) % 4];
                    var d = result_ua32[(7 + -k) % 4];

                    var n = a + bin[i + xtbl[pos + k]] + ttbl[pos + k] + [(b & c) | ((~b) & d), (b & d) | (c & (~d)), b ^ c ^ d, c ^ (b | (~d))][type];
                    var n2 = stbl[type][k];

                    result_ua32[pos2] = ((n << n2) | (n >>> (32 - n2))) + b;

                }
            }
        }

        result_ua32[0] += olda;
        result_ua32[1] += oldb;
        result_ua32[2] += oldc;
        result_ua32[3] += oldd;
    }

    var arr = new Uint8Array(result_ua32.buffer);

    var rtn = "";
    for (i = 0, len = arr.length; i < len; i++) {
        rtn += ("0" + arr[i].toString(16)).slice(-2);
    }

    return rtn;
}