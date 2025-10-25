import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UserEntity } from "../../database/entities/user";
import { IPaginationRequest, UserSubmitDto } from "postme-common";

@Injectable()
export class UserService {
	constructor(private readonly dataSource: DataSource) { }

	async getExists(email: string, id?: number): Promise<boolean> {
		const query = this.dataSource
			.createQueryBuilder(UserEntity, 'u')
			.where('u.email = :email', { email });

		if (id) {
			query.andWhere('u.id != :id', { id });
		}

		return await query.getExists();
	}

	async getById(id: number): Promise<UserEntity> {
		return await this.dataSource.manager.findOneBy(UserEntity, { id });
	}

	async load(pagination: IPaginationRequest): Promise<[UserEntity[], number]> {
		const { limit: take, skip } = pagination;
		return await this.dataSource.manager.findAndCount(UserEntity, {
			order: { name: 'ASC' },
			take,
			skip,
		});
	}

	async create(dto: UserSubmitDto): Promise<UserEntity> {
		return await this.dataSource.manager.save(new UserEntity({
			name: dto.name,
			email: dto.email
		}));
	}

	async update(user: UserEntity, dto: UserSubmitDto): Promise<UserEntity> {
		user.name = dto.name;
		user.email = dto.email;
		return await this.dataSource.manager.save(user);
	}
}