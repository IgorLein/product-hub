import { Tag } from '../models/tag.model.js';

export type TagDto = {
  id: number;
  key: string;
  name: string;
};

export function mapTagToDto(tag: Tag): TagDto {
  return {
    id: tag.id,
    key: tag.key,
    name: tag.name,
  };
}
