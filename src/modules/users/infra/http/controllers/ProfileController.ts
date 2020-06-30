import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUser = container.resolve(ShowProfileService);

    const user = await showUser.execute({
      user_id,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
