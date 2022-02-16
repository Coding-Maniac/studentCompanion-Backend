function appHandleAuthorization(req, res) {
    if (req.get('Authorization')) {
        return req.get('Authorization')
    }
    res.status(401)
    res.send({
        'error': 'No authorization was provided'
    })
}

module.exports = appHandleAuthorization