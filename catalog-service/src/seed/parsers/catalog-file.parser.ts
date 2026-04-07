import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { CatalogSeedFile } from '../../types/catalog.types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultCatalogFilePath = path.resolve(__dirname, '../../../seed-data/catalog.json');
const defaultProductsDirectory = path.resolve(__dirname, '../../../public/products');

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

function isValidPrice(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export async function parseCatalogFile(
	filePath: string = defaultCatalogFilePath,
	productsDirectory: string = defaultProductsDirectory
): Promise<CatalogSeedFile> {
	const fileContent = await readFile(filePath, 'utf8');
	const parsed = JSON.parse(fileContent) as unknown;

	validateCatalogShape(parsed);

	const catalog = parsed;
	const categoryKeys = new Set(catalog.categories.map((category) => category.key));
	const tagKeys = new Set(catalog.tags.map((tag) => tag.key));
	const validationErrors: string[] = [];

	for (const product of catalog.products) {
		if (!categoryKeys.has(product.categoryKey)) {
			validationErrors.push(
				`Product "${product.name}" references unknown categoryKey "${product.categoryKey}".`
			);
		}

		for (const tagKey of product.tagKeys) {
			if (!tagKeys.has(tagKey)) {
				validationErrors.push(
					`Product "${product.name}" references unknown tagKey "${tagKey}".`
				);
			}
		}

		const imagePath = path.join(productsDirectory, product.imageFileName);

		try {
			await access(imagePath);
		} catch {
			validationErrors.push(
				`Product "${product.name}" is missing image file "${product.imageFileName}" in public/products.`
			);
		}
	}

	if (validationErrors.length > 0) {
		throw new Error(`Catalog validation failed:\n${validationErrors.join('\n')}`);
	}

	return catalog;
}

function validateCatalogShape(value: unknown): asserts value is CatalogSeedFile {
	if (!isRecord(value)) {
		throw new Error('Catalog file must contain a JSON object.');
	}

	if (!Array.isArray(value.categories)) {
		throw new Error('Catalog file must contain a categories array.');
	}

	if (!Array.isArray(value.tags)) {
		throw new Error('Catalog file must contain a tags array.');
	}

	if (!Array.isArray(value.products)) {
		throw new Error('Catalog file must contain a products array.');
	}

	const validationErrors: string[] = [];

	value.categories.forEach((category, index) => {
		if (!isRecord(category) || !isNonEmptyString(category.key) || !isNonEmptyString(category.name)) {
			validationErrors.push(
				`Category at index ${index} must include non-empty string fields key and name.`
			);
		}
	});

	value.tags.forEach((tag, index) => {
		if (!isRecord(tag) || !isNonEmptyString(tag.key) || !isNonEmptyString(tag.name)) {
			validationErrors.push(
				`Tag at index ${index} must include non-empty string fields key and name.`
			);
		}
	});

	value.products.forEach((product, index) => {
		if (!isRecord(product)) {
			validationErrors.push(`Product at index ${index} must be an object.`);
			return;
		}

		if (!isNonEmptyString(product.name)) {
			validationErrors.push(`Product at index ${index} must include a non-empty name.`);
		}

		if (!isNonEmptyString(product.description)) {
			validationErrors.push(`Product "${String(product.name ?? index)}" must include a description.`);
		}

		if (!isValidPrice(product.price)) {
			validationErrors.push(`Product "${String(product.name ?? index)}" must include a valid price.`);
		}

		if (!isNonEmptyString(product.categoryKey)) {
			validationErrors.push(`Product "${String(product.name ?? index)}" must include categoryKey.`);
		}

		if (!isNonEmptyString(product.imageFileName)) {
			validationErrors.push(`Product "${String(product.name ?? index)}" must include imageFileName.`);
		}

		if (!Array.isArray(product.tagKeys) || !product.tagKeys.every(isNonEmptyString)) {
			validationErrors.push(`Product "${String(product.name ?? index)}" must include tagKeys as string array.`);
		}
	});

	if (validationErrors.length > 0) {
		throw new Error(`Catalog validation failed:\n${validationErrors.join('\n')}`);
	}
}
