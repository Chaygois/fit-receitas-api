async function refreshToken(req, res) {
    const { refreshToken } = req.body;
    
    if (!refreshToken) return res.status(403).send("Refresh token necessário");

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Refresh token inválido");

        const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken: newAccessToken });
    });
}
