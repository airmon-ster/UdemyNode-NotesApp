const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)


    debugger

    if (!duplicateNote){
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green("New note added"))
} else {
    console.log(chalk.red('Note title taken!'))
}
}

const removeNote = (title) => {
    const notes = loadNotes()

    const noteFound = notes.filter((note) => note.title !== title)

    if (noteFound){
        saveNotes(noteFound)
        console.log(chalk.green('Note Removed'))
    }else{
        console.log(chalk.red('Note not found'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green('Your Notes:'))

    notes.forEach((note) => {
        console.log(chalk.white(note.title) + ' - ' + note.body)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead){
        console.log(chalk.green('Note: ' + noteToRead.title))
        console.log(chalk.white(noteToRead.body))
    } else {
        console.log(chalk.red('Note not found'))
    }
}

const loadNotes =  () => {
    try{
        const parsedJSON = JSON.parse(fs.readFileSync('notes.json').toString())
        return parsedJSON
    } catch (e) {
        return [];
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};