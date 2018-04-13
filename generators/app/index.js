'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	prompting() {
		this.log(yosay(`Welcome to the terrific ${chalk.red('generator-maman')} generator!`));

		const prompts = [
			{
				type: 'input',
				name: 'questionsArray',
				message: 'How many parts for every question? Example: [3, 4, 2] means q1 has 3 parts, q2 has 4 and q3 has 2.',
				default: '[1, 2, 3, 4]'
			}, {
				type: 'input',
				name: 'mamanNumber',
				message: 'What\'s the Maman\'s number?',
				default: '11'
			}, {
				type: 'input',
				name: 'authorName',
				message: 'What\'s your name?',
				default: 'AUTHOR'
			}
		];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	writing() {
		const questions = this.props.questionsArray
			.replace(/[[\]\s]/g, '')
			.split(',')
			.map(x => parseInt(x));
		const mamanNumber = this.props.mamanNumber;
		const author = this.props.authorName;

		for (let i = 1; i <= questions.length; i++) {
			this.fs.copyTpl(
				this.templatePath('question.tex'),
				this.destinationPath(`questions/question${i}.tex`),
				{questionNumber: i, parts: questions[i - 1]}
			);
		}

		this.fs.copyTpl(
			this.templatePath('main.tex'),
			this.destinationPath(`Maman${mamanNumber}.tex`),
			{questionCount: questions.length, mamanNumber: parseInt(mamanNumber.toString().split('').reverse().join('')), authorName: author}
		);
	}
};
