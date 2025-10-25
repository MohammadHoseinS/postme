import { Post } from "postme-common";
import { PostEntity } from "../../database/entities/post";

export class PostMapper {
	static toModel(entity: PostEntity): Post {
		return new Post({
			id: entity.id,
			title: entity.title,
			content: entity.content,
			createdById: entity.createdBy,
			createdOn: entity.createdOn
		});
	}
}