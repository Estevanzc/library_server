const fs = require('fs/promises');
const path = require('path');

module.exports = {
    async imageUpload({ model, file, field = 'photo' }) {
        if (!model || !file) return;

        const oldPath = model[field];

        if (oldPath) {
            const absolutePath = path.resolve(
                process.cwd(),
                oldPath.startsWith('/') ? oldPath.slice(1) : oldPath
            );

            try {
                await fs.unlink(absolutePath);
            } catch (err) {
            }
        }

        await model.update({
            [field]: `/uploads/${file.filename}`
        });
    },
    async saveImage({ file, oldPath = null }) {
        if (!file) {
            throw new Error('No file provided')
        }
        if (oldPath) {
            const absoluteOldPath = path.resolve(
                process.cwd(),
                oldPath.startsWith('/') ? oldPath.slice(1) : oldPath
            )
            try {
                await fs.unlink(absoluteOldPath)
            } catch (err) {
            }
        }
        return `/uploads/${file.filename}`
    },
    async destroyImage({ model, field }) {
        if (model[field]) {
            const filePath = path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                model[field].replace('/', '')
            );

            try {
                await fs.unlink(filePath);
            } catch (err) {
            }
        }
    }
};
