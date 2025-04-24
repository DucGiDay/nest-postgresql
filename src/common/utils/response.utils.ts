export const successResponse = (data: any, message = 'Get Data Successfully') => ({
  success: true,
  data,
  message,
});

export const errorResponse = (error: any) => ({
  success: false,
  message: error?.message,
  error
});