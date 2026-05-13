export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }
        return res.status(200).json({ success: true });
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
