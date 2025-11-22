export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        // Aquí procesas los datos, por ejemplo, enviarlos por correo
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
