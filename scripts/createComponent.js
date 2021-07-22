/* eslint-disable no-console */
const path = require('path')
const fs = require('fs/promises')

let [ initialTemplateName ] = process.argv.slice(2)

run().catch(e => { throw e })

async function run() {
	if (!initialTemplateName) {
		throw new Error('Create Component: Component must have a name (and please use camelCase or titleCase).')
	}

	const templateDir = path.resolve('templates', 'component')
	const templateFilesNames = await fs.readdir(templateDir)
	const templateFilesPaths = templateFilesNames.map(fileName => path.resolve(templateDir, fileName))
	const templateNameArray = initialTemplateName.split(path.sep)
	const templateName = templateNameArray.pop()
	const templateData = {
		name: upperCaseFirstLetter(templateName),
		nameLowerCase: lowerCaseFirstLetter(templateName),
	}

	const initialTargetPath = templateNameArray.join(path.spec) || `components`
	const targetPathDir = path.resolve('src', initialTargetPath)
	const targetPath = [ targetPathDir, templateData.name ].join(path.sep)

	console.log(`Create Component: Create a component named: ${templateName} in ${targetPathDir}\n`)

	await fs.mkdir(targetPath)

	for (const templateFilePath of templateFilesPaths) {
		const { target, targetFileName } = await processFile(templateData, templateFilePath)

		console.log(`Create Component: Writing file - ${targetFileName}`);

		await fs.writeFile([ targetPath, targetFileName ].join(path.sep), target)
	}

	console.log()
	console.log(`Create Component: Congrats you have a new component at:\n${targetPath}\n`);
}

async function processFile(templateData, templateFilePath) {
	const source = await fs.readFile(templateFilePath, 'utf8')
	const templateFileName = templateFilePath.split(path.sep).pop()

	const targetFileName = replace(templateFileName, templateData)
	const target = replace(source, templateData)

	return {
		targetFileName,
		target,
	}
}

function replace(
	aString,
	{
		name,
		nameLowerCase,
	},
) {

	return aString
		.replace(/{{name}}/g, name)
		.replace(/{{nameLowerCase}}/g, nameLowerCase)
		.replace(/.template/, '')
}



function upperCaseFirstLetter(aString) {
	const [ first, ...rest ] = aString
	const capitalized = first?.toUpperCase()
	const target = [ capitalized, ...rest ].join('')

	return target
}

function lowerCaseFirstLetter(aString) {
	const [ first, ...rest ] = aString
	const loweredCase = first?.toLowerCase()
	const target = [ loweredCase, ...rest ].join('')

	return target
}