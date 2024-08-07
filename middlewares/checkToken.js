import CryptoJS from 'crypto-js';

const checkToken = (req, res, next) => {
    const token = req.headers['x-token'];

    if (token) {
        try {
            const bytes = CryptoJS.AES.decrypt(token, SECRET);
            let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            if (decryptedData) {
                const parsedData = JSON.parse(decryptedData);
                if (parsedData && parsedData.email && parsedData.id) {
                    next();
                } else {
                    res.status(401).send({
                        message: 'Token is not valid',
                    });
                }
            } else {
                res.status(401).send({
                    message: 'Token is not valid',
                });
            }
        } catch (error) {
            res.status(401).send({
                message: 'Token is not valid',
                error: error.message
            });
        }
    } else {
        res.status(401).send({
            message: 'No token provided'
        });
    }
};

export default checkToken;

