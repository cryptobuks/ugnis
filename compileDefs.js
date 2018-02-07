const fs = require('fs')

const result = {}

fs.readdirSync('./ugnis_components/').forEach(file => {
    result[file.slice(0, -5)] = JSON.parse(fs.readFileSync('./ugnis_components/'+file, 'utf8'))
})

fs.writeFile('definitions.json' ,JSON.stringify(result, undefined, 4))