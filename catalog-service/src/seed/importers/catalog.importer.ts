import sequelize from '../../config/db.js';
import { Category, Product, ProductTag, Tag } from '../../models/index.js';
import type { CatalogSeedFile } from '../../types/catalog.types.js';

export async function importCatalog(catalog: CatalogSeedFile): Promise<void> {
	await sequelize.transaction(async (transaction) => {
		await ProductTag.destroy({ where: {}, transaction });
		await Product.destroy({ where: {}, transaction });
		await Category.destroy({ where: {}, transaction });
		await Tag.destroy({ where: {}, transaction });

		const categories = await Category.bulkCreate(catalog.categories, {
			transaction,
			returning: true,
		});

		const tags = await Tag.bulkCreate(catalog.tags, {
			transaction,
			returning: true,
		});

		const categoryIdByKey = new Map(categories.map((category) => [category.key, category.id]));
		const tagIdByKey = new Map(tags.map((tag) => [tag.key, tag.id]));

		const productsToCreate = catalog.products.map((productSeed) => {
			const categoryId = categoryIdByKey.get(productSeed.categoryKey);

			if (!categoryId) {
				throw new Error(
					`Cannot import product "${productSeed.name}": categoryKey "${productSeed.categoryKey}" not found.`
				);
			}

			return {
				name: productSeed.name,
				description: productSeed.description,
				price: productSeed.price,
				imageFileName: productSeed.imageFileName,
				imageUrl: `/products/${productSeed.imageFileName}`,
				categoryId,
			};
		});

		const products = await Product.bulkCreate(productsToCreate, {
			transaction,
			returning: true,
		});

		const productTagsToCreate = catalog.products.flatMap((productSeed, index) => {
			const productId = products[index]?.id;

			if (!productId) {
				throw new Error(`Cannot resolve created product id for "${productSeed.name}".`);
			}

			return productSeed.tagKeys.map((tagKey) => {
				const tagId = tagIdByKey.get(tagKey);

				if (!tagId) {
					throw new Error(
						`Cannot import product "${productSeed.name}": tagKey "${tagKey}" not found.`
					);
				}

				return {
					productId,
					tagId,
				};
			});
		});

		if (productTagsToCreate.length > 0) {
			await ProductTag.bulkCreate(productTagsToCreate, { transaction });
		}
	});
}
