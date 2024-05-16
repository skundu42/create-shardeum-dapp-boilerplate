#! /usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');
const log = console.log;
const { program } = require('commander');

const config = {
  REPO_URL:"https://github.com/Shardeum/shardeum-dapp-boilerplate",
}




const init = () => {
  program.option('-n, --name <string>', 'app name')
  program.parse(process.argv);

  const options = program.opts();
  if (!options.name) {
    log(chalk.red(`Please Provide App Name example : --name test-app`));
    process.exit(-1);

  }


  const runCommand = (command) => {
    try {
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      log(chalk.red(`Failed to execute ${command}`, error));

      return false;
    }
    return true;
  };

  const foldername = options.name

  const gitCloneCommand = `git clone ${config.REPO_URL} ${foldername}`;
  const npmInstallDepsCommand = `cd ${foldername} && npm install`;


  log(chalk.blue(`Creating a new Shardeum Boilterplate setup into ${foldername}...`));


  //================
  log("Cloning From Git.....")
  const cloneAction = runCommand(gitCloneCommand);

  if (!cloneAction) {
    log(chalk.red('Failed to clone the repo'));
    process.exit(-1);
  }



  //================
  log(chalk.green('Installing dependencies ...'));

  const installDepsAction = runCommand(npmInstallDepsCommand);

  if (!installDepsAction) {
    log(chalk.red('Failed Install dependencies'));
    process.exit(-1);
  }

  log(chalk.green(`Success! Shardeum Created  at ${process.cwd()}/${foldername}`));
  log('Inside that directory, you can run several commands:');
  log(chalk.green(`cd ${foldername}`));
  log(chalk.green('npm run dev'));
}

init()