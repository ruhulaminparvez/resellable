const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.166txbz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('Connected correctly to server', uri);

function verifyJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unauthorized access');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
    })

}

async function run() {
    try {
        console.log('Connected correctly to server');
        // categories db and collection
        const db = client.db('resale-categoriesDB');
        const col = db.collection('categoriesCollection');
        // blog db and collection
        const blogDB = client.db('resale-blogDB');
        const blogCollection = blogDB.collection('blogCollection');
        // faq db and collection
        const faqDB = client.db('resale-FAQDB');
        const faqCollection = faqDB.collection('FAQCollection');
        // contact db and collection
        const contactDB = client.db('resale-contactDB');
        const contactCollection = contactDB.collection('contactCollection');
        // user db and collection
        const userDB = client.db('resale-userDB');
        const userCollection = userDB.collection('userCollection');
        // booking db and collection
        const bookingsCollection = client.db('resale-BookingDB').collection('bookings');
        // product db and collection
        const productCollection = client.db('resale-productDB').collection('productCollection');



         // NOTE: make sure you use verifyAdmin after verifyJWT
         const verifyAdmin = async (req, res, next) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const user = await userCollection.findOne(query);

            if (user?.role !== 'admin') {
                return res.status(403).send({ message: 'forbidden access' })
            }
            next();
        }

        // NOTE: make sure you use verifySeller after verifyJWT
        const verifySeller = async (req, res, next) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const user = await userCollection.findOne(query);

            if (user?.role !== 'seller') {
                return res.status(403).send({ message: 'forbidden access' })
            }
            next();
        }

        //get all categories
        app.get('/categories', async (req, res) => {
            const cursor = col.find({});
            const categories = await cursor.toArray();
            res.send(categories);
        });

        //get all blogs
        app.get('/blogs', async (req, res) => {
            const cursor = blogCollection.find({});
            const blogs = await cursor.toArray();
            res.send(blogs);
        });

        //get all faqs
        app.get('/faqs', async (req, res) => {
            const cursor = faqCollection.find({});
            const faqs = await cursor.toArray();
            res.send(faqs);
        });

        //post contacts
        app.post('/contacts', async (req, res) => {
            const contact = req.body;
            const result = await contactCollection.insertOne(contact);
            res.send(result);
        });

        //post all products
        app.post('/addProduct', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        });

        //get all products
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });

        //get mail based products
        app.get('/products/:user', async (req, res) => {
            const user = req.params.user;
            const query = { user: user };
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        //get product by category
        app.get('/products/category/:category', async (req, res) => {
            const category = req.params.category;
            const query = { category: category };
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // booking
        app.post('/addBooking', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        //get all bookings by user
        app.get('/bookings/:user', async (req, res) => {
            const user = req.params.user;
            const query = { user: user };
            const cursor = bookingsCollection.find(query);
            const bookings = await cursor.toArray();
            res.send(bookings);
        });

        //get all bookings by seller
        app.get('/bookings/seller/:sellerName', async (req, res) => {
            const sellerName = req.params.sellerName;
            const query = { sellerName: sellerName };
            const cursor = bookingsCollection.find(query);
            const bookings = await cursor.toArray();
            res.send(bookings);
        });


        //jwt token
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
                return res.send({ accessToken: token });
            }
            res.status(403).send({ accessToken: '' })
        });

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        });

        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'admin' });
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            // TODO: make sure you do not enter duplicate user email
            // only insert users if the user doesn't exist in the database
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.put('/users/admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        app.get('/users/seller/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query);
            res.send({ isSeller: user?.role === 'seller' });
        });

        app.get('/users/buyer/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query);
            res.send({ isBuyer: user?.role === 'buyer' });
        });

        //get the email based on the role
        app.get('/users/:role', async (req, res) => {
            const role = req.params.role;
            const query = { role };
            const users = await userCollection.find(query).toArray();
            res.send(users);
        });


       
    } finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Resellable Server Running!')
    })


app.listen(port, () => {
    console.log(`Resellable server listening at http://localhost:${port}`)
    })