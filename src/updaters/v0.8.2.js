const fs = require('fs')

function uuid() {
    //return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[10]/g, function() {
    return ('' + 1e7).replace(/[10]/g, function() {
        return (0 | (Math.random() * 16)).toString(16)
    })
}

fs.readdirSync('../../ugnis_components/').forEach(file => {
    const oldJson = JSON.parse(fs.readFileSync('../../ugnis_components/' + file, 'utf8'))

    const newJson = Object.keys(oldJson.style).reduce((acc, key) => {
        const newPipeId = uuid()

        acc = {
            ...acc,
            pipe: {
                ...acc.pipe,
                [newPipeId]: {
                    type: 'text',
                    value: '',
                    transformations: [],
                },
            },
            style: {
                ...acc.style,
                [key]: {
                    ...acc.style[key],
                    transition: {
                        ref: 'pipe',
                        id: newPipeId,
                    },
                },
            },
        }
        return acc
    }, oldJson)

    fs.writeFile('../../ugnis_components/' + file, JSON.stringify(newJson, undefined, 4), function(err) {
        if (err) {
            return console.log(err)
        }
    })
})
