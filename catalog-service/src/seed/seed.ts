import sequelize from '../config/db.js';
import { initModels } from '../models/index.js';
import { importCatalog } from './importers/catalog.importer.js';
import { parseCatalogFile } from './parsers/catalog-file.parser.js';

async function main(): Promise<void> {
	const catalog = await parseCatalogFile();

	initModels();
	await sequelize.authenticate();
	await sequelize.sync();
	await importCatalog(catalog);

	console.log(
		`Imported ${catalog.categories.length} categories, ${catalog.tags.length} tags, and ${catalog.products.length} products.`
	);
}

main()
	.catch((error: unknown) => {
		console.error(error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await sequelize.close();
	});
