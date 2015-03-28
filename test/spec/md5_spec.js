// Avoid md5 never used
md5("");

describe("md5", function() {
    
    describe("should result the right checksum of",function () {
        var txt_ua32 = new Uint32Array([0x4dbfbbef, 0x74203544, 0x2d747365, 0x656c6966]);
        var txt_ua16 = new Uint16Array(txt_ua32.buffer);
        var txt_ua8 = new Uint8Array(txt_ua32.buffer);
        
        var txt_i32 = new Int32Array(txt_ua32.buffer);
        var txt_i16 = new Int16Array(txt_ua32.buffer);
        var txt_i8 = new Int8Array(txt_ua32.buffer);
        
        var txt_result = "f5c76f59b4b4fbf55af4b1ca1b845619";
        
        var str = "foobaar1234";
        var str_result = "da34c077ec806bdd107f343918a1b254";
        
        
        
        it("a Uint32Array", function() {
            expect(md5(txt_ua32)).toEqual(txt_result);
        });
        
        it("a Uint16Array", function() {
            expect(md5(txt_ua16)).toEqual(txt_result);
        });
        
        it("a Uint8Array", function() {
            expect(md5(txt_ua8)).toEqual(txt_result);
        });
        
        it("a Int32Array", function() {
            expect(md5(txt_i32)).toEqual(txt_result);
        });
        
        it("a Int16Array", function() {
            expect(md5(txt_i16)).toEqual(txt_result);
        });
        
        it("a Int8Array", function() {
            expect(md5(txt_i8)).toEqual(txt_result);
        });
        
        it("a string", function() {
            expect(md5(str)).toEqual(str_result);
        });
    });
  

  

  
});
