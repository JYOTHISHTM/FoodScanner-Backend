// modules/scan/application/scan.service.ts
import { getProductByBarcodeService } from "../../product/application/product.service";

export class ScanService {
  async scan(barcode: string, userId: string) {
    // reuse existing product logic
    const result = await getProductByBarcodeService(barcode, userId);

    return result;
  }
}