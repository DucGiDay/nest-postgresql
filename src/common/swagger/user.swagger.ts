import { ApiQuery } from "@nestjs/swagger";
// import { ChangePasswordDto } from "src/user/dto/update-user.dto";
import { UserController } from "src/user/user.controller";

// export const bodyChangePassword = {
//   type: ChangePasswordDto,
//   examples: {
//     user: {
//       summary: 'user1',
//       value: {
//         oldPassword: 'duc13112001',
//         newPassword: 'duc13112001',
//       },
//     },
//   },
// }

// export const bodyAssignRole = {
//   schema: {
//     type: 'array',
//   },
//   examples: {
//     user: {
//       summary: 'user1',
//       value: {
//         roleIds: [3, 4]
//       },
//     },
//   },
// }

const queryFindAll = () => {
  const queryParams = [
    { name: 'page', required: false, type: Number, example: 1, description: 'Số trang' },
    { name: 'limit', required: false, type: Number, example: 10, description: 'Số lượng bản ghi trên mỗi trang' },
    { name: 'search', required: false, type: String, example: '', description: 'Từ khóa tìm kiếm' },
  ];

  queryParams.forEach(param => {
    const descriptor = Object.getOwnPropertyDescriptor(UserController.prototype, 'findAll') ?? {};
    ApiQuery(param)(UserController.prototype, 'findAll', descriptor);
  });
}

export const configSwagger = () => {
  queryFindAll()
}