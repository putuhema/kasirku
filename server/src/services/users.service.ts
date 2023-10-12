import { DB } from "@/database";
import { User } from "@/interfaces/users.interface";
import { Service } from "typedi";

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await DB.Users.findAll();

    return allUser;
  }
}
