require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001;

// MongoDB connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@assignment.wnlkn.mongodb.net/?retryWrites=true&w=majority&appName=Assignment`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes setup
async function run() {
  try {
    // await client.connect();
    const database = client.db('reviewDB');
    const reviewCollection = database.collection('review');
    const userCollection = database.collection('users');
    const watchlistCollection = database.collection('watchlist');

    // Review routes
    app.get('/review', async (req, res) => {
      try {
        const cursor = reviewCollection.find();
        const result = await cursor.toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send({ message: 'Failed to fetch reviews' });
      }
    });

    app.get('/review/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await reviewCollection.findOne(query);
        if (!result) {
          return res.status(404).send({ message: 'Review not found' });
        }
        res.status(200).send(result);
      } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).send({ message: 'Failed to fetch review' });
      }
    });

    app.post('/review', async (req, res) => {
      try {
        const newReview = req.body;
        const result = await reviewCollection.insertOne(newReview);
        res.status(201).send(result);
      } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).send({ message: 'Failed to add review' });
      }
    });

    app.put('/review/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedReview = req.body;

        const review = {
          $set: {
            imageUrl: updatedReview.imageUrl,
            gameTitle: updatedReview.gameTitle,
            description: updatedReview.description,
            rating: updatedReview.rating,
            publishingYear: updatedReview.publishingYear,
            genre: updatedReview.genre,
            userEmail: updatedReview.userEmail,
            userName: updatedReview.userName,
          },
        };

        const result = await reviewCollection.updateOne(filter, review, options);
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: 'Review not found' });
        }
        res.status(200).send(result);
      } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).send({ message: 'Failed to update review' });
      }
    });

    app.delete('/review/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await reviewCollection.deleteOne(query);
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: 'Review not found' });
        }
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send({ message: 'Failed to delete review' });
      }
    });

    app.get('/myreviews', async (req, res) => {
      try {
        const email = req.query.email;
        if (!email) {
          return res.status(400).send({ message: 'Email is required' });
        }
        const query = { userEmail: email };
        const cursor = reviewCollection.find(query);
        const result = await cursor.toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        res.status(500).send({ message: 'Failed to fetch user reviews' });
      }
    });

    // User routes
    app.get('/users', async (req, res) => {
      try {
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Failed to fetch users' });
      }
    });

    app.post('/users', async (req, res) => {
      try {
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        res.status(201).send(result);
      } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({ message: 'Failed to add user' });
      }
    });

    app.patch('/users', async (req, res) => {
      try {
        const email = req.body.email;
        const filter = { email };
        const updatedDoc = {
          $set: {
            lastSignInTime: req.body?.lastSignInTime,
          },
        };

        const result = await userCollection.updateOne(filter, updatedDoc);
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(result);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: 'Failed to update user' });
      }
    });

    app.delete('/users/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: 'User not found' });
        }
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: 'Failed to delete user' });
      }
    });

    app.get('/watchlist', async (req, res) => {
      try {
        const email = req.query.email;
        const query = { userEmail: email }; // Filters by userEmail
        const cursor = watchlistCollection.find(query);
        const result = await cursor.toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).send({ message: 'Failed to fetch watchlist' });
      }
    });

    app.post('/watchlist', async (req, res) => {
      try {
        const watchlistItem = req.body;
        const result = await watchlistCollection.insertOne(watchlistItem);
        res.status(201).send(result);
      } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).send({ message: 'Failed to add to watchlist' });
      }
    });

    app.delete('/watchlist/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await watchlistCollection.deleteOne(query);
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: 'Watchlist item not found' });
        }
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting watchlist item:', error);
        res.status(500).send({ message: 'Failed to delete watchlist item' });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Run the server and set up routes
run().catch(console.dir);

// Basic route for health check
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
