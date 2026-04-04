// application/scan.service.ts
import { ScanRepository } from "../infrastructure/scan.repository";



export class ScanService {
    private repo = new ScanRepository();

    async saveScan(data: any) {
        return await this.repo.create(data);
    }

    async getScans(userId: string, query: any) {
        return await this.repo.findAll(userId, query);
    }



}