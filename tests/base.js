var assert = require('chai').assert;
var Compare = require('../modules/compare-data-structure');

describe('Basic structure', function(){
    it('Base', function(done) {
        var basicDataProvide = [
            [1, "number"],
            ["Alex", "string"],
            [3, "number|string"],
            [{}, "object"],
            [null, 'null'],
            [
                {
                    "id": 1
                },
                {
                    "object": {
                        "id": "number"
                    }
                }
            ],
            [
                [1, 2, 3],
                {
                    "array": "number"
                }
            ],
            [
                "GitHub",
                {
                    "set": ["GitHub", "LinkedIn"]
                }
            ],
            [
                {
                    "id": 1,
                    "name": "Alex"
                },
                "ShortUserInfo",
                {
                    "ShortUserInfo": {
                        "object": {
                            "id": "number",
                            "name": "string"
                        }
                    }
                }
            ],
            [
                [
                    {
                        "model": "A8",
                        "trademark": "Audi",
                        "class": "Premium",
                        "country": {
                            "name": "Deutschland"
                        }
                    },
                    {
                        "model": 80,
                        "trademark": "Audi",
                        "class": "Premium",
                        "country": {
                            "name": "Deutschland"
                        }
                    }, {
                    "author": "Достоевский Фёдор Михайлович",
                    "title": "Преступление и наказание"
                },
                    {
                        "author": "Steve McConnell",
                        "title": "Code Complete"
                    }
                ],
                {
                    "array": "Book|Car"
                },
                {
                    "Car": {
                        "object": {
                            "model": "string|number",
                            "trademark": "string",
                            "class": "string",
                            "country": "Country"
                        }
                    },
                    "Book": {
                        "object": {
                            "author": "string",
                            "title": "string"
                        }
                    },
                    "Country": {
                        "object": {
                            "name": "string"
                        }
                    }
                }
            ],
            [
                [
                    {
                        "id": 1,
                        "children": false
                    },
                    {
                        "id": 1,
                        "children": {
                            "id": 3,
                            "children": []
                        }
                    },
                    {
                        "id": 1,
                        "children": {
                            "id": 3,
                            "children": [
                                {
                                    "id": 5,
                                    "children": true
                                },
                                {
                                    "id": 7,
                                    "children": false
                                }
                            ]
                        }
                    }
                ],
                "Children",
                {
                    "Tree": {
                        "object": {
                            "id": "number",
                            "children": "Children|Tree|boolean"
                        }
                    },
                    "Children": {
                        "array": "Tree"
                    }
                }
            ]
        ];

        for (var index in basicDataProvide) {
            var diff = Compare.check.apply(null, basicDataProvide[index]);

            assert.ok( diff.isEqual(), diff.getMessage() );
        }

        done();

    })
    it('Base Diff', function(done) {
        var diffDataProvider = [
            {
                data: 1,
                structure: "string",
                message: "given: 'number' instead of: 'string'"
            }, {
                data: "Facebook",
                structure: {
                    "set": ["GitHub", "LinkedIn"]
                },
                message: "value: 'Facebook' out of set: 'GitHub,LinkedIn'"
            }, {
                data: true,
                structure: false,
                message: Compare.errors.config
            }
        ];

        for (var index in diffDataProvider) {
            var provider = diffDataProvider[index];

            var diff = Compare.check(provider.data, provider.structure);

            assert.equal(diff.isEqual(), false);
            assert.equal(diff.getMessage(), provider.message);
        }

        done();

    })
});