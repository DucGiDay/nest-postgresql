export const successResponse = ({ data, message = 'Get Data Successfully' }: { data?: any, message?: string }) => ({
  success: true,
  data,
  message,
});

export const errorResponse = ({ error, status, message }: { error: any, status?: number | string, message?: string }) => ({
  success: false,
  message: message || error?.message,
  error,
  status: status || error?.status || error?.statusCode || 400
});