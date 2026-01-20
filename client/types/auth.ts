export interface LoginResponse {
  access_token: string;
  student: {
    student_code: string;
    first_name: string;
    last_name: string;
  };
}

export interface LoginDto {
  student_code: string;
  password: string;
}
