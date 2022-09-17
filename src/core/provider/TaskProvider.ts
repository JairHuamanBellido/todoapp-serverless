import { GetAllTaskService } from '../../domain/services/GetAllTaskService';
import { container } from '../container/Container';

const GetAllTaskProvider: GetAllTaskService =
  container.resolve<GetAllTaskService>(GetAllTaskService);

export { GetAllTaskProvider };
