import { CreateTaskService } from '../../domain/services/CreateTaskService';
import { GetAllTaskService } from '../../domain/services/GetAllTaskService';
import { UpdateTaskService } from '../../domain/services/UpdateTaskService';
import { container } from '../container/Container';

const GetAllTaskProvider: GetAllTaskService =
  container.resolve<GetAllTaskService>(GetAllTaskService);

const CreateTaskProvider: CreateTaskService =
  container.resolve<CreateTaskService>(CreateTaskService);

const UpdateTaskProvider: UpdateTaskService =
  container.resolve<UpdateTaskService>(UpdateTaskService);

export { GetAllTaskProvider, CreateTaskProvider, UpdateTaskProvider };
