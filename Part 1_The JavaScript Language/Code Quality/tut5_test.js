//We will go in detail for this, it needs more understanding about javascript, i will return to this soon... todays date is 22-05-2025, and return date is .....



// describe("pow", function() {

//   it("raises to n-th power", function() {
//     assert.equal(pow(x, n), x**n);
//   });

// });

describe("pow", function() {
    function lmao(t) {
        
        let expected = t*t*t*t;
            it(`${t} raised to 4-th power ${expected}`, function makeTest() {
                assert.equal(pow(t, 4), expected);
        });
    };
    for (let t = 0; t < 5; t++){
        lmao(t);
    };
});