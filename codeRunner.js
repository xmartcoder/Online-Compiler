const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Here is an problem in my local ./filename command not working with this 
// but in docker without ./filename not working

const runc= async (fileName)=> {
    const { stdout, stderr } = await exec(`gcc ${fileName}.c -o ${fileName} && ./${fileName}`);
    return (stderr) ? stderr : stdout;
}
const runcpp= async (fileName)=> {
    const { stdout, stderr } = await exec(`g++ ${fileName}.cpp -o ${fileName} && ./${fileName}`);
    return (stderr) ? stderr : stdout;
}

module.exports = {runc,runcpp};