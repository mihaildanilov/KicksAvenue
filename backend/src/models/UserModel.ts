import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
	public _id?: string;
	@prop({ required: true })
	public name!: string;
	@prop({ required: true, unique: true })
	public email!: string;
	@prop({ required: true })
	public password!: string;
	@prop({ required: true, default: false })
	public isAdmin!: boolean;
	@prop({ required: true, default: true })
	public subscribedToNewsletter!: boolean;
	public async removeUser() {
		return await UserModel.deleteOne({ _id: this._id }).exec();
	}
}

export const UserModel = getModelForClass(User);
