/* --- STATE --- */
export interface AuthState {
  id_token?: string;
  expires_in?: number;
  refresh_token?: string;
  roleList?: number;
}

export type ContainerState = AuthState;
