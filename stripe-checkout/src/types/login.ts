export interface LoginDetails {
  email: string;
  password: string;
  ambassadorCode?: string;
}

export interface LoginResponse {
  success: boolean;
  subscriptionId: string;
  details: LoginDetails;
  error?: string;
} 