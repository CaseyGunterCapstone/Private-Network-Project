// This code was repurposed from my Interactive Web Dev Project to fit my needs for this project. The MongoDB is not currently setup for my capstone project

exports.DAL = {
    pingDB: function(){
        console.log("DAL pingDB called:");
        return pingDB();
    },
    addDoc: function(body){
        console.log("DAL addDoc called:");
        return addDoc(body);
    },
    findSomeone: function(body){
        console.log("DAL findSomeone called:");
        return findSomeone(body);
    },
    findAll: function(){
        console.log("DAL findMany called:");
        return findAll();
    },
    changeSomeone: function(body, changes){
        console.log("DAL changeSomeone called:");
        return changeSomeone(body, changes);
    }
};
//const uri = "mongodb+srv://{insert_your_mongodb_info};
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, {
serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});

function pingDB(){

    async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
    }
    run().catch(console.dir);
};

function addDoc(body){
    async function run() {
        try {
            await client.connect();
            const db = client.db("UsersDB");
            const col = db.collection("UsersColl");                                                                                                                                     
            const data = {
                "username": body.username,
                "password": body.password,
                "email": body.email,
                "profileImage": body.profileImage
            };       
            await col.insertOne(data);
            } catch (err) {
            console.log(err.stack);
        }
    
        finally {
            await client.close();
        }
    }
        run().catch(console.dir);
}

function findAll(){
    async function run() {
        try {
            await client.connect();
            const db = client.db("UsersDB");
            const col = db.collection("UsersColl");
            const document = await col.find().toArray();
            console.log(document);
            return document;
            } catch (err) {
            console.log(err.stack);
            
        }
    
        finally {
            await client.close();
        }
    }
        run().catch(console.dir);
};


function findSomeone(body){
    async function run() {
        try {
            await client.connect();
            const db = client.db("UsersDB");
            const col = db.collection("UsersColl");
            const filter = { username: body.username };
            console.log("Username: "+body.username+"\nPassword: "+body.password);
            console.log(JSON.stringify(filter));
            const document = await col.findOne(filter);
            console.log(document);
            } catch (err) {
            console.log(err.stack);
        }
    
        finally {
            await client.close();
        }
    }
        run().catch(console.dir);
};

function changeSomeone(body, changes){
    async function run(){
        try{
            await client.connect();
            const db = client.db("UsersDB");
            const col = db.collection("UsersColl");
                const filter = {username: body.username};
                const options = {upsert: true};
    const update = {
        username: changes.username,
        password: changes.password,
        email: changes.email,
        profileImage: changes.profileImage
    };
    const change = await col.updateOne(filter, update, options);
}finally{
    await client.close();
}
    }
    run().catch(console.dir);
        
    };

    
