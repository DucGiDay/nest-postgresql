// Hàm hỗ trợ phân trang
export const buildPagination = (page: number, limit: number) => ({
  skip: (page - 1) * limit,
  take: limit,
});