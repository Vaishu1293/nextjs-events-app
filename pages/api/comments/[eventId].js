import { connectDatabase, getAllDocumets, insertDocument } from "../../../helpers/db-util";

async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to database failed' });
        return;
    }
    if (req.method === 'POST') {
        const { email, name, text } = req.body;
        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input' });
            return;
        }
        const newComment = {
            email,
            name,
            text,
            eventId
        }
        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(200).json({ message: 'Added comment.', comment: newComment });
        } catch (error) {
            res.status(500).json({ message: 'Inserting comment failed' });
            client.close();
            return;
        }
        client.close();
    }
    if (req.method === 'GET') {
        let documents;
        try {
            documents = await getAllDocumets(client, 'comments', { _id: -1 });
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: 'Fetching documents failed.' });
            client.close();
            return;
        }
        client.close();
    }
}

export default handler