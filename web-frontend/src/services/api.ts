
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_APPS_SCRIPT_URL // must end with /exec/
const withBase = axios.create({ baseURL: BASE_URL })
export type ApiResponse<T> = { success: boolean; message?: string; data?: T }
export const api = {
  async login(email: string, password: string, apiKey: string) {
    const { data } = await withBase.post<ApiResponse<any>>('.', { email, password }, { params: { action: 'login', key: apiKey } })
    return data
  },
  async clock(employeeId: string, isIn: boolean, apiKey: string) {
    const { data } = await withBase.post<ApiResponse<any>>('.', { employeeId, action: isIn ? 'clock_in' : 'clock_out' }, { params: { action: 'logTime', key: apiKey } })
    return data
  },
  async logOperation(sewerId: string, operationName: string, quantity: number, unitPrice: number|undefined, apiKey: string) {
    const { data } = await withBase.post<ApiResponse<any>>('.', { sewerId, operationName, quantity, unitPrice }, { params: { action: 'logOperation', key: apiKey } })
    return data
  },
  async getLogs(userId: string, type: 'time'|'sewer', apiKey: string) {
    const { data } = await withBase.get<ApiResponse<any>>('.', { params: { action: 'getLogs', key: apiKey, userId, type } })
    return data
  },
  async listSewerOps(apiKey: string, status?: string, sewerId?: string) {
    const { data } = await withBase.get<ApiResponse<any>>('.', { params: { action: 'getSewerOperations', key: apiKey, status, sewerId } })
    return data
  },
  async approveOperation(operationId: string, status: 'Approved'|'Rejected', apiKey: string) {
    const { data } = await withBase.post<ApiResponse<string>>('.', { operationId, status }, { params: { action: 'approveOperation', key: apiKey } })
    return data
  },
  async payroll(apiKey: string, userId?: string) {
    const { data } = await withBase.get<ApiResponse<any[]>>('.', { params: { action: 'getPayrollSummary', key: apiKey, userId } })
    return data
  }
}
