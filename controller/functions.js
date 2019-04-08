'use strict';

module.exports = {

    // filters out all that is f(x)
    filter: function(f, array) {
        let A = [];
        for (let i = 0; i < array.length; i++) {
            if (!f(array[i])) {
                A[A.length] = array[i];
            }
        }
        return A;
    },

    // maps f on all elements
    map: function(f, array) {
        let A = [];
        for (let i = 0; i < array.length; i++) {
            A[i] = f(array[i]);
        }
        return A;
    },
    
    // returns whether all pass f(x)
    check: function(f, array) {
        let result = true;
        for (let i = 0; i < array.length; i++) {
            if (!f(array[i])) {
                result = false;
            }
        }
        return result;
    },
    
    // prints the list with header at the top (single line)
    printlist: function(array, header) {
        let body = '\n\n';
        for (let i = 0; i < array.length; i++) {
            body += `*${i + 1}*.  ${array[i]}\n`
        }
        if (body === '\n\n') {
            return header;
        } else {
            return header + body;
        }
    },

    // returns decimal number of n
    getDecimal: function(n) {
        return ((n * 100) % 1);
    },

    // checks if its 2 dp
    validateCash: function(n) {
        return (this.getDecimal(n) % 1 === 0);
    }
};