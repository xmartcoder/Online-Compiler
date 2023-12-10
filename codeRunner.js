const util = require('util');
const exec = util.promisify(require('child_process').exec);

const run= async (fileName)=> {
    const { stdout, stderr } = await exec(`gcc ${fileName}.c -o ${fileName} && ${fileName}`);
    return (stderr) ? stderr : stdout;
}
module.exports = run;