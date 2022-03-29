'use strict'

exports.status = (status, values, res) => {

    const data = {
        "satus": status,
        "values": values
    }

    res.status(data.status)
    res.json(data)
    res.end()

}