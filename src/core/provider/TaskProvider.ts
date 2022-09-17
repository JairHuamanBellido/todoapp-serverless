import { CreateTaskService } from '../../domain/services/CreateTaskService';
import { GetAllTaskService } from '../../domain/services/GetAllTaskService';
import { container } from '../container/Container';

const GetAllTaskProvider: GetAllTaskService =
  container.resolve<GetAllTaskService>(GetAllTaskService);

const CreateTaskProvider: CreateTaskService =
  container.resolve<CreateTaskService>(CreateTaskService);

export { GetAllTaskProvider, CreateTaskProvider };
