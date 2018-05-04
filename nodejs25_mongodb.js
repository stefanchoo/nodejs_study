var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/runoob'

var dbase = 'runoob'
var collection = 'site'

var myobj = {
    name: '菜鸟教程',
    url: 'www.runoob.com'
}

var myobjs = [
    {
        name: '菜鸟工具',
        url: 'https://c.runoob.com',
        type: 'cn'
    },
    {
        name: 'Google',
        url: 'https://www.google.com',
        type: 'en'
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com',
        type: 'en'
    }
]

// createCollection(dbase, collection)
// 1.   show dbs : 显示数据库
// 1.1  use database : 创建数据库，如不存在，则创建
// 1.2  db.dropDatabase()
// 1.3  db.createCollection(name, options)  options: {capped: false[是否固定大小，和size配合使用]，autoIndexId: false[自动在_id字段创建索引]，size:number[以字节计], //                                                    max:number[固定集合中包含文档的最大数量]}
// 1.4  db.col.drop(): 删除集合
function createCollection(database, collection) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        console.log('数据库已创建！')
        var dbase = db.db(database)
        dbase.createCollection(collection, (err, res) => {
            if (err) throw err
            console.log('创建集合！')
            db.close()
        })
    })
}

// insertOne(dbase, collection, myobj)
// 2. db.col.insert(obj)
function insertOne(database, collection, obj) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).insertOne(obj, (err, res) => {
            if (err) throw err
            console.log('文档插入成功')
            db.close()
        })
    })
}

// insertMany(dbase, collection, myobjs)
// 3. db.col.insert([obj1,obj2])
function insertMany(database, collection, objs) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).insertMany(objs, (err, res) => {
            if (err) throw err
            console.log('多文档插入成功：', res)
            console.log('插入文档数量为：' + res.insertedCount)
            db.close()
        })
    })
}

// find(dbase, collection)
// find(dbase, collection, { name: '菜鸟教程'})
// 5. db.col.find(conditions, columns)
function find(database, collection, conditions) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).find(conditions).toArray((err, res) => {
            if (err) throw err
            console.log(res)
            db.close()
        })
    })
}

// update(dbase, collection, {name: '菜鸟教程'}, {url: 'https://www.runoob.com'})
// 6. db.col.update(conditions, {$set:obj})
function update(database, collection, conditions, modObj) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).updateOne(conditions, {
            $set: modObj
        }, (err, res) => {
            if (err) throw err
            console.log("文档更新成功")
            db.close()
        })
    })
}

// updateMany(dbase, collection, { type: 'en'}, {url: 'https://www.runoob.com'})
function updateMany(database, collection, conditions, modObj) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).updateMany(conditions, {
            $set: modObj
        }, (err, res) => {
            if (err) throw err
            console.log(res.result.nModified + " 条文档被更新")
            db.close()
        })
    })
}

// deleteOne(dbase, collection, {name: '菜鸟教程'})
// 7. db.col.remove(conditions)
function deleteOne(database, collection, conditions) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).deleteOne(conditions, (err, res) => {
            if (err) throw err
            console.log("文档删除成功：", res.deletedCount)
            db.close()
        })
    })
}

// deleteMany(dbase, collection, { type: 'en'})
function deleteMany(database, collection, conditions) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).deleteMany(conditions, (err, res) => {
            if (err) throw err
            console.log("文档删除成功：", res.deletedCount)
            db.close()
        })
    })
}

// sort(dbase, collection, { type: -1})
// 8. db.col.find().sort(conditions) {type: 1 / -1} 1表示升序，-1表示降序
function sort(database, collection, sort) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).find().sort(sort).toArray((err, res) => {
            if (err) throw err
            console.log(res)
            db.close()
        })
    })
}

//skipAndlimit(dbase, collection, 0, 2)
//skipAndlimit(dbase, collection, 2, 2)
// 9. 查询分页 limit(2)   
// skip(2): 跳过指定的条数 
function skipAndlimit(database, collection, skipSize, limitSize) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbase = db.db(database)
        dbase.collection(collection).find().skip(skipSize).limit(limitSize).toArray((err, res) => {
            if (err) throw err
            console.log(res)
            db.close()
        })
    })
}

lookup()
// 10. 左连接：$lookup
function lookup() {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbo = db.db("runoob")
        dbo.collection('orders').aggregate([
            {
                $lookup: { // 级联查询
                    from: 'products', // 右集合
                    localField: 'product_id', // 左集合 join字段
                    foreignField: '_id', // 右集合 join字段
                    as: 'orderdetails' // 新生成字段（类型array）
                }
            },
            {
                $match: { // 从结果中查询匹配值
                    status: {
                        $gt: 0
                    }
                }
            },
            {
                $project: { // 筛选字段
                    orderdetails: 1,
                    _id: 0
                }
            }

    ]).toArray((err, res) => {
            if (err) throw err
            console.log(JSON.stringify(res))
            db.close()
        })
    })
}
