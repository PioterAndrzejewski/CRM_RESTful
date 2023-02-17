const {ValidationError} = require("../utils/error")

class ClientRecord {
constructor(obj) {
    const {id, mail, name, nextContactAt, notes} = obj;

    if (!id || typeof id !== 'string') {
        throw new ValidationError('ID nie może być puste')
    }

    if (!name || !(typeof name === 'string') || name.length <= 2) {
        throw new ValidationError('Name must be text at least 3 characters.')
    }

    if (!mail || typeof mail !== 'string' || mail.indexOf('@') === -1) {
        throw new ValidationError('E-mail nie jest prawidłowy')
    }

    if (typeof nextContactAt !== 'string') {
        throw new ValidationError('Data następnego kontaktu msi być tekstem')
    }

    if (typeof notes !== 'string') {
        throw new ValidationError('Notatki muszą być tesktem')
    }

    for (const key in obj) {
        this[key] = obj[key];
    }
}
}

module.exports = {
    ClientRecord,
}

