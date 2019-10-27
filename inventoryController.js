const config = require("./config.json");
let DataBase = require('./dbt.js');
let sql = new DataBase(config.dbConfig);

module.exports = {
    getAllCategories: (req, res) => {
        let query = "SELECT * FROM inventory.Categories";
        sql.query(query)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getCategoryById: (req, res) => {
        let id = req.params.id;
        console.log(id);
        let query = 'SELECT * FROM inventory.Categories WHERE id = ?';
        sql.query(query, id)
            .then(result => {
                res.send(result[0])
            })
            .catch(err => {
                console.log(err)
                return res.sendStatus(500)
            });
    },
    addNewCategory: (req, res) => {
        let categoryName = req.body.categoryName;
        let query = 'INSERT INTO inventory.Categories (categoryName) VALUES (?)';
        sql.query(query, categoryName)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    deleteCategoryById: (req, res) => {
        let id = req.params.id;
        let query = 'DELETE FROM inventory.Categories WHERE id = ?';
        sql.query(query, id)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send(err)
            });
    },
    changeCategoryNameById: (req, res) => {
        let id = req.params.id;
        let categoryName = req.body.categoryName;
        let query = 'UPDATE inventory.Categories SET categoryName = ? WHERE id = ?';
        sql.query(query, [categoryName, id])
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getAllAreas: (req, res) => {
        let query = "SELECT * FROM inventory.Areas";
        sql.query(query)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getAreaById: (req, res) => {
        let id = req.params.id;
        let query = 'SELECT * FROM inventory.Areas WHERE id = ?';
        sql.query(query, id)
            .then(result => {
                res.send(result[0]);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    addNewArea: (req, res) => {
        let areaName = req.body.areaName;
        let query = 'INSERT INTO inventory.Areas (areaName) VALUES (?)';
        sql.query(query, areaName)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    deleteAreaById: (req, res) => {
        let id = req.params.id;
        let query = 'DELETE FROM inventory.Areas WHERE id = ?';
        sql.query(query, id)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    changeAreaNameById: (req, res) => {
        let id = req.params.id;
        let areaName = req.body.areaName;
        let query = 'UPDATE inventory.Areas SET areaName = ? WHERE id = ?';
        sql.query(query, [areaName, id])
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getAllBoxes: (req, res) => {
        let query = "SELECT * FROM inventory.Boxes";
        sql.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(result);
        });
    },
    getBoxById: (req, res) => {
        let id = req.params.id;
        let query = 'SELECT b.id, a.areaName AS areaName FROM inventory.Boxes b INNER JOIN inventory.Areas a ON b.areaId = a.id WHERE b.id = ?';
        sql.query(query, [id])
            .then(result => {
                res.send(result[0])
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            })
    },
    getItemsInBoxById: (req, res) => {
        let id = req.params.id;
        let query = 'SELECT i.id, i.itemName, i.itemDescription, GROUP_CONCAT(c.categoryName) AS categoryName FROM inventory.Items i LEFT JOIN inventory.ItemsCategories ic ON i.id = ic.itemId LEFT JOIN inventory.Categories c ON ic.categoryId = c.id WHERE i.boxId= ? GROUP BY i.id';
        sql.query(query, [id])
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            })
    },
    addNewBox: (req, res) => {
        let areaName = req.body.areaName;
        let query = 'INSERT INTO inventory.Boxes (areaId) VALUES ((SELECT id FROM inventory.Areas WHERE areaName = ?))';
        sql.query(query, areaName)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    deleteBoxById: (req, res) => {
        let id = req.params.id;
        let query = 'DELETE FROM inventory.Boxes WHERE id = ?';
        sql.query(query, id)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    changeAreaNameForBoxById: (req, res) => {
        let id = req.params.id;
        let areaName = req.body.areaName;
        let query = 'UPDATE inventory.Boxes SET areaId = (SELECT id FROM inventory.Areas WHERE areaName = ?) WHERE id = ?';
        sql.query(query, [areaName, id])
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    addItemToBox: (req, res) => {
        let id = req.params.id;
        let itemId = req.params.itemId;
        let query = 'UPDATE inventory.Items SET boxId = ? WHERE id = ?';
        sql.query(query, [id, itemId])
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    deleteItemFromBox: (req, res) => {
        let id = req.params.id;
        let itemId = req.params.itemId;
        console.log(itemId);
        let query = 'UPDATE inventory.Items SET boxId = NULL WHERE id = ?';
        sql.query(query, [itemId])
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getAllItems: (req, res) => {
        let query = "SELECT * FROM inventory.Items";
        sql.query(query)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    addNewItem: (req, res) => {
        let itemName = req.body.itemName;
        let itemDescription = req.body.itemDescription;
        let boxId = req.body.boxId;
        let categoryId = req.body.categoryId;
        let id;
        let query1 = 'INSERT INTO inventory.Items (itemName, itemDescription, boxId) VALUES (?, ?, ?)';
        //let query2 = 'INSERT INTO inventory.ItemsCategories (itemId, categoryId) VALUES (?, (SELECT id FROM inventory.Categories WHERE categoryName=?))';
        sql.query(query1, [itemName, itemDescription, boxId])
            .then(row => {
                console.log(row);
                id = row.insertId;
                //return sql.query(query2, [row.insertId, categoryName]);
                for (let i = 0; i < categoryId.length; i++) {
                    let query3 = 'INSERT INTO inventory.ItemsCategories (itemId, categoryId) VALUES (?,?) ON DUPLICATE KEY UPDATE itemId=VALUES(itemId), categoryId=VALUES(categoryId) ';
                    sql.query(query3, [id, categoryId[i]])
                        .then(result => {
                            //res.send(result);
                        })
                        .catch(err => {
                            console.log(err);
                            return res.sendStatus(500);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });


        res.sendStatus(200)
    },
    getItemById: (req, res) => {
        let id = req.params.id;
        let query = 'SELECT i.id, i.itemName, i.itemDescription,  i.boxId, GROUP_CONCAT(ic.categoryId) AS categoryId FROM inventory.Items i LEFT JOIN inventory.ItemsCategories ic ON i.id = ic.itemId WHERE i.id = ?';
        sql.query(query, id)
            .then(result => {
                res.send(result[0]);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getItemByName: (req, res) => {
        let itemName = req.query.itemName;
        let query = 'SELECT i.id, i.itemName, i.itemDescription,  i.boxId, GROUP_CONCAT(ic.categoryId) AS categoryId FROM inventory.Items i LEFT JOIN inventory.ItemsCategories ic ON i.id = ic.itemId WHERE i.itemName = ?';
        sql.query(query, itemName)
            .then(result => {
                res.send(result[0]);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getItemsByCategory: (req, res) => {
        let arr = [];
        let categoryName = req.query.categoryName;
        let query = 'SELECT i.id, i.itemName, i.itemDescription, c.categoryName FROM inventory.Items i LEFT JOIN inventory.ItemsCategories ic ON i.id = ic.itemId LEFT JOIN inventory.Categories c ON ic.categoryId = c.id WHERE c.categoryName= ? GROUP BY i.id';
        sql.query(query, categoryName)
            .then(result => {
                if (result[0]) {
                    for (let i = 0; i < result.length; i++) {
                        let query2 = 'SELECT i.id, i.itemName, i.itemDescription, GROUP_CONCAT(c.categoryName) AS categoryName FROM inventory.Items i LEFT JOIN inventory.ItemsCategories ic ON i.id = ic.itemId LEFT JOIN inventory.Categories c ON ic.categoryId = c.id WHERE i.id= ? GROUP BY i.id';
                        sql.query(query2, result[i].id)
                            .then((result2) => {
                                arr.push(result2[0]);
                                if (i === result.length - 1) {
                                    res.send(arr)
                                }
                            });
                    }
                } else {
                    res.send(arr)
                }
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    getItemByIdInBox: (req, res) => {
        let id = req.params.id;
        let boxId = req.params.boxId;
        let query = 'SELECT i.id, i.itemName, i.itemDescription,  i.boxId, GROUP_CONCAT(ic.categoryId) AS categoryId FROM inventory.Items i LEFT JOIN inventory.ItemsCategories ic ON i.id = ic.itemId WHERE i.id = ? AND i.boxId = ?';
        sql.query(query, [id, boxId])
            .then(result => {
                res.send(result[0]);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    deleteItemById: (req, res) => {
        let id = req.params.id;
        let query = 'DELETE FROM inventory.Items WHERE id = ?';
        sql.query(query, id)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    },
    changeItemById: (req, res) => {
        let id = req.params.id;
        let itemName = req.body.itemName;
        let itemDescription = req.body.itemDescription;
        let boxId = req.body.boxId;
        let categoryId = req.body.categoryId;
        let query1 = 'UPDATE inventory.Items SET itemName = ?, itemDescription = ?, boxId = ? WHERE id = ?';
        sql.query(query1, [itemName, itemDescription, boxId, id])
            .then(result => {
                //res.send(result);
                console.log(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });

        let query2 = 'DELETE FROM inventory.ItemsCategories WHERE itemId = ?';
        sql.query(query2, [id])
            .then(result => {
                //res.send(result);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
        for (let i = 0; i < categoryId.length; i++) {
            let query3 = 'INSERT INTO inventory.ItemsCategories (itemId, categoryId) VALUES (?,?) ON DUPLICATE KEY UPDATE itemId=VALUES(itemId), categoryId=VALUES(categoryId) ';
            sql.query(query3, [id, categoryId[i]])
                .then(result => {
                    //res.send(result);
                })
                .catch(err => {
                    console.log(err);
                    return res.sendStatus(500);
                });
        }
        res.sendStatus(200)
    },
};
